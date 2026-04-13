FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    dumb-init \
    ca-certificates \
    php8.2 \
    php8.2-fpm \
    php8.2-mysql \
    && rm -rf /var/lib/apt/lists/*

# RUN apk add --no-cache dumb-init php php-fpm php-pdo php-pdo_mysql php-json php-session

RUN mkdir -p /var/www/html
RUN wget -O /var/www/html/index.php https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1.php

COPY conf/www.conf /etc/php/8.2/fpm/pool.d/www.conf

EXPOSE 8080

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html"]
