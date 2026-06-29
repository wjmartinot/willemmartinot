#!/bin/bash
# Gebruik: ./resize-images.sh bronbestand.jpg

INPUT="$1"
BASENAME="${INPUT%.*}"
EXTENSION="${INPUT##*.}"

sips -Z 1920 "$INPUT" --out "${BASENAME}-1920.${EXTENSION}"
sips -Z 1200 "$INPUT" --out "${BASENAME}-1200.${EXTENSION}"
sips -Z 800  "$INPUT" --out "${BASENAME}-800.${EXTENSION}"

echo "Klaar: 800, 1200 en 1920px versies aangemaakt"
