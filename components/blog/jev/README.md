# Jev study figures

This article keeps its original image cover and has 12 inline React figures,
including the test architecture in the methods section. `JevArticle.tsx`
registers standalone Markdown links as figures. Those links remain readable in
the Markdown edition; other articles use the existing renderer.

`JevInteractive.tsx` contains the latency, score-distribution, acceptance-rule,
and probability-calibration controls. The remaining figures render on the
server. All figures include text values or expandable data tables. Controls
switch recorded statistics and rules; they never select new cutoffs.

`study.json` is a checked-in snapshot, so rendering makes no external requests.
Its provenance includes the source revision, URLs, and SHA-256 hashes. Rebuild it
from the repository root with:

```sh
python3 scripts/sync-jev-study.py
```

The script downloads immutable source files, verifies all 2,000 test records
against the reported counts and five frozen rules, and computes exact Jev
empirical cumulative distributions. It does not call any models. Stage costs,
full-study billing totals, sampling counts, and repeat-label agreement come from
the article and are labeled separately in the component's source table.

The original WebP assets remain available at their published URLs. The image
cover appears above the article and in blog listings and social previews.
The inline diagrams use React, sans-serif type, and no enclosing cards.
