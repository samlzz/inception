#!/usr/bin/env bash

set -euo pipefail

: "${OUT_DIR:=/var/www/html/portfolio}"

if [[ ! -d "$OUT_DIR" ]]; then
    npm install
    npm run build

    mkdir -p "$OUT_DIR"
    cp -r 'dist' "$OUT_DIR"

    echo "Static site builded"
fi

echo "Static site deployed in '$OUT_DIR'"