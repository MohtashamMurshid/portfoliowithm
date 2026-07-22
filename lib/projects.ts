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
    slug: "getdesign",
    name: "getdesign",
    register: "OI-01 / ACTIVE",
    role: "Founder",
    category: "Design infrastructure",
    url: "https://getdesign.app",
    eyebrow: "Primary instrument",
    summary: "On-demand design systems from any URL.",
    description:
      "getdesign turns the visual language of a website into a portable design system. The work is accessible through the web, an API, a command-line interface, and an agent designed to travel with the system it observes.",
    evidence: ["Web", "API", "CLI", "Portable agent"],
  },
  {
    slug: "citysage",
    name: "Citysage",
    register: "OI-02 / ACTIVE",
    role: "AI Engineer",
    category: "Urban intelligence",
    url: "https://citysage.my",
    eyebrow: "Civic-scale inquiry",
    summary: "Intelligent systems considered at the scale of a city.",
    description:
      "At Citysage, Mohtasham works on city-scale artificial-intelligence systems: software intended to help complex urban environments become more legible, responsive, and useful.",
    evidence: ["Artificial intelligence", "City-scale systems", "Applied engineering"],
  },
  {
    slug: "markdown-to-docx",
    name: "Markdown to Docx",
    register: "OI-03 / RELEASED",
    role: "Creator",
    category: "Open-source instrument",
    url: "https://npmjs.com/package/@mohtasham/md-to-docx",
    eyebrow: "Document conversion",
    summary: "A small bridge between plain text and finished documents.",
    description:
      "Markdown to Docx is an open-source package that converts Markdown into Word documents. It treats a practical format boundary as infrastructure: writing enters as portable plain text and leaves as an editable document.",
    evidence: ["Markdown input", "DOCX output", "Published on npm"],
  },
  {
    slug: "eikon-studio",
    name: "Eikon Studio",
    register: "OI-04 / RELEASED",
    role: "Creator",
    category: "Agent tooling",
    url: "https://eikonstudio.xyz",
    eyebrow: "Image operations",
    summary: "An open-source image harness for agents.",
    description:
      "Eikon Studio gives image-generating agents a persistent working environment: generations, history, skills, and file tagging remain available instead of disappearing after a single exchange.",
    evidence: ["Persistent generations", "History", "Skills", "File tagging"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
