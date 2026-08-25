---
layout: ../../layouts/MarkdownPostLayout.astro

title: "How cognitive systems work"
author: Mohtasham Murshid Madani
description: "A practical explanation of the data, models, evidence, confidence, interfaces, and human feedback inside a cognitive system."
pubDate: "2025-08-15"
tags:
  [
    "cognitive systems",
    "architecture",
    "machine learning",
    "AI",
    "design principles",
  ]
department: School of Computer Science
university: Taylor's University Lakeside Campus
email: mohtashammurshid@gmail.com
---

# How cognitive systems work

A cognitive system is more than a model with a chat box. It gathers information, turns that information into usable representations, produces possible answers, scores the supporting evidence, and gives a person enough context to decide what to do next.

This article is adapted from research I completed for `ITS69404 Cognitive Computing and Applications` at Taylor's University, taught by Dr Arafat Aldhaqm. I did not build a prototype for the assignment. What follows is a practical explanation of the architecture described in the course material and research.

## The system is the product, not the model

It is easy to point at the machine-learning component and call that the cognitive system. That leaves out most of the engineering.

A model cannot answer a useful question until the system has collected the right data, cleaned it, recorded where it came from, and converted it into a form the model can process. The answer still needs evidence, a confidence estimate, and an interface that a person can understand. Feedback from that person may then become new training or evaluation data.

The complete path looks like this:

**Inputs → ingestion → knowledge corpus → analysis and models → candidate answers → evidence and confidence → human review → feedback**

IBM's DeepQA work on Watson is a useful reference because it did not depend on one question-answering technique. It combined many analysis and scoring methods, generated possible answers, gathered evidence for them, and ranked the results. The architecture mattered because it made those different methods work together.

## The main parts

| Part | What it does | What can go wrong |
| --- | --- | --- |
| Inputs | Accepts text, images, audio, records, or sensor data | The system collects irrelevant, incomplete, or biased material |
| Ingestion | Parses, cleans, labels, and normalizes each input type | Different formats lose meaning during conversion |
| Knowledge corpus | Stores source material, metadata, versions, and provenance | The system cannot trace an answer back to its source |
| Analytics | Extracts entities, patterns, features, and relationships | Early processing errors reach every later stage |
| Learning models | Predicts, groups, represents, or chooses actions | The model is used for a task its training does not support |
| Hypothesis scoring | Compares possible answers and their evidence | A score is presented as certainty without calibration |
| Presentation | Shows the result, source, and uncertainty to a person | A clean interface hides weak evidence |
| Feedback | Records corrections and difficult cases | Feedback is collected but never used to test or update the system |

The knowledge corpus deserves more attention than it usually gets. It should contain the source itself and enough metadata to answer basic questions later. Where did this record come from? When did it change? Which model saw it? Which answer used it as evidence?

Without that record, retraining is harder and an incorrect result is difficult to investigate.

## One hypothetical example

Imagine a university study-support system. This is an example, not a product I built.

A student uploads lecture notes, slides, and past quiz results. The ingestion layer extracts text and separates the material by subject. The corpus stores each source with its course, week, file name, and upload date.

The system then has several jobs:

1. Find the topics covered by the course material.
2. Compare those topics with the student's quiz errors.
3. Produce several possible explanations for the weak areas.
4. Rank those explanations using the available evidence.
5. Show the student which files and answers led to each recommendation.
6. Record whether the recommendation was useful.

A weak version says, "Study recursion." A better version says the student missed three recursion questions, links to the relevant lecture sections, shows a confidence level, and explains why recursion ranked above the other topics.

The second result is useful because the rest of the system supports the model output.

## Choosing a learning method

The original assignment compared supervised, unsupervised, self-supervised, and reinforcement learning. These methods do different jobs. A large cognitive system may use more than one.

| Method | Use it when | Example in the study system |
| --- | --- | --- |
| Supervised learning | You have labelled examples and a clear target | Predict whether an answer is correct from previously marked work |
| Unsupervised learning | You need to find structure without labels | Group lecture material into related topic clusters |
| Self-supervised learning | The data itself can provide a training signal | Learn representations of course text before fine-tuning |
| Reinforcement learning | Actions affect later states and rewards | Choose a sequence of exercises based on later performance |

Supervised learning is the obvious choice when reliable labels exist. Its cost is the work required to create and maintain those labels.

Unsupervised and self-supervised methods help when labelled data is scarce. They can expose structure or create representations that another model uses later. They do not remove the need for evaluation. A cluster that looks mathematically coherent may still be useless to a student.

Reinforcement learning fits sequential decisions. The system acts, observes the next state, receives a reward, and updates its policy. That makes sense for robotics, navigation, or an adaptive exercise sequence. It is unnecessary for a one-step classification problem.

## Candidate answers are better than one unexplained answer

A cognitive system often deals with incomplete or conflicting evidence. Producing one answer too early hides that uncertainty.

A hypothesis-based design keeps several candidates long enough to compare them. Each candidate gathers evidence from the corpus. The scoring layer can then consider source quality, agreement between models, recency, and task-specific signals.

