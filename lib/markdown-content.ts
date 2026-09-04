import { catalog } from "../components/books/catalog";
import { archiveProjects } from "./archiveProjects";
import { developerBody, developerTitle } from "./agent-resources";
import { blogPosts, getBlogPostBody } from "./blogPosts";
import { eventCaseStudies } from "./eventCaseStudies";
import { githubCaseStudies } from "./githubCaseStudies";
import { projects } from "./projects";
import { contactEmail, defaultDescription, markdownPath, portfolioName, siteName, siteUrl } from "./site";

function link(title: string, path: string, description?: string) {
  return `- [${title}](${siteUrl}${markdownPath(path)})${description ? `: ${description}` : ""}`;
}

function section(title: string, paragraphs: readonly string[]) {
  return `## ${title}\n\n${paragraphs.join("\n\n")}`;
}

const projectIndex = projects.map((p) => link(p.name, `/work/${p.slug}`, p.summary)).join("\n");
const contact = `Contact: [${contactEmail}](mailto:${contactEmail}).\n\n[GitHub](https://github.com/MohtashamMurshid) · [LinkedIn](https://www.linkedin.com/in/mohtashammurshid/) · [X](https://x.com/mohtashamdotdev)`;

// Summaries for visual experiences; articles and case-study narratives below
// come from the same content records as their HTML counterparts.
const pages = new Map<string, { title: string; body: string }>([
  ["/", { title: `${portfolioName} | ${siteName}`, body: `${defaultDescription}\n\nAI Engineer at [CitySage](https://citysage.my) and founder of [Oikina](${siteUrl}/work/oikina).\n\n${section("Selected work", [projectIndex])}\n\n${section("Explore", [link("About Mohtasham", "/about"), link("Writing", "/blog"), link(developerTitle, "/developers"), link("Events", "/events"), link("Books", "/books")])}\n\n${section("Contact", [contact])}` }],
  ["/developers", { title: developerTitle, body: developerBody }],
  ["/about", { title: `About ${siteName}`, body: `I am an engineer from Kashmir, now based in Kuala Lumpur. I am the founder of Oikina, an AI engineer, an open-source builder, and a researcher.\n\n${section("Background and current work", [
    "I moved to Kuala Lumpur in February 2023 and studied computer science at Taylor's University from March 2023 to March 2026, specialising in artificial intelligence. I graduated with first-class honours.",
    "I interned at CitySage and returned as an AI engineer in March 2026. I build AI agents for government and city councils, along with geospatial AI software.",
    "Outside work, I build Oikina and getdesign, maintain open-source projects including md-to-docx, and research language models and AI systems.",
  ])}\n\n${section("Community", ["I am part of the Malaysian AI Residency and a Cursor Ambassador. I help run hackathons, meetups, and student builder sessions.", link("Event case studies", "/events")])}\n\n${section("Away from work", ["I play Valorant, watch scripted Minecraft videos, and ski in Gulmarg. Kashmir still feels like home.", link("Reading notes", "/books"), link("Interactive home in Kashmir", "/house")])}\n\n${section("Contact", [contact])}` }],
  ["/work", { title: `Work by ${siteName}`, body: `${projectIndex}\n\n${section("Archive", [archiveProjects.map((p) => link(p.name, `/work/archive/${p.slug}`, `${p.year}. ${p.summary}`)).join("\n")])}` }],
  ["/blog", { title: `Writing by ${siteName}`, body: [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map((p) => link(p.title, `/blog/${p.slug}`, `${p.date}. ${p.description}`)).join("\n") }],
  ["/events", { title: `Events with ${siteName}`, body: eventCaseStudies.map((e) => link(e.title, `/events/${e.slug}`, `${e.dateDisplay}. ${e.summary}`)).join("\n") }],
  ["/books", { title: `${siteName}'s bookshelf`, body: catalog.map((b) => section(`${b.title} by ${b.author}`, [b.description, b.availability, `[${b.linkLabel ?? "Find this book"}](${b.url})`])).join("\n\n") }],
  ["/house", { title: "Home, in Kashmir", body: "An interactive exterior reconstruction of my home in Kashmir. The browser view lets you rotate and zoom to explore its twin gables, stone walls, balconies, and carved wooden doors.\n\n" + link("About Mohtasham", "/about") }],
]);

for (const [path, title] of [["/boring", "The plain portfolio"], ["/archive/1", "Archive 01: The plain portfolio"], ["/archive/2", "Archive 02: The field report"]]) {
  pages.set(path, { title, body: `A text overview of an earlier portfolio design by ${siteName}.\n\n${defaultDescription}\n\n${projectIndex}\n\n${contact}\n\n${link("Current portfolio", "/")}` });
}

export function getPageMarkdown(path: string): string | undefined {
  let page = pages.get(path);
  const post = blogPosts.find((p) => path === `/blog/${p.slug}`);
  if (post) {
    page = { title: post.title, body: `By ${siteName}. Published ${post.date}. Updated ${post.modifiedDate}.\n\n${getBlogPostBody(post)}` };
  }
  const project = projects.find((p) => path === `/work/${p.slug}`);
  if (project) {
    const study = githubCaseStudies[project.slug];
    const parts = [project.summary, project.description, `Role: ${project.role}. Updated ${project.dateModified}.`];
    if (study) {
      parts.push(...study.introduction);
      parts.push(...study.metadata.map((m) => section(m.title, [m.items.map((v) => `- ${v}`).join("\n")])));
      parts.push(...study.sections.map((s) => section(s.title, s.paragraphs)));
      if (study.flowFigure) parts.push(section(study.flowFigure.title, study.flowFigure.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`)));
      if (study.architectureFigure) parts.push(section(study.architectureFigure.title, study.architectureFigure.stages.map((s) => `${s.label}: ${s.nodes.map((n) => `${n.title}: ${n.detail}`).join("; ")}`)));
      parts.push(section(`${study.mappingFigure.sourceLabel} to ${study.mappingFigure.targetLabel}`, study.mappingFigure.rows.map((r) => `- ${r.source}: ${r.target}. ${r.detail ?? ""}`)));
      parts.push(section(study.codeFigure.label, [`\`\`\`text\n${study.codeFigure.code}\n\`\`\``, study.codeFigure.command, study.codeFigure.caption]));
      parts.push(study.footer.statement, study.footer.links.map((l) => `- [${l.label}](${l.href})`).join("\n"));
    } else {
      parts.push(section("Project details", [project.evidence.map((e) => `- ${e}`).join("\n")]));
      if (project.slug === "markdown-to-docx") parts.push(link("Complete md-to-docx usage guide", "/blog/markdown-to-docx-guide"));
    }
    parts.push(`[Visit ${project.name}](${project.url})`);
    page = { title: `${project.name} by ${siteName}`, body: parts.join("\n\n") };
  }
  const archive = archiveProjects.find((p) => path === `/work/archive/${p.slug}`);
  if (archive) {
    page = { title: archive.name, body: [archive.summary, `${archive.year}. ${archive.status}. Role: ${archive.role}.`, archive.introduction, ...archive.notes,
      section("Facts", archive.facts.map((f) => `- ${f.label}: ${f.value}. ${f.note ?? ""}`)),
      section("How it works", archive.flow.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`)),
      section("Languages", archive.languages.map((l) => `- ${l.name}: ${l.bytes} bytes`)),
      archive.repositoryUrl ? `[${archive.repositoryLabel}](${archive.repositoryUrl})` : archive.repositoryLabel,
    ].join("\n\n") };
  }
  const event = eventCaseStudies.find((e) => path === `/events/${e.slug}`);
  if (event) {
    const parts = [event.summary, `${event.dateDisplay}. ${event.place}. Role: ${event.role}.`, event.introduction,
      section("Facts", event.facts.map((f) => `- ${f.label}: ${f.value}. ${f.note}`)),
      section("My work", event.roles.map((r) => `- ${r}`)),
      ...event.sections.map((s) => section(s.title, s.paragraphs)),
      section(event.flowTitle, [...event.flow.map((s, i) => `${i + 1}. ${s.title}: ${s.detail}`), event.flowCaption]),
    ];
    if (event.highlight) parts.push(section(event.highlight.title, [event.highlight.body, ...(event.highlight.points ?? [])]));
    parts.push(event.links.map((l) => `- [${l.label}](${l.href})`).join("\n"));
    page = { title: event.title, body: parts.join("\n\n") };
  }
  if (!page) return undefined;

  // Root-relative links must still resolve after following /index.md aliases.
  // Leave fenced examples untouched, including Markdown tutorial examples.
  const body = page.body.split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m)
    .map((part, index) => index % 2 ? part : part.replace(/\]\(\/(?!\/)/g, `](${siteUrl}/`)).join("");
  return `# ${page.title}\n\n[Canonical page](${siteUrl}${path === "/" ? "/" : path})\n\n${body}\n`;
}
