#!/usr/bin/env python3
"""Generate 1200×630 Open Graph images from source/."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).parent
SOURCE = ROOT / "source"
OUT = ROOT / "images" / "site" / "og"
TARGET = (1200, 630)

# crop: center (default) or top — top keeps faces in tall portrait photos
OG_SOURCES = {
    "og-event.jpg": ("059A3642-eventfotograaf-den-haag-societeit-de-witte-hero.jpg", "center"),
    "og-home.jpg": ("images/homepage/hero/zakelijk-fotograaf-den-haag-1920.jpg", "center"),
    "og-event-den-haag.jpg": ("AERO-2341-event-fotograaf-den-haag-fokker-terminal-hero.jpg", "center"),
    "og-portrait.jpg": ("5I2A3152-zakelijk-portret-fotograaf-den-haag-world-forum.jpg", "top"),
    "og-commercial.jpg": ("2C5A1603-bedrijfsfotograaf-den-haag.jpg", "center"),
    "og-linkedin.jpg": ("linkedin-profielfoto-den-haag-man-geruit-jasje-zwart.jpg", "top"),
    "og-fashion.jpg": ("2C5A2547-modefotograaf-den-haag.jpg", "center"),
    "og-concert.jpg": ("concert-fotograaf-hero.jpg", "center"),
    "og-contact.jpg": ("AERO-1528-event-fotograaf-den-haag-fokker-terminal.jpg", "center"),
    "og-about.jpg": ("Willem-Martinot-Fotograaf-Den-Haag.jpeg", "top"),
    "og-blog.jpg": ("2C5A0213-event-fotograaf-den-haag-beeld-en-geluid.jpg", "center"),
    "og-blog-fsisac.jpg": ("images/homepage/hero/congres-fotograaf-den-haag-world-forum-overzicht-1920.jpg", "center"),
    "og-blog-schippers.jpg": ("IMG_1237-bedrijfsfotograaf-den-haag-architecten.jpg", "center"),
}


def crop_to_ratio(
    img: Image.Image, target_w: int, target_h: int, mode: str = "center"
) -> Image.Image:
    src_w, src_h = img.size
    target_ratio = target_w / target_h
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:
        new_h = src_h
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        top = 0 if mode == "top" else (src_h - new_h) // 2
    else:
        new_w = src_w
        new_h = int(src_w / target_ratio)
        left = 0
        top = 0 if mode == "top" else (src_h - new_h) // 2

    cropped = img.crop((left, top, left + new_w, top + new_h))
    return cropped.resize((target_w, target_h), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for out_name, (source_name, crop_mode) in OG_SOURCES.items():
        source_path = ROOT / source_name if "/" in source_name else SOURCE / source_name
        if not source_path.exists():
            raise FileNotFoundError(f"Missing source: {source_path}")

        with Image.open(source_path) as img:
            rgb = img.convert("RGB")
            og = crop_to_ratio(rgb, *TARGET, mode=crop_mode)
            out_path = OUT / out_name
            og.save(out_path, "JPEG", quality=85, optimize=True)
            print(f"Created {out_path.relative_to(ROOT)} ({og.size[0]}×{og.size[1]})")


if __name__ == "__main__":
    main()
