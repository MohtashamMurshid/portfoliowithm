import fs from "node:fs";
import path from "node:path";

export type BlogPost = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: string;
  date: string;
  source: string;
  image: string;
  imageAlt: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "my-instruct-plus",
    title: "Building a 250,000-record instruction dataset for Malaysian AI",
    shortTitle: "Building MY-Instruct-Plus",
    description:
      "How I built MY-Instruct-Plus for Malaysian Malay, Manglish, tool use, and English retention, and what comes next.",
    category: "Machine learning",
    date: "2026-07-10",
    source: "my-instruct-plus.md",
    image: "/blog/my-instruct-plus.png",
    imageAlt:
      "A hand-drawn Malaysian instruction-data pipeline connecting local conversations to a language model.",
  },
  {
    slug: "comparing-cnns-for-fracture-x-rays",
    title: "What happened when we compared three CNNs on fracture X-rays",
    shortTitle: "Comparing CNNs on fracture X-rays",
    description:
      "A practical account of comparing ResNet50, VGG16, and a custom CNN on a multi-region fracture X-ray dataset.",
    category: "Computer vision",
    date: "2025-03-03",
    source: "comparing-cnns-for-fracture-x-rays.md",
    image: "/blog/fracture-cnn-comparison.png",
    imageAlt:
      "A hand-drawn X-ray feeding into three neural-network paths and a result chart.",
  },
  {
    slug: "llm-disclosure-behavior",
    title: "What makes an AI agent disclose sensitive information?",
    shortTitle: "How AI agents handle sensitive information",
    description:
      "A 1,120-trial study of how prompt tone and tool type shaped disclosure attempts across 14 language models.",
    category: "AI safety",
    date: "2026-05-08",
    source: "llm-disclosure-behavior.md",
    image: "/blog/llm-disclosure-behavior.png",
    imageAlt:
      "A hand-drawn model inside a sandbox choosing between terminal and email tools.",
  },
  {
    slug: "markdown-to-docx-guide",
    title: "How to convert Markdown to Word with @mohtasham/md-to-docx",
    shortTitle: "Markdown to Word with md-to-docx",
    description:
      "Use md-to-docx from the CLI, Node.js, React, a Word template, or an AI agent.",
    category: "Developer tools",
    date: "2026-08-26",
    source: "markdown-to-docx-guide.md",
    image: "/blog/markdown-to-docx.png",
    imageAlt: "A hand-drawn sequence of Markdown pages becoming a formatted document.",
  },
  {
    slug: "cognitive-systems-design",
    title: "How cognitive systems work",
    shortTitle: "How cognitive systems work",
    description:
      "A practical guide to the data, models, evidence, confidence, and human feedback inside a cognitive system.",
    category: "Cognitive computing",
    date: "2025-08-15",
    source: "cognitive-systems-design.md",
    image: "/blog/cognitive-systems.png",
    imageAlt: "A hand-drawn cognitive-system map connecting data, models, and people.",
  },
  {
    slug: "node-js-deep-dive",
    title: "How Node.js handles concurrent work",
    shortTitle: "How Node.js handles concurrent work",
    description:
      "A practical guide to the event loop, async I/O, worker threads, streams, modules, and performance checks.",
    category: "Backend engineering",
    date: "2025-08-14",
    source: "node-js-deep-dive.md",
    image: "/blog/node-js-event-loop.png",
    imageAlt: "A hand-drawn Node.js event loop with timers, queued work, and worker threads.",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostBody(post: BlogPost) {
  const sourcePath = path.join(process.cwd(), "content", "blog", post.source);
  const source = fs.readFileSync(sourcePath, "utf8");
  const withoutFrontmatter = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
  const body = withoutFrontmatter.trimStart();

  return body.replace(/^# .+\r?\n+/, "").trim();
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getReadingTime(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|\[\]()]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}
