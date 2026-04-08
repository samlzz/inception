# Developer Documentation

## Overview

This project is a Docker-based infrastructure composed of three services:

* `nginx` → reverse proxy with TLS
* `wordpress` → PHP application (php-fpm)
* `mariadb` → database

Each service is built from a custom Dockerfile.

## Prerequisites

* Docker
* Docker Compose
* Make (optionnal)

## Project Structure

```
.
├── secrets/
├── src/
│   ├── docker-compose.yml
│   └── requirements/
│       ├── mariadb/
│       ├── nginx/
│       └── wordpress/
└── Makefile
```

---
## Setup from scratch

1) **Clone the repository:**

```bash
git clone https://github.com/samlzz/inception.git
cd inception
```

2) **Create required directories on the host:**

```bash
mkdir -p /home/<your_login>/data/mariadb
mkdir -p /home/<your_login>/data/wordpress
```

3) **Configure environment variables:**

Copy the example file and update values:

```bash
cp .env.example src/.env
```

Edit the file and replace `your_login` with your 42 login

4) **Create Docker secrets:**

```bash
mkdir -p secrets
```

Create the following files:

```bash
touch secrets/mysql_root_password.txt
touch secrets/mysql_password.txt
touch secrets/wp_admin_password.txt
touch secrets/wp_user_password.txt
```

Fill each file with the appropriate password.

⚠️ Do not add these files to version control.

5) **Configure local domain resolution:**

Run:
```bash
echo "127.0.0.1 <your_login>.42.fr" | sudo tee -a /etc/hosts
```

6) **Build and start the project:**

```bash
make
```

This will:

* Build all Docker images
* Create volumes and network
* Start all containers

---

7) **Access the website:**

```text
https://<your_login>.42.fr
```

A self-signed certificate is used, so your browser will show a warning.

---

## Useful commands

### View logs

```bash
make logs
```

### Stop services

```bash
make down
```

### Remove volumes
```bash
make fclean
```

### Removes images
```bash
make iclean
```

### Restart

```bash
make re
```

### Rebuild a service

```bash
docker compose -f src/docker-compose.yml build <service>
```

---

## Data persistence

Volumes:

* `mariadb_data` → `/var/lib/mysql`
* `wordpress_data` → `/var/www/html`

Mapped to host:

* `/home/<your_login>/data/mariadb`
* `/home/<your_login>/data/wordpress`

## Container interactions

### Access MariaDB

```bash
docker exec -it mariadb mariadb -uroot -p
```

### Access WordPress container

```bash
docker exec -it wordpress bash
```

## Networking

A custom Docker network defined in docker-compose.yml is used.

Services communicate using service names:

* `mariadb`
* `wordpress`
* `nginx`


## Initialization scripts

Services that uses an `init.sh` script:

* MariaDB → database and users creation
* WordPress → installation via WP-CLI

Initialization scripts are executed only once:

- MariaDB initializes only if the database directory is empty
- WordPress installs only what are not yet configured

This prevents data from being overwritten on container restart.

* NGINX → use Docker multi stage build approche to generate TLS certificate.

---

## Notes

* PID 1 is managed manually (no init flag) with `dumb-init`
* Containers run a single main process
* No infinite loops or hacks are used
* TLS is enforced (HTTPS only)
* Secrets are used for sensitive data