#!/usr/bin/env bash
# Start the static preview server on 127.0.0.1:8765 if it is not already listening.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8765
BIND=127.0.0.1
LOG="/tmp/willemmartinot-http-${PORT}.log"
PIDFILE="/tmp/willemmartinot-http-${PORT}.pid"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  exit 0
fi

cd "$ROOT"
nohup python3 -m http.server "$PORT" --bind "$BIND" >"$LOG" 2>&1 &
echo $! >"$PIDFILE"

for _ in 1 2 3 4 5 6 7 8 9 10; do
  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
    exit 0
  fi
  sleep 0.15
done

echo "ensure-local-server: failed to bind ${BIND}:${PORT} (see ${LOG})" >&2
exit 1
