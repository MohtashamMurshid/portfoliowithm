#!/usr/bin/env python3
"""Generate the separate fresh snapshot. No inference; only pinned evidence reads."""
import argparse
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

REVISION = "08138146e4a7ae0e73487e411e25765839a3d523"
BASE = f"https://github.com/MohtashamMurshid/jev-speed-test/blob/{REVISION}/blog-study/fresh-followup"
RAW = f"https://raw.githubusercontent.com/MohtashamMurshid/jev-speed-test/{REVISION}/blog-study/fresh-followup"
HASHES = {
    "analysis/summary.json": "377312b1353b28d64998db74e79ab5e5b9d7e52cbeb7292b123e1c404b46f3d0",
    "supplement/cost-sensitivity.json": "40860b36df9f8c44045939b7ca86a40d5b0db5d245bbdbe4bf390bea88e2879e",
}
OUTPUT = Path(__file__).resolve().parents[1] / "components/blog/jev/fresh.json"


def snapshot(source_dir=None):
    inputs = {}
    for name, expected in HASHES.items():
        if source_dir:
            raw = (source_dir / name).read_bytes()
        else:
            with urlopen(f"{RAW}/{name}", timeout=60) as response:
                raw = response.read()
        if hashlib.sha256(raw).hexdigest() != expected:
            raise ValueError(f"Evidence hash mismatch: {name}; refusing to update snapshot")
        inputs[name] = json.loads(raw)
    summary = inputs["analysis/summary.json"]
    costs = inputs["supplement/cost-sensitivity.json"]
    labels = {"jev": "Jev", "gemini": "Independent Gemini", "cascade": "Actual cascade", "local": "Supervised TF-IDF LR"}
    systems = [{"id": key, "label": label,
                "accuracy": summary["systems"][key]["accuracy_all_attempts"],
                "median_ms": summary["systems"][key]["timing"]["all_outcomes"]["median_ms"],
                "timing_kind": summary["systems"][key]["timing_kind"]}
               for key, label in labels.items()]
    if [s["accuracy"]["count"] for s in systems] != [399, 425, 424, 425]:
        raise ValueError("Unexpected fresh accuracy counts")
    return {
        "provenance": {"revision": REVISION, "input_sha256": HASHES,
                       "summary": f"{BASE}/analysis/summary.json", "costs": f"{BASE}/supplement/cost-sensitivity.json",
                       "report": f"{BASE}/README.md", "code": f"{BASE}/runner.ts", "data": f"{BASE}/data/README.md"},
        "cohort": "fresh500", "banking_n": summary["banking_n"],
        "new_calls": summary["physical_calls_all_cohorts"]["calls"],
        "systems": systems, "cost_sensitivity": costs,
        "cascade_minus_gemini": {key: summary["comparisons"]["cascade_minus_gemini"][key] for key in ["difference_pp", "ci95_pp"]},
        "training_rows": summary["local_metadata"]["training_rows_retained"],
        "routing": {key: value["n"] for key, value in summary["routing_banking"].items()},
        "safety": summary["safety_banking"],
        "oos": summary["oos"]["safety_accept_false_acceptance"],
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", type=Path, help="Local fresh-followup folder; bytes must match pinned hashes")
    parser.add_argument("--check", action="store_true", help="Verify checked-in output without writing")
    args = parser.parse_args()
    text = json.dumps(snapshot(args.source_dir), indent=2, ensure_ascii=False) + "\n"
    if args.check:
        if OUTPUT.read_text() != text:
            raise SystemExit("Fresh snapshot is out of date")
        print("Fresh snapshot matches pinned evidence")
    else:
        OUTPUT.write_text(text)
        print(f"Wrote {OUTPUT.relative_to(OUTPUT.parents[3])}")


if __name__ == "__main__":
    main()
