#!/usr/bin/env bash
# End-to-end test of the owner's dashboard UI (/admin). Needs a build:
#   (cd apps/web && npm run build) && apps/web/tests/analytics-e2e/run.sh
# Env: TL_E2E_PORT (4303), TL_E2E_SHOTS, TL_E2E_WORK, PHP, PLAYWRIGHT_MODULE.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node --no-warnings "$HERE/dashboard.e2e.mjs" "$@"
