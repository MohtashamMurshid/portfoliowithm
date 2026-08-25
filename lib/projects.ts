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
    eyebrow: "Small software runtime",
    summary: "An enterprise small cloud for software made by agents and developers.",
    description:
      "Oikina is becoming an enterprise runtime and governance system for small internal software. Its hosted beta already deploys static and constrained full-stack apps with declared server actions, per-app SQLite, scoped credentials, immutable releases, and rollback.",
    evidence: ["Hosted Runtime", "CLI", "Operator Console", "Rollback"],
  },
  {
    slug: "iris",
    name: "Iris",
    register: "OI-02 / PROTOTYPE",
    role: "Creator",
    category: "Camera interface",
    url: "https://iris.mohtasham.dev",
    eyebrow: "Photography interface",
    summary: "An open-source iPhone still camera with direct manual control and live Looks.",
    description:
      "Iris is planned as an offline iPhone still camera with auto and manual controls, hardware-derived ranges, five live Looks, HEIC or JPEG capture, DNG, and a Photo Lab. The current work is an Expo interface prototype and Astro canvas demo.",
    evidence: ["Expo prototype", "Five Looks", "Astro demo", "Open source"],
  },
  {
    slug: "skills",
    name: "Skills",
    register: "OI-03 / RELEASED",
    role: "Creator",
    category: "Agent tooling",
    url: "https://skills.sh/mohtashammurshid/skills",
    eyebrow: "Reusable agent work",
    summary: "Six portable, inspectable workflows for coding agents.",
    description:
      "Skills is a versioned public library of agent workflows with instructions, references, assets, scripts, and validation. Six packages currently cover presentations, editorial reports, launch films, technical diagrams, reliable agents, and ADHD-friendly communication.",
    evidence: ["SKILL.md", "References", "Assets", "Validation"],
  },
  {
    slug: "markdown-to-docx",
    name: "Markdown to Docx",
    register: "OI-04 / RELEASED",
    role: "Creator",
    category: "Open-source instrument",
    url: "https://npmjs.com/package/@mohtasham/md-to-docx",
    eyebrow: "Document conversion",
    summary: "A document compiler between Markdown and editable Word files.",
    description:
      "Markdown to Docx is an open-source TypeScript library and CLI for production-ready Word documents, including multi-section templates, captions, diagrams, editable math, and reference DOCX workflows.",
    evidence: ["TypeScript API", "CLI", "Agent skill", "Published on npm"],
  },
  {
    slug: "eikon-studio",
    name: "Eikon Studio",
    register: "OI-05 / RELEASED",
    role: "Creator",
    category: "AI media platform",
    url: "https://eikonstudio.xyz",
    eyebrow: "BYOK media workspace",
    summary: "An open-source image and video platform built around your provider keys.",
    description:
      "Eikon Studio is becoming a self-hostable BYOK image and video platform with one catalog, studio, API, typed SDKs, durable jobs, storage, and usage reporting. The current release has three ready image models across Google and OpenAI.",
    evidence: ["Three ready models", "Gallery", "Prompt skills", "REST API"],
  },
  {
    slug: "understanding-software",
    name: "Understanding Software",
    register: "OI-06 / EXPERIMENT",
    role: "Creator",
    category: "Interactive field guide",
    url: "https://understanding-software.vercel.app",
    eyebrow: "Software literacy",
    summary: "A visual field guide and artifact studio for understanding software.",
    description:
      "Understanding Software combines an authored visual field guide with an Artifact Studio that plans, writes, illustrates, revises, and exports structured explanations as Markdown and DOCX.",
    evidence: ["Artifact planning", "Generated figures", "Markdown", "DOCX"],
  },
  {
    slug: "getdesign",
    name: "getdesign",
    register: "OI-07 / BETA",
    role: "Founder",
    category: "Design infrastructure",
    url: "https://getdesign.app",
    eyebrow: "Design-system extraction",
    summary: "A design system for any public URL, grounded in the page itself.",
    description:
      "getdesign inspects a rendered page, HTML, CSS, computed styles, screenshots, and visible pixels, then writes a predictable nine-section design document. The public web and agent skill are live; API, CLI, SDK, dashboard, and desktop surfaces are in-repository beta work.",
    evidence: ["Public web", "Agent skill", "Grounded tokens", "Nine-section output"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
