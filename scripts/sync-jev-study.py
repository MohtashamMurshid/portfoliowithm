"""Rebuild the blog's compact chart data from the frozen public study. No model calls."""
import csv
import hashlib
import io
import json
from collections import Counter
from pathlib import Path
from urllib.request import urlopen

REVISION = "723d2ab23279d4959006bc9ea673537047befe2f"
BASE = f"https://raw.githubusercontent.com/MohtashamMurshid/jev-speed-test/{REVISION}"
ROOT = Path(__file__).resolve().parents[1]


def fetch(path):
    with urlopen(f"{BASE}/{path}", timeout=30) as response:
        return response.read()


metrics_bytes = fetch("blog-study/run-v1/analysis/metrics.json")
results_bytes = fetch("data/test-results.csv")
metrics = json.loads(metrics_bytes)
rows = list(csv.DictReader(io.StringIO(results_bytes.decode())))
assert len(rows) == 2000

for model, stats in metrics["stats"].items():
    subset = [row for row in rows if row["system"] == model]
    assert len(subset) == stats["test_n"] == 500
    assert len({row["caseId"] for row in subset}) == 500
    assert sum(row["correct"] == "True" for row in subset) == stats["correct"]
    assert sum(row["status"] != "ok" for row in subset) == stats["failures"]
    for score, rule in metrics["selective"][model].items():
        field = "nativeConfidence" if score == "native" else "probability"
        accepted = [row for row in subset if row["status"] == "ok"
                    and rule["threshold"] is not None and row[field]
                    and float(row[field]) >= rule["threshold"]]
        assert len(accepted) == rule["accepted"]
        assert sum(row["correct"] != "True" for row in accepted) == rule["errors"]


def ecdf(field, correct):
    values = [float(row[field]) for row in rows if row["system"] == "jev"
              and row["status"] == "ok" and row[field]
              and (row["correct"] == "True") == correct]
    count = 0
    points = [[0, 0]]
    for score, frequency in sorted(Counter(values).items()):
        count += frequency
        points.append([score, count / len(values)])
    if points[-1][0] < 1:
        points.append([1, 1])
    return points


data = {
    "provenance": {
        "revision": REVISION,
        "metrics": f"{BASE}/blog-study/run-v1/analysis/metrics.json",
        "results": f"{BASE}/data/test-results.csv",
        "metricsSha256": hashlib.sha256(metrics_bytes).hexdigest(),
        "resultsSha256": hashlib.sha256(results_bytes).hexdigest(),
    },
    **metrics,
    "distributions": {
        name: {"correct": ecdf(field, True), "incorrect": ecdf(field, False)}
        for name, field in [("native", "nativeConfidence"), ("probability", "probability")]
    },
}
destination = ROOT / "components/blog/jev/study.json"
destination.parent.mkdir(parents=True, exist_ok=True)
destination.write_text(json.dumps(data, indent=2) + "\n")
print(f"Verified 2,000 results and all five acceptance rules. Wrote {destination}")
