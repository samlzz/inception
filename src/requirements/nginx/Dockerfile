# Build stage
FROM debian:bookworm as cert_builder

ARG DOMAIN_NAME

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /etc/nginx/ssl

RUN openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/inception.key \
    -out /etc/nginx/ssl/inception.crt \
    -subj "/C=FR/ST=IDF/L=Paris/O=42/OU=42/CN=${DOMAIN_NAME}" \
    -addext "subjectAltName=DNS:${DOMAIN_NAME},DNS:nginx"

# Run stage
FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
	nginx \
	dumb-init \
	&& rm -rf /var/lib/apt/lists/*

COPY --from=cert_builder /etc/nginx/ssl/ /etc/nginx/ssl/

COPY conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
