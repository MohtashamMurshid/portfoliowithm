---
title: "You fixed your tech debt. Your model debt is next."
platform: X
coverImage: "/blog/model-debt/cover.webp"
draft: true
fullArticleUrl: "https://www.mohtasham.dev/blog/model-debt-is-a-real-thing"
publicationNote: "Publish the full portfolio article at this URL before posting this shorter version."
---

# You fixed your tech debt. Your model debt is next.

Every time I use a more capable generation of models to review my older code, I seem to find something we missed. I had that experience with Fable and Astra. Security vulnerabilities. Architecture that looked reasonable when we shipped it, then much less reasonable under another review.

The uncomfortable part is that I'd trusted that code. I was using what I believed was the best model available. Review bots had checked it too. That made me less likely to question the result.

I'm calling this model debt. It's the maintenance cost and unresolved risk left behind by decisions we made with earlier models.

Upgrading the model doesn't upgrade the codebase. The old decisions are still there.

So when there's a major jump in capability, I think we should give our existing projects another review. Ask for specific findings and explanations before letting the model change anything.

A newer model still has to earn our trust. If it suggests optimizing a query, compare the results and performance. If it flags a vulnerability, verify the failure and the fix. A different architecture needs a better justification than "cleaner."

I'd like to automate the first review pass whenever I adopt a substantially better model, then check the findings myself.

The next time you upgrade your model, give it something old to inspect.

[Read the full article on my portfolio](https://www.mohtasham.dev/blog/model-debt-is-a-real-thing).
