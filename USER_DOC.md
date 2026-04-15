# User Documentation - Mandatory Part

## Overview

This project provides a complete containerized web infrastructure with three core integrated services:

* **NGINX** - Secure reverse proxy and web server
* **WordPress** - Content management system and blog platform
* **MariaDB** - Relational database for WordPress

All services work together seamlessly and data persists across restarts.

---

## Configuration

### Environment Variables

Edit the copied `.env` file in the `src/` directory to customize:

```bash
cp .env.example src/.env
```

Key settings:
- **DOMAIN_NAME** - Your domain (e.g., `sliziard.42.fr`)
- **MYSQL_DATABASE** - WordPress database name
- **MYSQL_USER** - Database user for WordPress
- **WP_ADMIN_USER** - WordPress administrator username
- **WP_USER** - Regular WordPress user account

### Docker Secrets

Create a `secrets/` folder and add password files:

```bash
mkdir -p secrets
echo "your_mysql_root_password" > secrets/mysql_root_password.txt
echo "your_mysql_password" > secrets/mysql_password.txt
echo "your_wordpress_admin_password" > secrets/wp_admin_password.txt
echo "your_wordpress_user_password" > secrets/wp_user_password.txt
```

⚠️ Keep these files secure. Never share them.


## Getting Started

### Create data directories

Before starting, ensure these directories exist on your system:

```bash
mkdir -p /home/sliziard/data/mariadb
mkdir -p /home/sliziard/data/wordpress
```

### Set up domain resolution

Add your domain to `/etc/hosts`:

```bash
echo "127.0.0.1 sliziard.42.fr" | sudo tee -a /etc/hosts
```

### Start the infrastructure

```bash
make
```

All services will build and start automatically. This may take a few minutes on first run.

---

## Accessing Services

Once running, access your services at:

| Service | URL | Purpose |
|---------|-----|---------|
| **WordPress** | `https://sliziard.42.fr` | Main website |
| **WordPress Admin** | `https://sliziard.42.fr/wp-admin` | Dashboard |

⚠️ HTTPS uses a self-signed certificate. Your browser will show a security warning — this is normal and expected.


## Credentials & Access

### WordPress Login

* **Admin URL**: `https://sliziard.42.fr/wp-admin`
* **Admin Username**: Value from `.env` (default: `master`)
* **Admin Password**: From `secrets/wp_admin_password.txt`

### Database Access

Database connection details for reference:
* **Host**: `mariadb` (internal network)
* **Server Port**: `3306`
* **Username**: Value from `.env` (default: `wpuser`)
* **Password**: From `secrets/mysql_password.txt`
* **Database**: Value from `.env` (default: `wordpress`)

---

## Managing Services

### Stop all services

```bash
make down
```

Services stop but data is preserved.

### Restart services

```bash
make re
```

This stops, rebuilds, and restarts all services.

### Remove all containers data

```bash
make fclean
```

⚠️ This will **not** deletes data in your directories.

### View service status

```bash
make ps
```

Shows running containers and their status.

### View logs

```bash
make logs
```

Streams logs from all services. Press `Ctrl+C` to exit.

---

## Using WordPress

### First Login

1. Open `https://sliziard.42.fr/wp-admin`
2. Enter admin credentials from the table above
3. Configure your site in Settings → General

### Adding Content

* **Blog Posts**: Posts → Add New
* **Pages**: Pages → Add New
* **Media**: Upload images and files via Media → Add New

---

## Database Management

### WordPress Data

* **wp_posts** - All posts, pages, and custom post types
* **wp_postmeta** - Post metadata and custom fields
* **wp_users** - User accounts
* **wp_usermeta** - User metadata
* **wp_options** - Site settings and configuration

---

## Troubleshooting

### Can't access website

* Check if containers are running: `make ps`
* Verify domain in `/etc/hosts` points to `127.0.0.1`
* Clear browser cache or try incognito mode

### HTTPS certificate error

This is expected with self-signed certificates.

* **Chrome/Edge**: Click "Advanced" → "Proceed anyway"
* **Firefox**: Click "Advanced" → "Accept Risk"
* Or add a security exception

### WordPress not loading

* Check WordPress container logs: `docker logs wordpress`
* Verify database is running: `make ps` (look for MariaDB)
* Check database connection via container logs

### Database connection failed

* Verify MariaDB credentials match `.env` and secrets files
* Check MariaDB is healthy: `make ps` (status should be "Up")
* Recreate MariaDB if corrupted: `make fclean` (warning: deletes data)

### Files not uploading

* Check disk space: `df -h /home/sliziard/data/`
* Verify WordPress directory permissions
* Check file size limits in WordPress settings

---

## Getting Help

Check logs for error messages:

```bash
make logs
```

View logs for a specific service:

```bash
docker logs <service_name>
```
