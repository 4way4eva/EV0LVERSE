#!/usr/bin/env python3
"""Validate the A.F.G. simulation package using only the Python standard library."""
from __future__ import annotations
import csv
import hashlib
import json
from pathlib import Path
import sys


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    manifest = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
    failures = []
    for item in manifest["files"]:
        path = root / item["path"]
        if not path.is_file():
            failures.append(f"missing: {item['path']}")
            continue
        actual = sha256(path)
        if actual != item["sha256"]:
            failures.append(f"hash mismatch: {item['path']}")

    model = json.loads((root / "data/afg-defense-grid.json").read_text(encoding="utf-8"))
    if model.get("schemaVersion") != "1.0.0":
        failures.append("unexpected schemaVersion")
    if model.get("framing") != "fictional-simulation":
        failures.append("framing must remain fictional-simulation")
    if model["perimeter"]["sentryRing"]["nodeCount"] != 12:
        failures.append("sentry ring must declare 12 nodes")
    if model["perimeter"]["scoutRing"]["nodeCount"] != 12:
        failures.append("scout ring must declare 12 nodes")

    with (root / "data/afg-nodes.csv").open(newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if len(rows) != 24:
        failures.append(f"expected 24 perimeter nodes, found {len(rows)}")

    if failures:
        for failure in failures:
            print(f"FAIL: {failure}")
        return 1
    print(f"OK: {len(manifest['files'])} hashed files; 24 perimeter nodes; schema 1.0.0")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
