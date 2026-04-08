# Inception

*This project has been created as part of the 42 curriculum by **sliziard**.*

## Description

This project aims to introduce the fundamentals of system administration using Docker.
The goal is to build a small infrastructure composed of multiple services running in isolated containers.

The infrastructure includes:

* A **NGINX** web server with TLS (v1.2 or 1.3 only) exposed on port 443
* A **WordPress** application using **php-fpm**
* A **MariaDB** database
* Persistent storage using Docker volumes
* A dedicated Docker network connecting all services

All services are built from custom Dockerfiles using a minimal Debian base image.

Configuration is handled through a `.env` file for non-sensitive values. Sensitive data is managed using Docker secrets.

---

## Architecture Overview

```
Client (Browser)
        |
     HTTPS (443)
        |
      NGINX
        |
   php-fpm (WordPress)
        |
     MariaDB
```

## Instructions

### Requirements

* Docker
* Docker Compose
* Make (optional but simplifies `docker compose` commands)

### Before running the project

Ensure the following directories exist:

```
/home/<login>/data/mariadb
/home/<login>/data/wordpress
```

### Build and run the project

```bash
make
```

### Stop the project

```bash
make down
```

### Restart the project

```bash
make re
```


## Access

Once the project is running:

* Website: `https://<login>.42.fr`
* WordPress admin: `https://<login>.42.fr/wp-admin`

⚠️ A self-signed certificate is used, so your browser will show a security warning.

---

## Project Design Choices

### Virtual Machines vs Docker

* Virtual Machines virtualize entire operating systems → heavy and slow
* Docker containers share the host kernel → lightweight and fast

Docker was chosen for efficiency and reproducibility.


### Secrets vs Environment Variables

* `.env`: easy to use but exposed in environnement
* Docker secrets: stored as files, more secure

Secrets are used for sensitive data such as database passwords.

### Docker Network vs Host Network

* Host network removes isolation → insecure and forbidden
* Docker network provides isolation and service discovery

A custom Docker network defined in docker-compose.yml is used.

### Docker Volumes vs Bind Mounts

* Bind mounts depend on host paths → less portable
* Docker volumes are managed by Docker → more robust

Named volumes are used and mapped to their directory in `/home/<login>/data`.

---

## Resources

**WP/Php**

* https://developer.wordpress.org/advanced-administration/server/web-server/nginx/
* https://www.reddit.com/r/PHP/comments/1ng2w8e/can_someone_eli5_phpfpm_vs_frankenphp/?tl=fr
* https://wp-cli.org/

**Docker/Container**

* https://github.com/Yelp/dumb-init
* https://docs.docker.com/compose/
* https://docker-curriculum.com/
* https://www.youtube.com/watch?v=Umibg0QU6YU

### AI Usage

AI tools were used for:

* Concrete implementation of Docker concepts
* Debugging container issues
* Answer some good practice/architecture question
* Understood some messy errors messages

All generated content was reviewed and adapted manually.
