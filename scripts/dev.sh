#!/usr/bin/env bash

set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/frontend"
BACKEND_DIR="$ROOT_DIR/backend/JasonDrogon"
PIDS=()
cleanup() {
    echo
    echo "[dev] stopping services..."

    for pid in "${PIDS[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            kill "$pid"
        fi
    done

    wait 2>/dev/null || true
}

trap cleanup EXIT INT TERM

echo "[dev] root: $ROOT_DIR"

echo "[dev] starting backend..."
(
    cd "$BACKEND_DIR"
    ./run.sh
) &
PIDS+=("$!")

echo "[dev] starting frontend..."
(
    cd "$FRONTEND_DIR"
    npm run dev -- --host 0.0.0.0
) &
PIDS+=("$!")
echo "[dev] services started"
echo "[dev] frontend: http://localhost:5173"
echo "[dev] backend:  http://localhost:5555"
echo "[dev] press Ctrl+C to stop"
wait
