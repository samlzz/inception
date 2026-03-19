# User Documentation

## Overview

This project provides a containerized web infrastructure composed of:

* NGINX (HTTPS reverse proxy)
* WordPress (application)
* MariaDB (database)

## Configuration

Environment variables are defined in the `.env` file.

Copy the example file and update values:

```bash
cp .env.example src/.env
```
Make sure to update:
- domain name
- usernames
- database name

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

## Starting the project

To start all services:

```bash
make
```

## Stopping the project

```bash
make clean
```

## Stopping the project and delete data

```bash
make fclean
```

## Restarting the project

```bash
make re
```

---

## Website Access

Open your browser and go to:

* https://<login>.42.fr
* https://<login>.42.fr/wp-admin

Ensure the domain resolves to your machine (via `/etc/hosts`).

---

## Credentials

Credentials are stored using Docker secrets located in:

```
secrets/
```

Files include:

* `mysql_root_password.txt`
* `mysql_password.txt`
* `wp_admin_password.txt`
* `wp_user_password.txt`

---

## Checking services status

List running containers:

```bash
docker ps
```

Or:

```bash
make ps
```

---

## Viewing logs

```bash
make logs
```

To view log for a specific container:
```bash
docker logs -f <container_name>
```

---

## Persistent data

All data is stored in Docker volumes:

* Database → `/home/sliziard/data/mariadb`
* WordPress files → `/home/sliziard/data/wordpress`

This ensures data is preserved even if containers are removed.

---

## Troubleshooting

### Website not accessible

* Check containers are running
* Verify NGINX logs (`docker exec -it nginx bash -c 'cat /var/log/nginx/access.log'`)

### WordPress not loading

* Check WordPress container logs
* Ensure database is running

### Database errors

* Verify credentials
* Check MariaDB logs