#!/bin/bash
# Stop MASReady dev server
# Usage: ./stop.sh

PID_FILE=".masready.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "No running MASReady instance found (no .masready.pid file)."
  exit 0
fi

PID=$(cat "$PID_FILE")

if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  rm -f "$PID_FILE"
  echo "MASReady stopped (PID $PID)."
else
  echo "Process $PID is not running. Cleaning up."
  rm -f "$PID_FILE"
fi
