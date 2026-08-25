---
layout: ../../layouts/MarkdownPostLayout.astro

title: "What happened when we compared three CNNs on fracture X-rays"
author: Mohtasham Murshid Madani
description: "A practical account of comparing ResNet50, VGG16, and a custom CNN on a multi-region fracture X-ray dataset."
pubDate: "2026-08-26"
tags: ["computer vision", "CNN", "medical imaging", "transfer learning"]
department: School of Computer Science
university: Taylor's University Lakeside Campus
email: mohtashammurshid@gmail.com
---

# What happened when we compared three CNNs on fracture X-rays

Muizza Muayqeeb Akram and I compared ResNet50, VGG16, and a smaller custom convolutional neural network on X-rays labelled as fractured or non-fractured. The point was not to build a diagnostic product. It was to see how two transfer-learning models compared with a model trained for this specific binary-classification task.

The headline result was easy to report: VGG16 reached 100 percent accuracy in its recorded test run, ResNet50 reached 92 percent, and the custom CNN reached 71.18 percent. The useful result is more cautious. The perfect VGG16 score and inconsistent evaluation counts mean the experiment is a starting point, not evidence that the model is ready for clinical use.

## The experiment in one line

**X-ray images → clean and standardize → augment training data → train three CNNs → compare held-out predictions**

The source was a public multi-region bone X-ray dataset with two labels. It included several anatomical regions rather than one fixed body part. That makes the task more varied, but a binary label also hides details such as fracture location, type, severity, and image quality.

The methods section records this split:

| Split | Images | Share of recorded total |
| --- | ---: | ---: |
| Training | 4,097 | 75.4% |
| Validation | 828 | 15.2% |
| Test | 506 | 9.3% |
| Total | 5,431 | 100% |

The paper's abstract mentions about 9,246 images, while the detailed split adds up to 5,431. I use the split totals here because they are explicit, but this discrepancy needs to be resolved before the experiment is reproduced.

## How the images were prepared

The preparation pipeline had four jobs:

1. Remove duplicate and unreadable files.
2. Resize every image to `224 × 224` pixels.
3. Scale pixel values from `0` to `255` into the range `0` to `1`.
4. Augment training images with rotations, flips, zooms, and shifts.

Cleaning is especially important here. If the same or nearly identical X-ray appears in both training and test sets, the test score can measure memorization instead of generalization. File hashes catch exact duplicates, but they do not catch resized, cropped, recompressed, or near-duplicate images. A stronger follow-up would group images by patient or study before splitting.

Augmentation also needs medical judgment. A transformation that is harmless for ordinary photographs may create an anatomically implausible X-ray. Each flip, rotation, crop, and contrast change should match variations that can occur in the real imaging process.

## The three models

| Model | What it contributes | Main cost or risk |
| --- | --- | --- |
| ResNet50 | Residual connections and ImageNet pretraining | More computation than the custom model; still vulnerable to dataset shift |
| VGG16 | Simple, established stack of `3 × 3` convolutions with ImageNet pretraining | Large parameter count and a high risk of fitting a small dataset too closely |
| Custom CNN | Three convolution blocks with 32, 64, and 128 filters, plus batch normalization and dropout | Fewer learned visual features and weaker performance in this run |

Transfer learning gives the first two models useful low-level visual features before they see the X-ray dataset. It does not make their outputs medically valid. ImageNet contains ordinary photographs, and X-rays have different textures, acquisition processes, and failure modes.

## Recorded results

The detailed results table reports:

| Model | Accuracy | Fracture precision | Fracture recall | F1 score | Recorded test cases |
| --- | ---: | ---: | ---: | ---: | ---: |
| ResNet50 | 92% | 0.86 | 0.99 | 0.93 | 417 |
| VGG16 | 100% | 1.00 | 1.00 | 1.00 | 200 |
| Custom CNN | 71.18% | 0.78 | 0.58 | 0.71 | 399 |

The recorded test-case count comes from adding true positives, true negatives, false positives, and false negatives in each row. Those totals differ from one another and from the 506-image test split. That prevents a clean, like-for-like ranking unless the evaluation subsets and missing cases are explained.

The abstract also reports slightly different ResNet50 and custom-CNN figures from the detailed table. For this article, I use the detailed table and keep the mismatch visible rather than choosing whichever number looks better.

## What the confusion matrices say

Accuracy hides the kinds of mistakes a model makes. In a fracture-screening task, false negatives deserve specific attention because a missed fracture and an unnecessary follow-up do not carry the same cost.

ResNet50 recorded fracture recall of `0.99`, which means it found nearly all fracture cases in that evaluation. Its fracture precision was lower at `0.86`, so some positive predictions were false alarms.

The custom CNN recorded fracture recall of `0.58`. It missed far more labelled fractures, even though its precision on predicted fractures was `0.78`. That difference is a good example of why one accuracy number is not enough.

VGG16 recorded no mistakes in its 200-case run. That should trigger verification, not celebration. A perfect score can be real, but on a small medical-imaging evaluation it can also point to leakage, duplicates, a narrow subset, or an evaluation bug.

## What I would change in a second run

A stronger comparison would use one fixed test set for all three models and save the exact file IDs used in every split. I would also add these checks:

- Split by patient or imaging study, not only by file.
- Detect near-duplicates with perceptual hashes or learned embeddings.
- Report results separately for each anatomical region.
- Repeat training with several random seeds and show the mean and spread.
- Plot calibration, not only classification metrics.
- Compare against a simple baseline and a domain-specific pretrained model.
- Review false positives and false negatives with someone qualified to interpret X-rays.
- Test on an external dataset from a different source.

The last point matters most. A model can score well on one dataset by learning scanner marks, cropping conventions, text labels, or acquisition artifacts. External evaluation tests whether it learned fracture-relevant features that survive a change in source.

## What this result supports

The experiment supports a limited claim: pretrained CNNs performed better than our custom CNN in the recorded runs. It does not establish that VGG16 is a better diagnostic model, that 100 percent accuracy will repeat, or that any of the three systems are safe to use with patients.

That distinction is part of reading the result correctly. In medical machine learning, dataset construction and evaluation design can matter as much as the architecture.

## Sources

- [Original comparative study](https://docs.google.com/document/d/1PdcnJKAvMvicrGQeuIJp1zyvfgxNyrZvF_FB_TRkhuk/edit)
- [He et al. (2015), Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
- [Simonyan and Zisserman (2014), Very Deep Convolutional Networks for Large-Scale Image Recognition](https://arxiv.org/abs/1409.1556)
- [Wen et al. (2020), Characteristics of publicly available skin cancer image datasets](https://doi.org/10.1016/S2589-7500(20)30186-8)
