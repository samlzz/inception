#!/usr/bin/env bash
set -euo pipefail

: "${WP_PATH:=/var/www/html}"
: "${WP_URL:?Missing WP_URL}"
: "${WP_TITLE:?Missing WP_TITLE}"
: "${WP_ADMIN_USER:?Missing WP_ADMIN_USER}"
: "${WP_ADMIN_PASSWORD:?Missing WP_ADMIN_PASSWORD}"
: "${WP_ADMIN_EMAIL:?Missing WP_ADMIN_EMAIL}"
: "${WP_USER:?Missing WP_USER}"
: "${WP_USER_EMAIL:?Missing WP_USER_EMAIL}"
: "${WP_USER_PASSWORD:?Missing WP_USER_PASSWORD}"
: "${MYSQL_DATABASE:?Missing MYSQL_DATABASE}"
: "${MYSQL_USER:?Missing MYSQL_USER}"
: "${MYSQL_PASSWORD:?Missing MYSQL_PASSWORD}"
: "${WP_DB_HOST:?Missing WP_DB_HOST}"

mkdir -p /run/php "${WP_PATH}"
chown -R www-data:www-data /run/php "${WP_PATH}"

echo ">> Waiting for MariaDB at ${WP_DB_HOST}..."

DB_HOST="${WP_DB_HOST%:*}"
DB_PORT="${WP_DB_HOST#*:}"

if [ "${DB_HOST}" = "${DB_PORT}" ]; then
	DB_PORT=3306
fi

until mariadb-admin ping -h"${DB_HOST}" -P"${DB_PORT}" -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" --silent; do
	sleep 2
done

echo ">> MariaDB is ready."

if [ ! -f "${WP_PATH}/wp-load.php" ]; then
	echo ">> Downloading WordPress..."
	wp core download --allow-root --path="${WP_PATH}"
fi

if [ ! -f "${WP_PATH}/wp-config.php" ]; then
	echo ">> Creating wp-config.php..."
	wp config create \
		--allow-root \
		--path="${WP_PATH}" \
		--dbname="${MYSQL_DATABASE}" \
		--dbuser="${MYSQL_USER}" \
		--dbpass="${MYSQL_PASSWORD}" \
		--dbhost="${WP_DB_HOST}"
fi

if ! wp core is-installed --allow-root --path="${WP_PATH}"; then
	echo ">> Installing WordPress..."
	wp core install \
		--allow-root \
		--path="${WP_PATH}" \
		--url="${WP_URL}" \
		--title="${WP_TITLE}" \
		--admin_user="${WP_ADMIN_USER}" \
		--admin_password="${WP_ADMIN_PASSWORD}" \
		--admin_email="${WP_ADMIN_EMAIL}"
else
	echo ">> WordPress is already installed."
fi

if wp user list --allow-root --path="${WP_PATH}" --field=user_login | grep -Fxq "${WP_USER}"; then
	echo ">> Additional user already exists (login)."
elif wp user list --allow-root --path="${WP_PATH}" --field=user_email | grep -Fxq "${WP_USER_EMAIL}"; then
	echo ">> Additional user already exists (email)."
else
	echo ">> Creating additional user..."
	wp user create "${WP_USER}" "${WP_USER_EMAIL}" \
		--allow-root \
		--path="${WP_PATH}" \
		--user_pass="${WP_USER_PASSWORD}"
fi

chown -R www-data:www-data "${WP_PATH}"

echo ">> Starting php-fpm..."
exec /usr/sbin/php-fpm7.4 -F
