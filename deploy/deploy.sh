#!/usr/bin/env bash
# Build the FoundKeep Help site and publish the static output.
#
# Usage: deploy/deploy.sh
#
# On this box, nvm's node/npx are broken — use bun for installs and the system
# node (v26 at /usr/bin/node) if a bun-driven build ever misbehaves. `bunx astro
# build` works today.
#
# NOTE: the final rsync writes to /var/www and Caddy owns TLS + the vhost. Those
# steps need sudo and are intentionally left for the operator to run (see the
# repo README and deploy/Caddyfile.help). Nothing here touches Caddy.
set -euo pipefail

export PATH="$HOME/.bun/bin:$PATH"

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="/var/www/foundkeep-help"

cd "$REPO_DIR"

echo "==> Installing dependencies (bun install)"
bun install

echo "==> Building static site (bunx astro build)"
bunx astro build

echo "==> Publishing dist/ to ${DEST}"
# Requires the destination to exist and be writable (operator sets this up with
# sudo). --delete keeps the destination an exact mirror of the fresh build.
rsync -a --delete dist/ "${DEST}/"

echo "==> Done. Reminder: reload Caddy only after the safety ritual"
echo "    (backup /etc/caddy/Caddyfile, verify every existing vhost, caddy validate)."
