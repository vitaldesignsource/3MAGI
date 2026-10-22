#!/usr/bin/env bash
# End-to-end tests for public/api/submit.php.
#
# Starts PHP's built-in server on the real public/ directory with a stand-in
# sendmail that captures every message to disk, then drives all three forms
# through it (uploads included) and parses the resulting MIME.
#
# Needs: php (8.1+) on PATH or in $PHP, curl, python3.
#   ./run.sh                # run everything
#   PHP=~/.local/php/php ./run.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC="$(cd "$HERE/../../public" && pwd)"
PHP="${PHP:-php}"
PORT="${PHP_TEST_PORT:-8098}"
# PHP's sendmail_path is run through a shell and cannot cope with spaces, even
# quoted — and this repo's own path contains one. So the scratch dir defaults
# to a space-free location under TMPDIR rather than beside the tests.
WORK="${PHP_TEST_WORK:-${TMPDIR:-/tmp}/submit-php-tests}"
case "$WORK" in *" "*) echo "work dir must not contain spaces: $WORK"; exit 2;; esac

command -v "$PHP" >/dev/null || { echo "php not found (set PHP=/path/to/php)"; exit 2; }

rm -rf "$WORK"
mkdir -p "$WORK/www/api" "$WORK/mail" "$WORK/tmp"
cp "$PUBLIC/api/submit.php" "$WORK/www/api/submit.php"
python3 "$HERE/make-fixtures.py" "$WORK/fixtures" >/dev/null

cat > "$WORK/fake-sendmail.sh" <<EOF
#!/bin/sh
n=\$(ls "$WORK/mail" | wc -l | tr -d ' ')
cat > "$WORK/mail/msg-\$(printf '%03d' \$((n+1)))-\$\$.eml"
exit 0
EOF
chmod +x "$WORK/fake-sendmail.sh"

echo "php: $("$PHP" -v | head -1)"
"$PHP" -l "$WORK/www/api/submit.php"

# Limits chosen to mirror a typical shared-hosting php.ini so the tests
# exercise both our caps and PHP's own.
"$PHP" -S "127.0.0.1:$PORT" -t "$WORK/www" \
  -d "sendmail_path=$WORK/fake-sendmail.sh" \
  -d "sys_temp_dir=$WORK/tmp" \
  -d upload_max_filesize=10M -d post_max_size=20M -d max_file_uploads=20 -d memory_limit=256M \
  -d display_errors=0 -d log_errors=1 -d "error_log=$WORK/php-error.log" \
  >"$WORK/server.log" 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT

for _ in $(seq 1 30); do
  curl -s -o /dev/null "http://127.0.0.1:$PORT/api/submit.php" && break
  sleep 0.2
done

PHP_TEST_PORT="$PORT" PHP_TEST_WORK="$WORK" python3 "$HERE/run-tests.py"
status=$?

if [ -s "$WORK/php-error.log" ]; then
  echo; echo "php-error.log:"; sed 's/^/  /' "$WORK/php-error.log"
fi
exit $status
