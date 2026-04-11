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

RUN npm install && npm run build

RUN mkdir -p /var/www/html/portfolio
COPY dist /var/www/html/portfolio

RUN echo "Deployed in /var/ww/html:" && ls /var/www/html

CMD ["echo", "Static site deployed in /var/www/html/portfolio/"]
