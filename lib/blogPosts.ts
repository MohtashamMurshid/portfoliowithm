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
    slug: "markdown-to-docx-guide",
    title: "From Markdown to Word in Seconds: A Practical Guide to @mohtasham/md-to-docx",
    shortTitle: "From Markdown to Word in Seconds",
    description:
      "A practical guide to converting Markdown into Word documents with the @mohtasham/md-to-docx CLI and TypeScript API.",
    category: "Developer tools",
    date: "2026-02-24",
    source: "markdown-to-docx-guide.md",
    image: "/blog/markdown-to-docx.png",
    imageAlt: "A hand-drawn sequence of Markdown pages becoming a formatted document.",
  },
  {
    slug: "cognitive-systems-design",
    title: "Design Principles for Cognitive Systems: Architecture, Components, and Learning Modalities",
    shortTitle: "Cognitive systems",
    description:
      "A study of cognitive-system architecture, learning methods, confidence scoring, and human-guided decision support.",
    category: "Cognitive computing",
    date: "2025-08-15",
    source: "cognitive-systems-design.md",
    image: "/blog/cognitive-systems.png",
    imageAlt: "A hand-drawn cognitive-system map connecting data, models, and people.",
  },
  {
    slug: "node-js-deep-dive",
    title: "Node.js Deep Dive: From Fundamentals to Pro-Level Techniques",
    shortTitle: "Node.js deep dive",
    description:
      "A tour of the Node.js event loop, module resolution, streams, worker threads, and common performance techniques.",
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
