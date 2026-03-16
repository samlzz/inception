FROM debian:bullseye

RUN apt-get update && apt-get install -y --no-install-recommends \
	nginx \
	openssl \
	dumb-init \
	bash \
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/nginx/ssl /var/www/html

COPY conf/default.conf /etc/nginx/conf.d/default.conf
COPY tools/init.sh /usr/local/bin/init.sh

RUN chmod +x /usr/local/bin/init.sh

EXPOSE 443

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/usr/local/bin/init.sh"]