#!/usr/bin/env bash
# ffmpeg for the demo video, installed with apt if the runner lacks it.
#
# Usage: checks/ffmpeg.sh
set -e # as in a default workflow step: no pipefail

if command -v ffmpeg > /dev/null; then
  echo "ffmpeg is preinstalled on this runner"
else
  echo "ffmpeg missing, installing with apt"
  sudo apt-get update -qq
  sudo apt-get install -y -qq ffmpeg > /dev/null
fi
ffmpeg -version | head -n 1
