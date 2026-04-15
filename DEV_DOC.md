# Developer Documentation - Mandatory Part

## Overview

This project is a Docker-based infrastructure composed of three core services:

* `nginx` → reverse proxy with TLS termination
* `wordpress` → PHP application via php-fpm
* `mariadb` → relational database

Each service is built from a custom Dockerfile using a minimal Debian base image.

## Prerequisites

* Docker
* Docker Compose
* Make (optional)

## Project Structure

```
.
├── secrets/
│   ├── mysql_root_password.txt
│   ├── mysql_password.txt
│   ├── wp_admin_password.txt
│   └── wp_user_password.txt
├── src/
│   ├── .env
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

```bash
cp .env.example src/.env
```

Edit `src/.env` and set:
- `DOMAIN_NAME=<your_login>.42.fr`
- `MYSQL_DATABASE=wordpress`
- `MYSQL_USER=wpuser`
- `WP_ADMIN_USER=master`
- `WP_USER=<your_login>`

4) **Create Docker secrets:**

```bash
mkdir -p secrets
```

Create and fill these files with secure passwords:

```bash
echo "your_mysql_root_password" > secrets/mysql_root_password.txt
echo "your_mysql_user_password" > secrets/mysql_password.txt
echo "your_wp_admin_password" > secrets/wp_admin_password.txt
echo "your_wp_user_password" > secrets/wp_user_password.txt
```

⚠️ Never commit these files to version control.

5) **Configure local domain resolution:**

```bash
echo "127.0.0.1 <your_login>.42.fr" | sudo tee -a /etc/hosts
```

6) **Build and start the project:**

```bash
make
```

---

## Services Configuration

### NGINX & TLS

* Uses multi-stage build to generate self-signed certificates
* Terminates TLS for all incoming connections
* Reverse proxies requests to PHP-FPM (WordPress)
* Enforces HTTPS only

### WordPress

* PHP-FPM runs WordPress on port 9000
* Connects to MariaDB via network
* Stores files in persistent volume
* Uses Docker secrets for database credentials
* Initialization via WP-CLI (`init.sh`)

### MariaDB

* Initializes databases and users if directory is empty
* Uses healthcheck to ensure availability before dependent services start
* Stores data in persistent volume

---

## Data Persistence

### Volumes

| Volume | Purpose | Host Path | Mount Point |
|--------|---------|-----------|-------------|
| `mariadb_data` | Database files | `/home/<your_login>/data/mariadb` | `/var/lib/mysql` |
| `wordpress_data` | WordPress files | `/home/<your_login>/data/wordpress` | `/var/www/html` |

### Data Preservation

* Volumes survive container restarts and recreation
* `make fclean` removes docker volumes but not your binded directories

---

## Container Interactions

### Access to a Container

```bash
docker exec -it <service_name> <command_to_run_inside>
```

### Rebuild a specific service

```bash
docker compose -f src/docker-compose.yml build <service_name>
docker compose -f src/docker-compose.yml up -d <service_name>
```

---

## Networking

A custom bridge network (`inception`) enables:

* Service-to-service communication by name
* Internal DNS resolution
* Isolation from host network

Services communicate using:
```
mariadb:3306
wordpress:9000
nginx (reverse proxy)
```

---

## Initialization Scripts

### MariaDB (`init.sh`)

* Runs only if `/var/lib/mysql` is empty
* Creates database and users from `.env`
* Sets up WordPress user with limited privileges
* Idempotent design prevents data loss on restart

### WordPress (`init.sh`)

* Runs WP-CLI commands to configure WordPress
* Creates admin user from secrets
* Sets site title and URL from `.env`
* Only runs if WordPress is not already configured

---

## Useful Commands

### View logs

```bash
make logs
```

View logs for specific service:
```bash
docker compose -f src/docker-compose.yml logs -f <service_name>
```

### Stop services

```bash
make down
```

### Remove volumes

```bash
make fclean
```

### Remove images

```bash
make iclean
```

### Restart

```bash
make re
```

### Check service status

```bash
make ps
```

---

## Development Notes

* PID 1 is managed by `dumb-init` to handle signals properly
* Each container runs a single main process for clarity
* Health checks prevent dependent services from starting too early
* Secrets are mounted as files, not environment variables, for better security
