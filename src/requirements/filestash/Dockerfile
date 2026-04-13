FROM debian:bookworm as build

ENV DEBIAN_FRONTEND=noninteractive
ENV GOROOT=/usr/local/go
ENV PATH=$GOROOT/bin:$PATH
ENV GO111MODULE=on

# Build deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git curl make gcc g++ pkg-config \
        libjpeg-dev libtiff-dev libpng-dev libwebp-dev \
        libraw-dev libheif-dev libgif-dev libvips-dev \
        libstdc++6 libc6-dev zlib1g-dev liblcms2-dev libbrotli-dev \
        ca-certificates

RUN echo "deb http://deb.debian.org/debian bookworm-backports main" >> /etc/apt/sources.list.d/debian-12-backports.list && \
    apt-get update && \
    apt-get install -y -t bookworm-backports libsharpyuv-dev || \
    echo "Non disponible en backports" && \
    rm -rf /var/lib/apt/lists/*

RUN curl -L https://go.dev/dl/go1.24.11.linux-amd64.tar.gz -o /tmp/go.tar.gz && \
    tar -C /usr/local -xzf /tmp/go.tar.gz && \
    rm /tmp/go.tar.gz

WORKDIR /home/
ARG GIT_REPO=https://github.com/mickael-kerjean/filestash
ARG GIT_BRANCH=master
RUN git clone --depth 1 --single-branch --branch ${GIT_BRANCH} ${GIT_REPO}

WORKDIR /home/filestash
RUN make init && \
    make build && \
    mkdir -p ./dist/data/state/config/ && \
    cp config/config.json ./dist/data/state/config/config.json

FROM debian:bookworm

# Runtime deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl ca-certificates ffmpeg libjpeg-dev libtiff-dev libpng-dev libwebp-dev \
        libraw-dev libheif-dev libgif-dev libvips-dev dumb-init && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /home/filestash/dist/ /app/

COPY tools/init.sh /usr/local/bin/init.sh
RUN chmod +x '/usr/local/bin/init.sh'

EXPOSE 8334

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/usr/local/bin/init.sh"]