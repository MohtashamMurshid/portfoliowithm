---
title: "You fixed your tech debt. Your model debt is next."
author: Mohtasham Murshid Madani
pubDate: "2026-09-05"
---

# You fixed your tech debt. Your model debt is next.

You know tech debt? I think model debt is a real thing too.

I've noticed a pattern in my own projects. When I get access to a more capable generation of models and use it to review older code, I keep finding things we missed. Sometimes it's bad architecture. Sometimes it's a security vulnerability.

I had that experience with [Fable](https://www.anthropic.com/news/claude-fable-5-mythos-5) and with [Astra](https://openai.com/index/gpt-6-astra/). What surprised me was that this was code I'd already accepted. It had seemed good enough. Then another review gave me reasons to question it.

That makes me want to use better models to look back at what I've already built, as well as build the next thing.

## What I mean by model debt

I'm using "model debt" to describe the maintenance burden and unresolved risks we inherit from decisions made with an earlier model, especially decisions that looked reasonable enough to pass our review.

The code doesn't become worse on the day a new model arrives. The problems were already there. We may now have a better chance of seeing them.

You could call this [technical debt](https://martinfowler.com/bliki/TechnicalDebt.html), and I think that's fair. I'm calling out the model's role because it suggests a useful time to revisit the work. A major improvement in the tools we use to reason about code is a reason to inspect decisions we previously accepted.

## Why I thought the code was good enough

Part of this is my own confidence in the model. When I'm using what I believe is the best model available, I don't always question its decisions as closely as I should. The code goes through review bots too, and if nothing significant comes back, I'm more comfortable moving on.

I can't say the review bots deferred to the model's reputation. What I can say is that their reviews didn't catch everything, and I treated those reviews as more reassuring than they turned out to be.

That's the part I want to pay more attention to. A model writes the code, other models review it, and I still own the decision to accept it. Passing that process doesn't mean we've exhausted what there is to find.

![Claude and ChatGPT logos between two illustrated code reviews, with the phrases It passed review, Look again, and What did we miss?](/blog/model-debt/review.webp)

*A conceptual illustration of reviewing previously accepted code. The code and highlights are illustrative, not a verified vulnerability report.*

## Upgrading the model doesn't upgrade the codebase

The next feature may benefit from a better model. Everything we shipped before that is still sitting in the repository.

We can change the model we use in a moment, but the code still contains the choices we made with the previous one. Some of those choices will hold up. Others may look much less convincing under a fresh review.

Older code isn't automatically worse. A newer model might misunderstand a constraint or suggest an abstraction that adds complexity. The date on the model isn't evidence that its recommendation is right.

There's a public example of the value of another look. In its [collaboration with Mozilla](https://www.anthropic.com/news/mozilla-firefox-security), Anthropic reported that Claude Opus 4.6 found 22 Firefox vulnerabilities over two weeks. That doesn't establish that earlier models wrote the affected code. To me, it illustrates the broader reason to revisit existing software when our review tools improve.

## A convincing explanation still needs evidence

I take a suggestion seriously when the model can explain the problem and connect it to something I can check.

For performance work, that might mean comparing load times or checking whether a query does less work while returning the same result. For a security finding, I'd want to understand the conditions that make the failure possible and verify the fix. For architecture, I want it to explain which change is unnecessarily difficult today and how the proposed design helps.

Those are the kinds of evidence I want. A confident explanation alone isn't enough, and "this architecture is cleaner" leaves too much unanswered.

[Google's code review guidelines](https://google.github.io/eng-practices/review/reviewer/standard.html#principles) make a similar distinction, giving technical facts and data priority over personal preferences. I want the same standard when the reviewer is a model.

## Make major model upgrades a review trigger

I think a major jump in capability is a good time to run another review. That's the kind of jump I felt moving from GPT-5.6 to GPT-6 Astra. I don't need to repeat the exercise for every minor release.

Start with a bounded part of an existing codebase. Give the model the relevant requirements and constraints, then ask it to examine security, architecture, and performance. Have it report findings before changing anything.

For each finding, ask for the affected code, the reason it matters, and a way to verify the claim. Keep the findings that survive that check. Fix them in small changes and test the behaviour you need to preserve.

I'd like to automate that first pass. When I adopt a substantially better model, it could review selected older projects and produce findings for me to assess. The automation would make it easier to remember the old code while I'm busy building something new.

That's the habit I want readers to try with their own codebases. Pick a project you built with an earlier model and give it another review. Ask the new model to show you what deserves attention, then check its work.

The next time I upgrade my model, I want an older codebase on the task list too.
