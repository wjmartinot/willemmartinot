#!/usr/bin/env python3
"""Ping Bing IndexNow for new/updated page URLs.

Usage:
  python3 scripts/indexnow.py --urls https://www.willemmartinot.nl/contact/
  python3 scripts/indexnow.py --files index.html event-fotograaf-den-haag/index.html
  python3 scripts/indexnow.py --git-diff HEAD~1 HEAD
  python3 scripts/indexnow.py --sitemap

Requires the verification file /{key}.txt in the site root (IndexNow ownership proof).
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOST = "www.willemmartinot.nl"
ORIGIN = f"https://{HOST}"
ENDPOINT = "https://www.bing.com/indexnow"
KEY_RE = re.compile(r"^[a-zA-Z0-9-]{8,128}$")


def find_key() -> tuple[str, Path]:
    """Locate IndexNow key file in site root: {key}.txt with key as sole content."""
    for path in sorted(ROOT.glob("*.txt")):
        name = path.stem
        if not KEY_RE.fullmatch(name):
            continue
        if name.startswith("requirements") or name in {"robots", "humans"}:
            continue
        content = path.read_text(encoding="utf-8").strip()
        if content == name:
            return name, path
    raise SystemExit(
        "No IndexNow key file found in site root. "
        "Expected /{key}.txt containing only the key."
    )


def path_to_url(rel: str) -> str | None:
    """Map a repo-relative HTML path to its public URL."""
    rel = rel.replace("\\", "/").lstrip("./")
    if not rel.endswith(".html"):
        return None
    if rel.startswith("partials/") or "/partials/" in rel:
        return None
    if rel in {"404.html"}:
        return None
    if any(p in rel.split("/") for p in (".git", "node_modules", "willemmartinot", "scripts")):
        return None

    if rel == "index.html":
        return f"{ORIGIN}/"
    if rel.endswith("/index.html"):
        return f"{ORIGIN}/{rel[:-10]}"  # strip index.html, keep trailing slash via dirname+/
    # non-index html (rare)
    return f"{ORIGIN}/{rel}"


def urls_from_files(files: list[str]) -> list[str]:
    urls: list[str] = []
    seen: set[str] = set()
    for f in files:
        url = path_to_url(f)
        if url and url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def urls_from_git_diff(base: str, head: str) -> list[str]:
    result = subprocess.run(
        ["git", "diff", "--name-only", "--diff-filter=AM", base, head],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise SystemExit(f"git diff failed: {result.stderr.strip()}")
    files = [line.strip() for line in result.stdout.splitlines() if line.strip()]
    return urls_from_files(files)


def urls_from_sitemap() -> list[str]:
    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        raise SystemExit("sitemap.xml not found")
    tree = ET.parse(sitemap)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [el.text.strip() for el in tree.findall(".//sm:loc", ns) if el.text]
    if not locs:
        # fallback without namespace
        locs = [el.text.strip() for el in tree.findall(".//loc") if el.text]
    return locs


def submit(urls: list[str], key: str, dry_run: bool = False) -> int:
    if not urls:
        print("No URLs to submit.")
        return 0

    # IndexNow allows up to 10_000 URLs per request
    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": f"{ORIGIN}/{key}.txt",
        "urlList": urls[:10000],
    }

    print(f"Submitting {len(payload['urlList'])} URL(s) to {ENDPOINT}")
    for u in payload["urlList"]:
        print(f"  · {u}")

    if dry_run:
        print("Dry run — no request sent.")
        print(json.dumps(payload, indent=2))
        return 0

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            print(f"HTTP {resp.status} {resp.reason}")
            if body:
                print(body)
            return 0 if resp.status in (200, 202) else 1
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"HTTP {e.code} {e.reason}", file=sys.stderr)
        if body:
            print(body, file=sys.stderr)
        return 1
    except urllib.error.URLError as e:
        print(f"Request failed: {e}", file=sys.stderr)
        return 1


def main() -> int:
    parser = argparse.ArgumentParser(description="Submit URLs to Bing IndexNow")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--urls", nargs="+", help="Full URLs to submit")
    group.add_argument("--files", nargs="+", help="Repo-relative HTML paths")
    group.add_argument(
        "--git-diff",
        nargs=2,
        metavar=("BASE", "HEAD"),
        help="Submit URLs for HTML files changed between two git refs",
    )
    group.add_argument("--sitemap", action="store_true", help="Submit all sitemap URLs")
    parser.add_argument("--dry-run", action="store_true", help="Print payload only")
    args = parser.parse_args()

    key, key_path = find_key()
    print(f"Key: {key} ({key_path.name})")

    if args.urls:
        urls = args.urls
    elif args.files:
        urls = urls_from_files(args.files)
    elif args.git_diff:
        urls = urls_from_git_diff(args.git_diff[0], args.git_diff[1])
    else:
        urls = urls_from_sitemap()

    return submit(urls, key, dry_run=args.dry_run)


if __name__ == "__main__":
    raise SystemExit(main())
