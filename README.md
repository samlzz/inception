# Inception

*This project has been created as part of the 42 curriculum by **sliziard**.*

## Description

This project aims to introduce the fundamentals of system administration using Docker. The goal is to build a complete infrastructure composed of multiple services running in isolated containers.

The infrastructure includes:

* A **NGINX** web server with TLS (v1.2 or 1.3 only) exposed on port 443
* A **WordPress** application using **php-fpm** with persistent data
* A **MariaDB** database for WordPress

* **Redis** for caching and session storage
* **Adminer** for database management via web interface
* **vsftpd** FTP server for file transfers
* **Filestash** cloud file manager with FTP integration
* A **Static Site** (TypeScript/Vite) served alongside WordPress

* Persistent storage using Docker volumes
* A dedicated Docker network connecting all services

All services are built from custom Dockerfiles using a minimal Debian base image. Configuration is handled through a `.env` file for non-sensitive values. Sensitive data is managed using Docker secrets.

---

### Services Overview

| Service | Purpose | Access | Port |
|---------|---------|--------|------|
| NGINX | Reverse proxy & TLS termination | https://sliziard.42.fr | 443 |
| WordPress | Main web application | https://sliziard.42.fr/wp-admin | Internal |
| MariaDB | Database | Internal only | 3306 |
| PHP-FPM | PHP runtime for WordPress | Internal | 9000 |
| Static Site | Portfolio website | https://sliziard.42.fr/portfolio | Internal |
| Redis | Cache & sessions | Internal | 6379 |
| Adminer | DB management UI | https://sliziard.42.fr/adminer | 8080 |
| vsftpd | FTP server | ftp://sliziard.42.fr:21 | 21, 10000-10010 |
| Filestash | File manager | http://localhost:8334 | 8334 |

---

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
mkdir -p /home/sliziard/data/filestash
mkdir -p /home/sliziard/data/certs
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
* **Portfolio**: `https://sliziard.42.fr/portfolio`
* **Adminer**: `https://sliziard.42.fr/adminer`
* **Filestash**: `http://localhost:8334`
* **FTP**: `ftp://sliziard.42.fr` (port 21)

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

Each container runs a single main process (NGINX, PHP-FPM, MariaDB, etc.) for:
* Easy scaling and restart
* Clear separation of concerns
* Simplified debugging

---

## Resources

**WordPress & PHP**

* https://developer.wordpress.org/advanced-administration/server/web-server/nginx/
* https://www.reddit.com/r/PHP/comments/1ng2w8e/can_someone_eli5_phpfpm_vs_frankenphp/?tl=fr
* https://wp-cli.org/

**Docker & Containers**

* https://docker-curriculum.com/
* https://www.youtube.com/watch?v=Umibg0QU6YU
* https://docs.docker.com/compose/
* https://docs.docker.com/storage/volumes/
* https://github.com/Yelp/dumb-init

**Bonus Services**

* https://redis.io/documentation
* https://github.com/vrana/adminer
* https://www.filestash.app/
* https://github.com/mickael-kerjean/filestash
* https://warlord0blog.wordpress.com/2021/03/04/docker-compose-healthcheck/
* https://kinsta.com/blog/xmlrpc-php/

**AI Usage**

AI tools were used for:

* Concrete implementation of Docker concepts
* Understanding PHP version and certificate needs
* Debugging container issues
* Answer some good practice/architecture question
* Understood some messy errors messages
* Generate and improve some documentation

All generated content was reviewed, tested, and adapted manually.
