---
layout: ../../layouts/MarkdownPostLayout.astro

title: "Building a 250,000-record instruction dataset for Malaysian AI"
author: Mohtasham Murshid Madani
description: "How I built MY-Instruct-Plus for Malaysian Malay, Manglish, tool use, and English retention, and what comes next."
pubDate: "2026-07-10"
tags: ["instruction tuning", "Malaysian Malay", "Manglish", "datasets", "fine-tuning"]
department: CitySage.my
university: Malaysia
email: mohtasham@citysage.my
---

# Building a 250,000-record instruction dataset for Malaysian AI

Most instruction datasets teach models to behave well in generic English conversations. That is not enough for a Malaysian assistant. It needs to understand Malaysian Malay, informal Manglish, local organizations, public services, and the way people move between languages in one conversation. It also needs to keep its general English ability and produce valid tool calls when a task leaves the chat box.

I built MY-Instruct-Plus to work on that gap. It is a dataset and evaluation program, not a trained model yet. The first release has 91,151 instruction records. A second expansion adds 158,849 records, bringing the combined logical dataset to 250,000.

The next job is model training. I want to use the dataset to fine-tune both small language models and larger language models for Malaysian Malay, Manglish, and urban Malaysian settings such as transport, property, logistics, customer support, education, finance, and government services.

## What exists now

| Artifact | Records | Current state |
| --- | ---: | --- |
| Evaluation data | 30,000 | Stored in BigQuery |
| MY-Instruct-Plus v1 | 91,151 | Built, split, and validated |
| v2 expansion | 158,849 | Materialized and validated locally |
| Combined v2 dataset | 250,000 | Logical union of v1 and the expansion |
| Fine-tuned model | 0 | Planned, not trained yet |

The distinction in the last row matters. A large dataset does not prove that a model will improve. That claim needs controlled training runs and an evaluation that checks local performance without ignoring regression elsewhere.

## Why translation alone falls short

Malaysian localization has several different jobs. A translated instruction may be grammatically correct and still sound wrong to a Malaysian user. A place, agency, currency, or work scenario may also remain foreign even after its words become Malay.

MY-Instruct-Plus separates three types of adaptation:

| Mode | What changes | Where it helps |
| --- | --- | --- |
| Translate only | Preserves the task and converts its language into Malaysian Malay | Tasks where exact source meaning or formatting must stay intact |
| Manglish | Adds natural Malay and English code-switching | Informal chat and workplace conversations |
| Context localization | Changes names, places, institutions, currencies, and situations | Tasks that depend on Malaysian context |

These modes cannot be applied blindly. Earlier judging found that broad context changes weakened some exact-format SlimOrca tasks. The safe v1 export therefore kept translate-only and Manglish variants for that source and removed the weaker context-localized rows.

The lesson was annoyingly specific but useful. Localization policy should depend on the source family. One transformation does not fit every instruction dataset.

## What is inside v1

The first release combines four source families:

| Source family | Records | Share |
| --- | ---: | ---: |
| Original MY-Instruct chat | 40,000 | 43.88% |
| MY-Instruct tool calls | 10,000 | 10.97% |
| Localized UltraChat | 24,607 | 27.00% |
| Safe localized SlimOrca | 16,544 | 18.15% |
| Total | 91,151 | 100% |

The split is deterministic: 86,593 training examples and 4,558 validation examples. The release also has manifests and checksums so the exact pack can be reconstructed and checked later.

## How v2 reaches 250,000 records

The expansion does not copy the v1 rows. It adds 158,849 new records:

| Expansion component | Records | Why it is included |
| --- | ---: | --- |
| Malaysian synthetic chat | 50,000 | More local tasks, tones, and domains |
| Malaysian tool and agent examples | 15,000 | Structured calls and multi-step work |
| English retention slice | 15,000 | Reduce general-English regression during local tuning |
| UltraChat localization | 40,000 | More Malaysian Malay and Manglish conversations |
| SlimOrca localization | 35,000 | More explanation and instruction-following data |
| Judge-improved and preference rows | 3,849 | Correct weak generations and preserve preferred responses |
| Expansion total | 158,849 | Combined with v1 for 250,000 records |

The expansion is split into 150,907 training and 7,942 validation rows. Pack construction reported zero malformed JSON rows, zero duplicate IDs, and zero rejected rows in the final materialization.

## The data pipeline

The process is easier to understand as a loop rather than a single generation job:

