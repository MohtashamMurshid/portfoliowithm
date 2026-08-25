export type Project = {
  slug: string;
  name: string;
  register: string;
  role: string;
  category: string;
  url: string;
  eyebrow: string;
  summary: string;
  description: string;
  evidence: string[];
};

export const projects: Project[] = [
  {
    slug: "oikina",
    name: "Oikina",
    register: "OI-01 / BUILDING",
    role: "Founder",
    category: "Deployment infrastructure",
    url: "https://oikina.com",
    eyebrow: "Small cloud",
    summary: "A small cloud for deploying apps built by people and coding agents.",
    description:
      "Oikina works from a project folder and gives coding agents one opinionated path from a local app to a running URL. The hosted beta supports static and constrained full-stack apps, persistent SQLite, declared server actions, encrypted server secrets, immutable releases, and rollback.",
    evidence: ["5+ beta testers", "Under 10-second deploys", "Persistent SQLite", "Rollback"],
  },
  {
    slug: "iris",
    name: "Iris",
    register: "OI-02 / PROTOTYPE",
    role: "Creator",
    category: "Camera interface",
    url: "https://iris.mohtasham.dev",
    eyebrow: "Photography interface",
    summary: "A free, open-source iPhone camera for people who want manual control over their photographs.",
    description:
      "Iris is planned as an offline iPhone still camera with automatic and manual controls, hardware-derived ranges, live Looks, HEIC or JPEG capture, DNG, and a Photo Lab. The current work is an Expo SDK 57 interface prototype and a public browser simulation, not a released camera app.",
    evidence: ["Expo prototype", "Browser demo", "Free and open source", "In development"],
  },
  {
    slug: "skills",
    name: "Skills",
    register: "OI-03 / RELEASED",
    role: "Creator",
    category: "Agent tooling",
    url: "https://skills.sh/mohtashammurshid/skills",
    eyebrow: "Reusable agent work",
    summary: "Six reusable workflows that help coding agents repeat the way I approach specific kinds of work.",
    description:
      "I built the collection so friends could reuse workflows I had already worked out. The six public packages cover ADHD-friendly communication, presentations, editorial reports, launch films, technical diagrams, and reliable agent design.",
    evidence: ["Six public skills", "Used by friends", "Cross-agent format", "Open source"],
  },
  {
    slug: "markdown-to-docx",
    name: "Markdown to Docx",
    register: "OI-04 / RELEASED",
    role: "Creator",
    category: "Open-source instrument",
    url: "https://npmjs.com/package/@mohtasham/md-to-docx",
    eyebrow: "Document conversion",
    summary: "The package I built to stop copying AI-assisted school assignments from Markdown into Word by hand.",
    description:
      "What began as an internal converter now has hundreds of thousands of npm downloads. It creates editable Word files with real headings, tables, images, a table of contents, diagrams, math, and reference DOCX styles.",
    evidence: ["Solo project", "30K weekly downloads", "TypeScript API", "CLI and agent skill"],
  },
  {
    slug: "eikon-studio",
    name: "Eikon Studio",
    register: "OI-05 / RELEASED",
    role: "Creator",
    category: "AI media platform",
    url: "https://eikonstudio.xyz",
    eyebrow: "BYOK media workspace",
    summary: "An open-source image platform I built because the existing options were expensive, awkward, or would not accept my own provider keys.",
    description:
      "Eikon turns Google and OpenAI image models into one self-hostable studio and API. Generations keep running through Convex after the browser closes, then return to history, the gallery, and usage analytics.",
    evidence: ["Solo project", "Self-hostable", "Three ready models", "Persistent generations"],
  },
  {
    slug: "understanding-software",
    name: "Understanding Software",
    register: "OI-06 / EXPERIMENT",
    role: "Creator",
    category: "Interactive field guide",
    url: "https://understanding-software.vercel.app",
    eyebrow: "Weekend design experiment",
    summary: "A Making Software landing-page clone that turned into an AI-assisted field-guide generator.",
    description:
      "I built Understanding Software with an AI agent after falling in love with Dan Hollick's field-guide design. The Artifact Studio now plans, writes, illustrates, revises, and exports custom software explanations.",
    evidence: ["Weekend project", "AI collaboration", "Generated figures", "Markdown and DOCX"],
  },
  {
    slug: "getdesign",
    name: "getdesign",
    register: "OI-07 / BETA",
    role: "Founder",
    category: "Design infrastructure",
    url: "https://getdesign.app",
    eyebrow: "Design extraction startup",
    summary: "The tool I built because screenshots kept hiding the exact design decisions my coding agents needed.",
    description:
      "getdesign renders a public page inside a Daytona sandbox and returns its full-page screenshot with a CSS-backed, nine-section design.md. The hosted product is in private beta, while the skill, CLI, and SDK are public.",
    evidence: ["118-person waitlist", "46 GitHub stars", "Published CLI and SDK", "Private beta"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
