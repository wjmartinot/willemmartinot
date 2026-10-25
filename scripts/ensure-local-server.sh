#!/usr/bin/env bash
# Ensure 127.0.0.1:8765 is serving this repo.
# Prefer launchd (KeepAlive); fall back to a detached python server.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT=8765
BIND=127.0.0.1
LABEL="nl.willemmartinot.http8765"
UID_NUM="$(id -u)"
LSOF="/usr/sbin/lsof"
PYTHON="/usr/bin/python3"

listening() {
  "$LSOF" -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1
}

if listening; then
  exit 0
fi

# Prefer the LaunchAgent (survives Cursor restarts / logout+login with RunAtLoad).
if launchctl print "gui/${UID_NUM}/${LABEL}" >/dev/null 2>&1; then
  launchctl kickstart -k "gui/${UID_NUM}/${LABEL}" >/dev/null 2>&1 || true
else
  PLIST="${HOME}/Library/LaunchAgents/${LABEL}.plist"
  if [[ -f "$PLIST" ]]; then
    launchctl bootstrap "gui/${UID_NUM}" "$PLIST" >/dev/null 2>&1 || \
      launchctl load -w "$PLIST" >/dev/null 2>&1 || true
  fi
fi

for _ in 1 2 3 4 5 6 7 8 9 10; do
  if listening; then
    exit 0
  fi
  sleep 0.15
done

# Fallback if launchd is unavailable in this environment.
cd "$ROOT"
nohup "$PYTHON" -m http.server "$PORT" --bind "$BIND" \
  >"/tmp/willemmartinot-http-${PORT}.log" 2>&1 &
disown || true

for _ in 1 2 3 4 5 6 7 8 9 10; do
  if listening; then
    exit 0
  fi
  sleep 0.15
done

echo "ensure-local-server: failed to bind ${BIND}:${PORT}" >&2
exit 1
