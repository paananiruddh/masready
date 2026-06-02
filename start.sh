#!/bin/bash
# Start MASReady dev server locally
# Usage: ./start.sh

PID_FILE=".masready.pid"

if [ -f "$PID_FILE" ] && kill -0 "$(cat $PID_FILE)" 2>/dev/null; then
  echo "MASReady is already running (PID $(cat $PID_FILE))"
  echo "Run ./stop.sh first to restart."
  exit 0
fi

echo "Starting MASReady dev server..."
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/masready dev &
echo $! > "$PID_FILE"
echo "MASReady started on http://localhost:5173  (PID $!)"
echo "Run ./stop.sh to stop."
