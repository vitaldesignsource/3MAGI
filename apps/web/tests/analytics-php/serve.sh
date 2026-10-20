#!/usr/bin/env bash
# Serve a site build with a seeded analytics database, for building and
# checking the dashboard UI by hand or with Playwright.
#
#   apps/web/tests/analytics-php/serve.sh [docroot]      # default: dist/apps/web
#
# First run: writes throwaway secrets (prints the login), seeds six weeks of
# synthetic traffic. Later runs reuse both. TL_DEV_FRESH=1 starts over.
# TL_DEV_PASSWORD=… chooses the throwaway password. Port: TL_PORT (4301).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/../../../.." && pwd)"
PHP="${PHP:-php}"
PORT="${TL_PORT:-4301}"
WORK="${TL_DEV_WORK:-${TMPDIR:-/tmp}/tl-analytics-dev}"
DOCROOT="$(cd "${1:-$REPO/dist/apps/web}" && pwd)"
case "$WORK" in "$DOCROOT"*) echo "work dir must be outside the docroot"; exit 2;; esac

[ -f "$DOCROOT/index.html" ] || { echo "no build at $DOCROOT (cd apps/web && npm run build)"; exit 2; }
if [ "${TL_DEV_FRESH:-0}" = 1 ]; then rm -rf "$WORK"; fi
mkdir -p "$WORK"
[ -f "$WORK/tl-secrets.php" ] || "$PHP" "$HERE/make-secrets.php" "$WORK/tl-secrets.php"
export TL_SECRETS_FILE="$WORK/tl-secrets.php"
export TL_ANALYTICS_DIR="$WORK/data"
[ -f "$TL_ANALYTICS_DIR/analytics.sqlite" ] || "$PHP" "$HERE/seed.php" --docroot="$DOCROOT"

echo "serving $DOCROOT on http://127.0.0.1:$PORT  (dashboard: /admin, data: $TL_ANALYTICS_DIR)"
exec "$PHP" -S "127.0.0.1:$PORT" -t "$DOCROOT" -d display_errors=0 -d log_errors=1 \
  -d "error_log=$WORK/php-error.log" -d "sys_temp_dir=$WORK" -d opcache.revalidate_freq=0 "$HERE/router.php"
