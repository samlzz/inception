#!/usr/bin/env bash

set -euo pipefail

: "${FTP_USER:=ftpuser}"
: "${FTP_PWD:=ftppassword}"
: "${FTP_DIR:=/var/www/html/wp-content/uploads}"

# Create user if not exist
if ! id "$FTP_USER" >/dev/null 2>&1; then
    adduser --disabled-password --gecos "" "$FTP_USER"
    echo "$FTP_USER:$FTP_PWD" | /usr/sbin/chpasswd
    echo $FTP_USER >> /etc/vsftpd.userlist
fi

# Grant permission to user
usermod -aG www-data "$FTP_USER"

mkdir -p "$FTP_DIR"
chown -R www-data:www-data "$FTP_DIR"
chmod -R 2775 "$FTP_DIR"

# Ftp upload folder
mkdir -p "$FTP_DIR/ftp"
chown "$FTP_USER:www-data" "$FTP_DIR/ftp"
chmod 2775 "$FTP_DIR/ftp"
echo "FTP folder created"

# Setup vsftpd
mkdir -p /var/run/vsftpd/empty
chmod 755 /var/run/vsftpd/empty

echo "FTP server started on port 21"
exec /usr/sbin/vsftpd /etc/vsftpd/vsftpd.conf
