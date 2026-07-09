#!/bin/bash
# SEO-beelden (nl/en mappen, formaat in map):
#   ./resize-images.sh source/RAW.jpg nl 1V3A9556-eventfotograaf-den-haag-keynote
#   ./resize-images.sh source/RAW.jpg en 1V3A9556-event-photographer-the-hague-keynote
#
# Homepage hero (formaat in bestandsnaam):
#   ./resize-images.sh source/RAW.jpg homepage hero zakelijk-fotograaf-den-haag

set -euo pipefail

INPUT="$1"
MODE="$2"
NAME="$3"

if [ "$MODE" = "homepage" ]; then
  SUBPATH="$NAME"
  BASENAME="$4"
  DIR="images/homepage/${SUBPATH}"
  mkdir -p "$DIR"
  sips -Z 1920 "$INPUT" --out "${DIR}/${BASENAME}-1920.jpg"
  sips -Z 1200 "$INPUT" --out "${DIR}/${BASENAME}-1200.jpg"
  sips -Z 800  "$INPUT" --out "${DIR}/${BASENAME}-800.jpg"
  echo "Klaar: homepage/${SUBPATH}/${BASENAME}-{800,1200,1920}.jpg"
else
  LANG="$MODE"
  for SIZE in 800 1200 1920 2560; do
    mkdir -p "images/${LANG}/${SIZE}"
    sips -Z "$SIZE" "$INPUT" --out "images/${LANG}/${SIZE}/${NAME}.jpg"
  done
  echo "Klaar: images/${LANG}/{800,1200,1920,2560}/${NAME}.jpg"
fi
