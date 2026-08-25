---
layout: ../../layouts/MarkdownPostLayout.astro

title: "From Markdown to Word in Seconds: A Practical Guide to @mohtasham/md-to-docx"
author: Mohtasham Murshid Madani
description: "Learn how to convert Markdown into polished DOCX files using @mohtasham/md-to-docx with both CLI and TypeScript APIs, including TOC, page breaks, and custom styling."
pubDate: "2026-02-24"
tags:
  [
    "markdown",
    "docx",
    "typescript",
    "nodejs",
    "developer-tools",
    "cli",
  ]
email: mohtashammurshid@gmail.com
---

# From Markdown to Word in Seconds: A Practical Guide to @mohtasham/md-to-docx

If you write in Markdown but need to deliver in Microsoft Word format, you usually end up copy-pasting, fixing spacing, and manually rebuilding structure.  

I built `@mohtasham/md-to-docx` to remove that friction. You keep writing in Markdown, and the package converts it into clean `.docx` output with support for real document features like headings, lists, tables, images, code blocks, table of contents, and page breaks.

## Why I built this package

A lot of technical writing workflows begin in Markdown:

- engineering documentation
- assignment and report drafts
- project proposals
- generated AI content pipelines

But many teams and institutions still require Word documents as the final format. I wanted a simple library and CLI that feels natural for developers, while still producing documents suitable for non-technical recipients.

## What `@mohtasham/md-to-docx` supports

The package supports a broad set of Markdown and document features:

- headings (`#` to `#####`)
- bold, italic, strikethrough, inline code, and code fences
- bullet and numbered lists
- tables
- blockquotes
- links and images
- comments (`COMMENT: ...`)
- table of contents via `[TOC]`
- manual page breaks via `\pagebreak`
- customizable font sizes, spacing, alignment, and direction (`LTR` / `RTL`)
- text find-and-replace before conversion

## Install

```bash
npm install @mohtasham/md-to-docx
```

## Install as a Skill 

If you want to use it as an agent skill inside your workflow, install it with the `skills` CLI:

```bash
# Install from GitHub
npx skills add MohtashamMurshid/md-to-docx
```

You can list discoverable skills first:

```bash
npx skills add MohtashamMurshid/md-to-docx --list --full-depth
```

## Quick start (TypeScript / JavaScript)

```ts
import { convertMarkdownToDocx, downloadDocx } from "@mohtasham/md-to-docx";

const markdown = `
[TOC]

# Project Proposal

This is a **bold** paragraph with \`inline code\`.

## Timeline

- Week 1: Discovery
- Week 2: Implementation

\\pagebreak

## Budget

| Item | Cost |
|------|------|
| Dev  | $500 |
| Ops  | $200 |
`;

const blob = await convertMarkdownToDocx(markdown);
downloadDocx(blob, "project-proposal.docx");
```

## CLI usage

Use it directly from terminal:

```bash
# Run without installing globally
npx @mohtasham/md-to-docx input.md output.docx

# With options JSON
npx @mohtasham/md-to-docx input.md output.docx --options options.json
```

Example `options.json`:

```json
{
  "documentType": "report",
  "style": {
    "heading1Alignment": "CENTER",
    "paragraphAlignment": "JUSTIFIED",
    "direction": "LTR"
  }
}
```

## Custom styling example

```ts
import { convertMarkdownToDocx } from "@mohtasham/md-to-docx";

const options = {
  documentType: "document",
  style: {
    titleSize: 32,
    heading1Size: 30,
    heading2Size: 26,
    paragraphSize: 24,
    headingSpacing: 220,
    paragraphSpacing: 180,
    lineSpacing: 1.15,
    paragraphAlignment: "JUSTIFIED",
    direction: "LTR",
    tocHeading1FontSize: 24,
    tocHeading1Bold: true
  },
  textReplacements: [
    { find: "ACME", replace: "Acme Corp" },
    { find: /v(\\d+\\.\\d+\\.\\d+)/g, replace: (v: string) => `Version ${v}` }
  ]
};

const markdown = `
[TOC]

# ACME Quarterly Report
Generated for v1.2.3 users.
`;

const blob = await convertMarkdownToDocx(markdown, options);
```

## Where this is useful

`@mohtasham/md-to-docx` is especially useful when:

- your team writes docs in Markdown but delivers in Word
- you generate reports from code or templates
- you need consistent document styling across outputs
- you want both CLI and API workflows in one package

## Final thoughts

Markdown is excellent for writing. Word is often required for delivery.  
This package bridges the two without forcing you to abandon your existing workflow.

If you want to try it:

- GitHub: https://github.com/MohtashamMurshid/md-to-docx
- npm: https://www.npmjs.com/package/@mohtasham/md-to-docx

If you build something with it, I would love to see it.
