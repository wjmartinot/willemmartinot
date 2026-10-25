#!/usr/bin/env bash
# sessionStart: make sure the local preview server is up (idempotent).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
"$ROOT/scripts/ensure-local-server.sh" >/dev/null
# Consume hook stdin; no session mutation needed.
cat >/dev/null
echo '{}'
