#!/usr/bin/env bash
# Runtime tests for the membership endpoints (api/essay.php and friends).
#
# Serves the real public/ directory with PHP's built-in server, with the
# secrets file and the private essay directory placed exactly where the
# production layout puts them: one level above the document root.
#
#   ./run.sh                    # run everything
#   PHP=~/.local/php/php ./run.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB="$(cd "$HERE/../.." && pwd)"
PHP="${PHP:-php}"
PORT="${PHP_TEST_PORT:-8099}"
# PHP's built-in server and this repo's path do not agree about spaces, so the
# scratch tree lives somewhere without any.
WORK="${TL_TEST_WORK:-${TMPDIR:-/tmp}/tl-membership-tests}"
case "$WORK" in *" "*) echo "work dir must not contain spaces: $WORK"; exit 2;; esac

command -v "$PHP" >/dev/null || { echo "php not found (set PHP=/path/to/php)"; exit 2; }

rm -rf "$WORK"
mkdir -p "$WORK/www"
cp -R "$WEB/public/." "$WORK/www/"

# Secrets and gated essays sit ABOVE the document root, as in production.
cp "$HERE/make-secrets.php" "$WORK/tl-secrets.php"
mkdir -p "$WORK/tl-essays"
# split-essays writes into the build output, which only exists after a build,
# so generate the manifest and the essays explicitly for the tests.
( cd "$WEB" && node tools/gated-manifest.mjs >/dev/null && mkdir -p ../../dist/apps/web && node tools/split-essays.mjs >/dev/null )
cp "$WEB/../../dist/apps/web/tl-essays/"*.json "$WORK/tl-essays/"

echo "php: $("$PHP" -v | head -1)"
for f in "$WORK"/www/api/*.php; do "$PHP" -l "$f" >/dev/null || exit 1; done
echo "syntax: all endpoints parse"

TL_SECRETS_FILE="$WORK/tl-secrets.php" TL_ESSAY_DIR="$WORK/tl-essays" \
"$PHP" -S "127.0.0.1:$PORT" -t "$WORK/www" \
  -d display_errors=0 -d log_errors=1 -d "error_log=$WORK/php-error.log" \
  -d "sys_temp_dir=$WORK/tmp" \
  >"$WORK/server.log" 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

for _ in $(seq 1 40); do
  curl -s -o /dev/null "http://127.0.0.1:$PORT/api/pass.php" && break
  sleep 0.2
done

# Unit tests for the entitlement predicate — no server needed.
TL_SECRETS_FILE="$WORK/tl-secrets.php" "$PHP" "$HERE/entitlement-tests.php" || exit 1

PHP="$PHP" PHP_TEST_PORT="$PORT" TL_TEST_WORK="$WORK" python3 "$HERE/run-tests.py"
status=$?

if [ -s "$WORK/php-error.log" ]; then
  echo; echo "php-error.log:"; sed 's/^/  /' "$WORK/php-error.log" | head -20
fi
exit $status
