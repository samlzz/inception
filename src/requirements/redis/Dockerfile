FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    redis \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /data /etc/redis
COPY conf/redis.conf /etc/redis/redis.conf

EXPOSE 6379

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["redis-server", "/etc/redis/redis.conf"]
