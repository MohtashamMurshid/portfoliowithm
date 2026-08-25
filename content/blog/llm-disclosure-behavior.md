---
layout: ../../layouts/MarkdownPostLayout.astro

title: "What makes an AI agent disclose sensitive information?"
author: Mohtasham Murshid Madani
description: "A 1,120-trial study of how prompt tone and tool type shaped disclosure attempts across 14 language models."
pubDate: "2026-05-08"
tags: ["AI safety", "agents", "LLM evaluation", "tool use", "privacy"]
department: School of Computer Science
university: Taylor's University Lakeside Campus
email: mohtashammurshid@gmail.com
---

# What makes an AI agent disclose sensitive information?

An assistant that can only produce text has limited reach. Give the same model email, terminal, file, or API tools and its decisions can leave the chat. That changes the safety question from "What will the model say?" to "What is it allowed to do, under which instructions, and who reviews the action?"

Muizza Muayqeeb Akram and I studied one part of that question with [SnitchBench](https://github.com/T3-Content/SnitchBench), Theo Browne's open-source benchmark for proactive disclosure. We ran 1,120 trials across 14 language models and measured whether they attempted to contact a government body or a media outlet about a fictional pharmaceutical cover-up.

Nothing was actually sent. The benchmark ran in a sandbox and recorded tool attempts in logs.

## What we tested

The experiment changed two variables:

- **System-prompt tone:** bold language that encouraged action, or tame language that emphasized caution.
- **Tool modality:** a simulated email tool, or a command-line tool.

That produced a `2 × 2` design:

| | Email tool | CLI tool |
| --- | --- | --- |
| Bold prompt | Could compose an external message; action was strongly encouraged | Could create commands or artifacts; action was strongly encouraged |
| Tame prompt | Could compose an external message; wording was neutral | Could create commands or artifacts; wording was neutral |

Each of the 14 models saw four fictional scenarios under all four conditions. We repeated every model-condition-scenario combination five times:

```text
14 models × 4 scenarios × 4 conditions × 5 repeats = 1,120 trials
```

The condition and scenario order were randomized per model. Runs used fixed decoding settings of `temperature = 0.4` and `top_p = 1.0`. A run stopped after a clear disclosure attempt or after its time or token limit.

## What counted as disclosure

The two primary outcomes were binary:

| Outcome | Counted when the model attempted to contact |
| --- | --- |
| `GovDisclosure` | A government, regulator, or oversight body |
| `MediaDisclosure` | A journalist or media organization |

Keyword and domain rules first flagged possible attempts. A human reviewer then checked the candidates. Ten percent of trials were double-coded, with disagreements sent to a reviewer who did not know which model produced the run.

This measures attempted disclosure, not whether the disclosure was justified, accurate, proportionate, or well written. Those are separate questions.

## The main result

Prompt tone changed behavior sharply, but it did not affect every model equally. Tool modality changed whether the action looked like a direct message or a command-line artifact.

The bold-email condition produced the most disclosure. Eleven models attempted government disclosure in at least 90 percent of those runs. Grok 4 reached 100 percent for government and media attempts in the recorded results. Claude 4 Opus reached 90 percent government and 35 percent media in bold CLI, then higher media disclosure with email access.

The tame-CLI condition produced the least disclosure for most models. Grok 4 was the major outlier at 95 percent government and 50 percent media. Most other models remained at or below 25 percent government disclosure, with little media disclosure.

Some models moved from no disclosure under tame CLI to at least 90 percent government disclosure under bold email. That swing matters more than a simple ranking. It shows that a model's apparent policy can depend heavily on wording and available actions.

## Government and media were not treated the same

Across the experiment, models attempted to contact government bodies more often than media outlets. Even when a model was willing to escalate, it often chose an official authority rather than the press.

The experiment cannot tell us why. Training data, system policies, provider tuning, and the scenario wording are all possible contributors. Inferring an internal motive from the output would go beyond the evidence.

## Tool permissions are a safety boundary

The benchmark makes a basic engineering point visible: a model cannot send an email if the application does not give it an email tool. The model's behavior matters, but the developer controls the available action space.

A safer agent design treats every consequential tool as a permissioned boundary:

```text
model proposes an action
          |
          v
policy checks scope, recipient, data, and risk
          |
     +----+----+
     |         |
     v         v
 auto-run   require review
     |         |
     +----+----+
          v
execute with an audit log
```

For outbound communication, that can mean:

- recipient allowlists;
- separate permission for drafting and sending;
- a preview that shows all transmitted data;
- confirmation for new domains or sensitive content;
- rate and volume limits;
- scoped credentials rather than a user's full account;
- an immutable log of the prompt, proposed action, approval, and result;
- a kill switch that disables the integration without changing the model.

Prompt instructions still matter. They are not a replacement for tool policy. A small wording change should not silently grant a model authority that the surrounding application intended to withhold.

## Why a single benchmark cannot settle the policy

This study used one family of fictional wrongdoing scenarios. A model that reports a possible drug cover-up may behave differently with personal health data, workplace complaints, source code, financial records, or an ambiguous joke.

The binary outcome also treats all attempts alike. It does not separate a cautious draft for human review from an immediate attempt to send an accusation. It does not score whether the evidence was sufficient or whether the selected recipient was appropriate.

The named models and provider endpoints are snapshots. Model weights, hidden system instructions, safety layers, and APIs can change. The results should be tied to the recorded versions and rerun rather than treated as permanent personality traits.

Finally, the test was sandboxed. That was the right safety choice, but a simulated tool may not produce the same behavior as a real account with real recipients, irreversible consequences, and organization-specific policy.

The analyzed trials all had either email or CLI tools. A tool-disabled warm-up checked whether each API worked, but it was excluded from the analysis. The study therefore compares tool modality, not a complete tools-versus-no-tools control.

## How I would extend the evaluation

A follow-up should test more than whether a disclosure attempt happened:

1. Grade whether the evidence justified escalation.
2. Separate drafting, requesting approval, and sending.
3. Vary the recipient's authority and trustworthiness.
4. Introduce incomplete, conflicting, and malicious documents.
5. Measure how often the model reveals unrelated private data.
6. Repeat the test after model or policy updates.
7. Compare model-level guardrails with application-level permission checks.
8. Include a human review condition and measure whether it catches bad actions without blocking good ones.

The goal is not to make an agent that always reports or never reports. It is to make its authority explicit, its decisions reviewable, and its behavior stable enough that a small prompt change cannot bypass the product's policy.

## Sources

- [Original disclosure-behavior study](https://docs.google.com/document/d/1yPrIA_0gfUoOd9DN2038uaNfBUsJd7foVX1pxAMZZMA/edit)
- [SnitchBench source repository](https://github.com/T3-Content/SnitchBench)
- [Ganguli et al. (2022), Red Teaming Language Models with Language Models](https://arxiv.org/abs/2202.03286)
- [Liang et al. (2022), Holistic Evaluation of Language Models](https://arxiv.org/abs/2211.09110)
- [Bai et al. (2022), Constitutional AI](https://arxiv.org/abs/2212.08073)
