FROM alpine:3.21

RUN apk add --no-cache redis

RUN mkdir -p /data
VOLUME /data

EXPOSE 6379

CMD ["redis-server", "--appendonly", "yes"]