```text
open instruction data + Malaysian task prompts
                    |
                    v
normalize JSONL and record provenance
                    |
                    v
generate, translate, use Manglish, or localize context
                    |
                    v
check parsing, duplicates, leakage, and provider failures
                    |
                    v
run model-judge diagnostics on sampled records
                    |
                    v
build deterministic train and validation packs
                    |
                    v
fine-tune and evaluate models
                    |
                    +---- results guide the next filtering pass
```

Every accepted record keeps a source identifier, dataset name, license information, and original ID where available. Rejected rows go into separate logs instead of disappearing. This makes it possible to trace a training record back to its source family and transformation.

## Quality checks so far

Model judging is used as a diagnostic, not as ground truth. A model can prefer fluent text that is locally wrong, reward its own style, or miss a subtle change in task meaning.

The current diagnostics include:

| Sample | Judgments | Passes | Failures | Average score |
| --- | ---: | ---: | ---: | ---: |
| UltraChat localized subset | 2,000 | 1,892 | 108 | 4.697 |
| SlimOrca localized subset | 2,000 | 1,809 | 191 | 4.571 |

Those numbers are useful for comparing source and localization choices. They do not replace evaluation by Malaysian speakers. Human review is still needed for natural phrasing, local correctness, code-switching, and whether a response fits the situation.

The pipeline also checks for obvious Indonesian lexical leakage. Malay and Indonesian overlap, so this cannot be reduced to rejecting a few words. The final evaluation should measure whether the model chooses Malaysian usage consistently without treating valid shared vocabulary as an error.

## The fine-tuning plan

The first training run should be small enough to debug. The draft proposes a Qwen-family model around 4 billion parameters with LoRA or QLoRA. That pilot can reveal formatting mistakes, loss spikes, bad mixtures, and English regression before spending more compute on a larger model.

The minimum comparison is:

| Model condition | Question it answers |
| --- | --- |
| Base model | How capable is the untuned model? |
| Base model plus v1 | Does the first 91,151-record pack help? |
| Base model plus v2 | Does the 250,000-record mixture improve on v1? |
| v2 without English retention | Does the English slice prevent regression? |
| Translate-only subset | Does broader localization beat direct translation? |
| Frontier teacher | How far is the smaller student from its data generator? |

If the 4B pilot improves the local tasks without damaging English, I want to repeat the strongest setting on larger models. This creates two useful outputs. An SLM could run more cheaply and closer to local applications. A larger LLM could test how far the same regional data scales when the base model has more capacity.

## What the models should become better at

The goal is not a model that inserts Malaysian place names into generic answers. It should handle the actual texture of local work:

- a commuter switching between English and Malay while asking about a route;
- a property assistant understanding local location and housing terms;
- a support agent using the right agency, currency, and address format;
- a logistics workflow that turns a bilingual request into a valid tool call;
- an education assistant that can explain in formal Malay, English, or natural code-switching;
- a local business assistant that understands the user's shorthand without answering in Indonesian.

These are urban Malaysian environments because the context affects the task. Transport systems, municipal services, delivery addresses, property terminology, and workplace language all change what a correct answer looks like.

## How I plan to evaluate it

The evaluation needs separate scores for:

- Malaysian Malay instruction following;
- Manglish and code-switched conversations;
- Malaysian-context question answering;
- exact tool-call structure;
- Indonesian leakage;
- English and general-task retention.

I also want ablations for the English slice, each localization mode, and judge-based filtering. Without those runs, a better score would not tell us which part of the dataset helped.

Human raters should review naturalness and local correctness after the automated tests. Later work can add more Malaysian languages and dialects, retrieval tasks grounded in local knowledge, and a public benchmark dashboard.

## What this work does not prove yet

Most of the new material is synthetic, translated, or generated by a teacher model. It can inherit the teacher's tone, factual mistakes, and preferences. Model judging can repeat the same biases. The open datasets also need a complete license and provenance audit before public release.

The current paper is therefore a dataset release draft and experimental roadmap. The data pipeline exists. The 250,000-record logical pack exists. The fine-tuned SLM and LLM results do not exist yet.

That is the next test: whether regional data can make a model more useful in Malaysian Malay, Manglish, and local urban work without turning it into a narrow model that forgets everything else.

## Sources

- [Wang et al. (2022), Self-Instruct](https://arxiv.org/abs/2212.10560)
- [Ding et al. (2023), Enhancing Chat Language Models by Scaling High-quality Instructional Conversations](https://arxiv.org/abs/2305.14233)
- [OpenOrca and SlimOrca](https://huggingface.co/Open-Orca)
- [Qwen technical reports](https://qwenlm.github.io/)
