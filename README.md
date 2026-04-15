# Inception - Mandatory Part

*This project has been created as part of the 42 curriculum by **sliziard**.*

## Description

This project aims to introduce the fundamentals of system administration using Docker. The mandatory part builds a minimal infrastructure composed of three core services running in isolated containers.

The infrastructure includes:

* A **NGINX** web server with TLS (v1.2 or 1.3 only) exposed on port 443
* A **WordPress** application using **php-fpm** with persistent data
* A **MariaDB** database for WordPress

* Persistent storage using Docker volumes
* A dedicated Docker network connecting all services

All services are built from custom Dockerfiles using a minimal Debian base image. Configuration is handled through a `.env` file for non-sensitive values. Sensitive data is managed using Docker secrets.

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
* Make (optional but simplifies commands)

### Before running the project

Ensure the following directories exist:

```bash
mkdir -p /home/sliziard/data/mariadb
mkdir -p /home/sliziard/data/wordpress
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

### Remove all data

```bash
make fclean
```

## Access

Once the project is running:

* **Website**: `https://sliziard.42.fr`
* **WordPress admin**: `https://sliziard.42.fr/wp-admin`

⚠️ A self-signed certificate is used, so your browser will show a security warning.

---

## Project Design Choices

### Virtual Machines vs Docker

* **Virtual Machines** virtualize entire operating systems → heavy and slow
* **Docker containers** share the host kernel → lightweight and fast

Docker was chosen for efficiency and reproducibility.

### Secrets vs Environment Variables

* **`.env`** files are convenient but can be exposed
* **Docker secrets** are stored as isolated files, more secure

Secrets are used for sensitive data (database passwords, admin credentials). Non-sensitive configuration uses `.env`.

### Docker Network vs Host Network

* **Host network** removes isolation → insecure and forbidden in production
* **Docker network** provides isolation and built-in service discovery

A custom bridge network enables services to communicate by name.

### Docker Volumes vs Bind Mounts

* **Bind mounts** depend on specific host paths → less portable
* **Docker volumes** are managed by Docker → more robust and portable

Named volumes with bind mount options are used for data persistence across restarts.

### Single Service per Container

Each container runs a single main process (NGINX, PHP-FPM, MariaDB) for:
* Easy scaling and restart
* Clear separation of concerns
* Simplified debugging

---

## Resources

**WordPress & PHP**

* https://developer.wordpress.org/advanced-administration/server/web-server/nginx/
* https://www.reddit.com/r/PHP/comments/1ng2w8e/can_someone_eli5_phpfpm_vs_frankenphp/\?tl\=fr
* https://wp-cli.org/

**Docker & Containers**

* https://docker-curriculum.com/
* https://www.youtube.com/watch\?v\=Umibg0QU6YU
* https://docs.docker.com/compose/
* https://docs.docker.com/storage/volumes/
* https://github.com/Yelp/dumb-init

**AI Usage**

AI tools were used for:

* Concrete implementation of Docker concepts
* Debugging container issues
* Answer some good practice/architecture question
* Understood some messy errors messages
* Generate and improve some documentation

All generated content was reviewed, tested, and adapted manually.
