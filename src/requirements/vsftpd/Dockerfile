FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
    vsftpd \
	dumb-init \
	bash \
    netcat-openbsd \
	&& rm -rf /var/lib/apt/lists/*

COPY conf/vsftpd.conf /etc/vsftpd/vsftpd.conf
COPY tools/init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

EXPOSE 21 10000-10010

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/usr/local/bin/init.sh"]