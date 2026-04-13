FROM debian:bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
        bash \
        curl \
        ca-certificates \
        gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

COPY tools/init.sh /usr/local/bin
RUN chmod +x /usr/local/bin/init.sh

CMD ["/usr/local/bin/init.sh"]
