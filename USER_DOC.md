# User Documentation

## Overview

This project provides a complete containerized web infrastructure with multiple integrated services:

* **NGINX** - Secure reverse proxy and web server
* **WordPress** - Content management system and blog platform
* **MariaDB** - Relational database for WordPress
* **Redis** - In-memory cache for improved performance
* **Adminer** - Database management web interface
* **vsftpd** - FTP server for secure file transfers
* **Filestash** - Cloud file manager with FTP backend
* **Static Site** - Portfolio website built with modern web technologies

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
- **FTP_USER** - FTP server username
- **FTP_PWD** - FTP server password

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
mkdir -p /home/sliziard/data/filestash
mkdir -p /home/sliziard/data/certs
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
| **Portfolio** | `https://sliziard.42.fr/portfolio` | Static site |
| **Adminer** | `https://sliziard.42.fr/adminer` | Database management |
| **Filestash** | `http://localhost:8334` | File manager |
| **FTP** | `ftp://sliziard.42.fr:21` | File transfer |

⚠️ HTTPS uses a self-signed certificate. Your browser will show a security warning — this is normal and expected.


## Credentials & Access

### WordPress Login

* **Admin URL**: `https://sliziard.42.fr/wp-admin`
* **Admin Username**: Value from `.env` (default: `master`)
* **Admin Password**: From `secrets/wp_admin_password.txt`

### Database Access (Adminer)

* **URL**: `http://localhost:8080`
* **Server**: `mariadb`
* **Username**: Value from `.env` (default: `wpuser`)
* **Password**: From `secrets/mysql_password.txt`
* **Database**: Value from `.env` (default: `wordpress`)

### FTP Access

* **Server**: `sliziard.42.fr:21`
* **Username**: Value from `.env` (default: `ftpuser`)
* **Password**: Value from `.env` (FTP_PWD)
* **Root Directory**: `/var/www/html` (WordPress files)

### Filestash Access

* **URL**: `http://localhost:8334`
* **Type**: FTP
* **Host**: `vsftpd` (internal network name)
* **Backend Url**: `https://sliziard.42.fr`
* **Port**: `21`
* **User & Password**: Same as FTP credentials above

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

### Remove all data

```bash
make fclean
```

⚠️ This deletes all volumes including database and uploaded files. Use with caution.

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

### File Management

Access WordPress files three ways:

1. **WordPress Admin** - Media library for images and documents
2. **FTP Client** - Connect to `sliziard.42.fr:21` with FTP credentials
3. **Filestash** - Web-based file manager at `http://localhost:8334`

---

## Uploading Files

### Via WordPress Media Library

1. Go to WordPress Admin → Media → Add New
2. Upload files directly through the browser
3. Insert into posts/pages

### Via FTP

1. Use an FTP client (e.g., FileZilla, Transmit)
2. Connect to `sliziard.42.fr:21`
3. Enter FTP credentials
4. Your in `/wp-content/uploads/`
5. Upload files

### Via Filestash

1. Open `http://localhost:8334`
2. Connect with FTP credentials
3. Browse and upload files through the web interface
4. No FTP client required

---

## Database Management

### Using Adminer

1. Open `https://sliziard.42.fr/adminer`
2. Enter database credentials:
   - Server: `mariadb`
   - User: `wpuser` (from `.env`)
   - Password: From `secrets/mysql_password.txt`
3. Browse tables, run queries, export/import data

### WordPress Data

* **wp_posts** - All posts, pages, and custom post types
* **wp_postmeta** - Post metadata and custom fields
* **wp_users** - User accounts
* **wp_usermeta** - User metadata
* **wp_options** - Site settings and configuration

---

## Performance

### Redis Caching

Redis is running and available for WordPress.
You can edit him and see metrics throught:

> WordPress Admin → Plugins → Redis

This improves WordPress response times.

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
* Test database connection via Adminer

### Database connection failed

* Verify MariaDB credentials match `.env` and secrets files
* Check MariaDB is healthy: `make ps` (status should be "Up")
* Recreate MariaDB if corrupted: `make fclean` (warning: deletes data)

### FTP connection refused

* Verify vsftpd is running: `make ps`
* Check ports 21 and 10000-10010 are not blocked
* Verify FTP credentials in `.env`

### Files not uploading

* Check disk space: `df -h /home/sliziard/data/`
* Verify WordPress directory permissions
* Check file upload limits in WordPress settings

### Filestash not connecting

* Verify vsftpd service is running: `make ps`
* Check FTP credentials match `.env`
* In Filestash, ensure Host is `vsftpd` (not `localhost`)

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
