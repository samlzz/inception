FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    redis \
    dumb-init \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /data
VOLUME /data

EXPOSE 6379

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["redis-server", "--appendonly", "yes"]
