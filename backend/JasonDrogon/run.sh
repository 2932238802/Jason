#!/usr/bin/env bash

set -e
BUILD_DIR="_build"
TARGET_NAME="JasonDrogon"
mkdir -p "$BUILD_DIR"
cmake -S . -B "$BUILD_DIR"
cmake --build "$BUILD_DIR" -j"$(nproc)"
"./$BUILD_DIR/$TARGET_NAME"