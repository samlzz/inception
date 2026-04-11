FROM debian:bookworm

RUN apt-get update && \
    apt-get install -y wget curl dumb-init && \
    wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && \
    sh /tmp/netdata-kickstart.sh --non-interactive --disable-telemetry && \
    rm /tmp/netdata-kickstart.sh

EXPOSE 19999

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["netdata", "-D"]
