FROM alpine:3.21

RUN apk add --no-cache dumb-init redis

RUN mkdir -p /data
VOLUME /data

EXPOSE 6379

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["redis-server", "--appendonly", "yes"]
