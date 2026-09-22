# Jev study figures

This article keeps its original image cover and all 12 original inline React
figures, including the test architecture in the methods section. Three separately
labeled fresh-validation figures follow the historical results. `JevArticle.tsx`
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

## Review-only fresh validation

`FreshResults.tsx` uses `fresh.json`, never `study.json`. The original500 figures,
selected title, and original sync script are unchanged. The fresh500 snapshot is
pinned to evidence revision `08138146e4a7ae0e73487e411e25765839a3d523` and verifies
SHA-256 hashes for `analysis/summary.json` and `supplement/cost-sensitivity.json`.

```sh
# Immutable public inputs, no inference:
python3 scripts/sync-jev-fresh.py
# Or use already-downloaded evidence, with the same required hashes:
python3 scripts/sync-jev-fresh.py --source-dir /path/to/fresh-followup --check
npm run lint
npm run build
npx playwright test tests/e2e/jev-blog.spec.ts tests/e2e/jev-fresh.spec.ts
```

Fresh costs use the lower sensitivity assumption, not the larger reservation
scenario as an actual saving. Hosted path timing and local CPU timing remain
separate. The classifier's labeled training data and the easy-domain limitation
of the out-of-scope check must stay visible.

The parent paper task supplies the real `public/research/jev-confidence-study.pdf`.
There is no new `/research` route. The PDF test intentionally requires HTTP 200,
PDF content type, and the PDF signature; it must not pass via a placeholder or
skip. This local integration is for review, not publication approval.
