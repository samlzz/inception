FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
	php8.2 \
	php8.2-fpm \
	php8.2-mysql \
	mariadb-client \
	curl \
	ca-certificates \
	less \
	dumb-init \
	bash \
	&& rm -rf /var/lib/apt/lists/*

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
	&& chmod +x wp-cli.phar \
	&& mv wp-cli.phar /usr/local/bin/wp

RUN mkdir -p /run/php /var/www/html

COPY conf/www.conf /etc/php/8.2/fpm/pool.d/www.conf
COPY tools/init.sh /usr/local/bin/init.sh

RUN chmod +x /usr/local/bin/init.sh

WORKDIR /var/www/html

EXPOSE 9000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/usr/local/bin/init.sh"]