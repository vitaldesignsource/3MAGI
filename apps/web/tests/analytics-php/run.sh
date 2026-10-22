#!/usr/bin/env bash
# Runtime tests for the owner's analytics (hit.php, crawl.php, admin.php and
# the shared library). See run-tests.php for what is covered.
#   ./run.sh               # everything (the built-site part needs `npm run build`)
#   PHP=~/.local/php/php ./run.sh --no-dist
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec "${PHP:-php}" "$HERE/run-tests.php" "$@"
