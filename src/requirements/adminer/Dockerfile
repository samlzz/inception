FROM alpine:3.21

RUN apk add --no-cache dumb-init php php-fpm php-pdo php-pdo_mysql php-json php-session

RUN mkdir -p /var/www/html
RUN wget -O /var/www/html/index.php https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php

COPY conf/www.conf /etc/php8/php-fpm.d/www.conf

EXPOSE 8080

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]
