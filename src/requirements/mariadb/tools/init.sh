#!/usr/bin/env bash

: "${MYSQL_RUN_DIR:=/run/mysqld}"
: "${MYSQL_VAR_DIR:=/var/lib/mysql}"
: "${MYSQL_DATABASE:?Missing MYSQL_DATABASE}"
: "${MYSQL_USER:?Missing MYSQL_USER}"
: "${MYSQL_PASSWORD:?Missing MYSQL_PASSWORD}"
: "${MYSQL_ROOT_PASSWORD:?Missing MYSQL_ROOT_PASSWORD}"

set -euo pipefail

mkdir -p "$MYSQL_RUN_DIR" "$MYSQL_VAR_DIR"
chown -R mysql:mysql "$MYSQL_RUN_DIR" "$MYSQL_VAR_DIR"

if [ ! -d /var/lib/mysql/mysql ]; then
	echo ">> MariaDB initialisation..."

	mariadb-install-db --user=mysql --datadir="$MYSQL_VAR_DIR"

	mysqld_safe --datadir="$MYSQL_VAR_DIR" --skip-networking &
	pid="$!"

	until mariadb-admin ping --silent; do
		sleep 1
	done

	mariadb -e "CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;"
	mariadb -e "CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';"
	mariadb -e "GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'%';"
	mariadb -uroot -p"${MYSQL_ROOT_PASSWORD}" -e "FLUSH PRIVILEGES;"
	mariadb -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';"

	mariadb-admin -uroot -p"${MYSQL_ROOT_PASSWORD}" shutdown
	wait "$pid"

	echo ">> Initialisation ended."
fi

echo ">> Start MariaDB..."
exec mysqld --user=mysql --console