Watson's DeepQA architecture used this general pattern for question answering. The important idea is broader than Watson: generate alternatives, collect evidence for each one, and rank them using more than a single model output.

For the study example, the candidates might be recursion, data structures, and time complexity. The system should keep the evidence for all three, even if recursion ranks first.

## A confidence score needs calibration

A model score is not automatically a trustworthy probability. A model can say `0.90` and still be correct much less than 90 percent of the time.

Calibration asks whether confidence matches observed outcomes. Among predictions made with 80 percent confidence, roughly 80 percent should be correct. Research by Kuleshov, Fenner, and Ermon shows why uncertainty estimates may need a separate calibration procedure. Gal and Ghahramani provide another approach to model uncertainty through dropout-based approximate Bayesian inference.

The practical lesson is simple. Do not place a percentage beside an answer just because the model returned one. Test the score against held-out data and against the decision where people will use it.

Confidence also needs context in the interface. A user should be able to see:

- what the number measures;
- which evidence supports it;
- whether important sources were missing;
- how close the next candidate was;
- what action is safe at that confidence level.

## Presentation changes how the system behaves

The interface is part of the feedback loop. It determines whether users can catch an error, inspect the evidence, and correct the system.

A useful result page should show the recommendation, its source material, the confidence estimate, and meaningful alternatives. It should also give the user a way to disagree.

That feedback can support two different jobs. First, it can produce labels for later training. Second, it can route ambiguous or high-risk cases to a person instead of letting the system decide alone.

Human review should be selective. Sending every result to a person defeats the purpose of automation. Sending no difficult results to a person makes the system brittle. A practical design routes low-confidence, novel, or high-impact cases for review.

## Multimodal input needs separate processing

Text, images, audio, and sensor readings do not become useful through the same parser. Each input type needs its own processing before the system can combine them.

An audio lecture may need transcription and speaker separation. A diagram may need image analysis and surrounding text. A sensor stream needs timestamps and sampling information. The system can only combine these sources after it preserves what each one means.

Baltrušaitis, Ahuja, and Morency organize multimodal machine learning around representation, translation, alignment, fusion, and co-learning. Those categories are a useful check when designing the ingestion and representation stages. "Supports images and text" says very little until the system explains how it aligns and combines them.

## The feedback loop

A cognitive system should improve through a controlled loop, not by quietly training on every interaction.

1. Store new inputs with provenance.
2. Run the relevant analysis and learning components.
3. Generate and score candidate answers.
4. Present the evidence and uncertainty.
5. Collect corrections and difficult cases.
6. Review that feedback before using it for training.
7. Evaluate the updated system against a fixed test set.
8. Release the update with a recorded model and data version.

The distinction between collecting feedback and learning from feedback matters. Bad, adversarial, or misunderstood feedback can make the next version worse.

## A practical design checklist

Before building a cognitive system, write down the answers to these questions:

- What decision is the system helping someone make?
- Which input types does it need?
- How will every source and transformation be recorded?
- Which task belongs to which learning method?
- Does the system need several candidate answers?
- What does its confidence score actually mean?
- How will users inspect the evidence?
- Which cases require human review?
- How will feedback enter the next evaluation or training run?
- Which privacy, bias, latency, and regulatory constraints apply?

If these questions have no concrete answers, choosing a larger model will not repair the architecture.

## What this research does not prove

This article explains a conceptual architecture. I did not implement or benchmark it. The assignment combined course material with established papers, so it cannot tell us how much a particular calibration method, active-learning strategy, or interface would improve a real product.

Those answers depend on the domain, data, users, and cost of a wrong decision. A healthcare tool and a study assistant may share the same high-level parts while needing completely different evaluation, privacy controls, and review policies.

## Sources

- [Ferrucci et al. (2010), Building Watson: An Overview of the DeepQA Project](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/2303/0)
- [LeCun, Bengio, and Hinton (2015), Deep learning](https://www.nature.com/articles/nature14539)
- [Sutton and Barto (2018), Reinforcement Learning: An Introduction](https://www.incompleteideas.net/book/the-book-2nd.html)
- [Baltrušaitis, Ahuja, and Morency (2018), Multimodal Machine Learning: A Survey and Taxonomy](https://arxiv.org/abs/1705.09406)
- [Amershi et al. (2014), Power to the People: The Role of Humans in Interactive Machine Learning](https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/2513)
- [Gal and Ghahramani (2016), Dropout as a Bayesian Approximation](https://proceedings.mlr.press/v48/gal16.html)
- [Kuleshov, Fenner, and Ermon (2018), Accurate Uncertainties for Deep Learning Using Calibrated Regression](https://proceedings.mlr.press/v80/kuleshov18a.html)
- [Doshi-Velez and Kim (2017), Towards a Rigorous Science of Interpretable Machine Learning](https://arxiv.org/abs/1702.08608)
- [Miller (2019), Explanation in Artificial Intelligence: Insights from the Social Sciences](https://doi.org/10.1016/j.artint.2018.07.007)
- [Hullman and Diakopoulos (2011), Visualization Rhetoric: Framing Effects in Narrative Visualization](https://doi.org/10.1109/TVCG.2011.255)
