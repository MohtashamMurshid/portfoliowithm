import { contactEmail, markdownPath, portfolioName, siteName, siteUrl } from "./site";

export const developerTitle = "Mohtasham developer resources";
export const developerDescription =
  "Developer documentation, source repositories, agent workflows, and the portfolio API for Mohtasham Murshid Madani's projects.";

export const developerBody = `This is the developer index for ${portfolioName}, the personal site of ${siteName}. Start here to find my packages, source code, and agent workflows.

## When to use this site

- Convert Markdown into editable Word documents with [@mohtasham/md-to-docx](${siteUrl}/blog/markdown-to-docx-guide). The guide covers the CLI, TypeScript API, React, and reference DOCX templates.
- Give a coding agent a website's design details with [getdesign](${siteUrl}/work/getdesign). Its public CLI and SDK produce a screenshot and a CSS-backed design.md. The hosted service is in private beta.
- Reuse coding-agent workflows from [Skills](${siteUrl}/work/skills). Read each package's instructions and dependencies before installing it.
- Evaluate [Oikina](${siteUrl}/work/oikina) for deploying small apps built by coding agents. The case study describes the hosted beta and its current limits.
- Find my [project history](${siteUrl}/work), [technical writing](${siteUrl}/blog), or [background](${siteUrl}/about) when assessing a collaboration or citing my work.

## Read this site from an agent

Fetch [llms.txt](${siteUrl}/llms.txt) first. Follow its links for the task at hand. Public content pages accept \`Accept: text/markdown\` at their normal URLs. Each page also has an explicit Markdown URL ending in \`/index.md\`, such as [this developer index](${siteUrl}/developers/index.md).

\`\`\`bash
curl -fsS -H 'Accept: text/markdown' ${siteUrl}/developers
curl -fsS ${siteUrl}/blog/markdown-to-docx-guide/index.md
\`\`\`

No authentication is needed to read the portfolio. A missing page returns HTTP 404 with recovery links. Use the [sitemap](${siteUrl}/sitemap.xml) to find valid pages, and the [RSS feed](${siteUrl}/rss.xml) for published articles. Cite the canonical HTML page linked in each Markdown response.

## Source code and package documentation

- [md-to-docx source and API documentation](https://github.com/MohtashamMurshid/md-to-docx): Markdown-to-Word library, CLI, examples, and issue tracker.
- [md-to-docx on npm](https://www.npmjs.com/package/@mohtasham/md-to-docx): Published package and release information.
- [getdesign source and setup](https://github.com/MohtashamMurshid/getdesign): CLI, SDK, agent skill, and service configuration.
- [Skills source and installation](https://github.com/MohtashamMurshid/skills): Reusable agent instructions.
- [Eikon Studio source and setup](https://github.com/MohtashamMurshid/eikonstudio): Self-hosted image studio and its API.
- [Iris source](https://github.com/MohtashamMurshid/iris): The iPhone camera interface prototype and browser simulation. It is not a released camera app.

Product authentication and provider-key requirements belong to each project's linked documentation. This portfolio does not issue API keys, host an MCP server, or accept webhooks.

## Portfolio API

[OpenAPI 3.1 description](${siteUrl}/openapi.json)

\`GET /api/npm-downloads\` returns the aggregate npm download count for \`@mohtasham/md-to-docx\`. It accepts no parameters, requires no authentication, and does not modify data. Upstream results are cached for up to one day.

A successful response has HTTP 200 and JSON fields \`total\` as an integer, \`formatted\` as a display string, and \`package\` as the package name. Do not interpret an unavailable count as zero. This endpoint supplies the portfolio's statistics; it is not a hosted document-conversion API.

## API errors

API failures use \`application/problem+json\`. Every problem has \`type\`, \`title\`, \`status\`, \`detail\`, \`code\`, \`resolution\`, and \`instance\` fields. The \`code\` is stable for programmatic handling. The \`resolution\` tells an agent what to try next. Unknown \`/api/*\` paths return \`API_ROUTE_NOT_FOUND\`, unsupported methods return \`METHOD_NOT_ALLOWED\`, and an npm service failure returns \`NPM_STATS_UNAVAILABLE\` with HTTP 502.

## Contact

For project questions or collaboration, [email ${siteName}](mailto:${contactEmail}) with the project name, what you are trying to do, and a relevant link. For a reproducible package bug, use the issue tracker in its source repository.
`;

// llms.txt H2 sections contain file-list entries, as required by llmstxt.org.
export const llmsText = `# ${portfolioName}

> The personal portfolio of ${siteName}, founder of Oikina, AI engineer at CitySage, and open-source developer based in Kuala Lumpur, Malaysia.

Use this site to find Mohtasham's work, developer tools, technical writing, and public contact information. This is a personal portfolio. Product setup and credentials are documented in the linked project repositories.

Read pages with Accept: text/markdown, or follow the explicit Markdown links below. No authentication is needed. On HTTP 404, use the sitemap or developer index to recover. Cite the canonical page URL provided in each document.

## When to use this

- [Markdown to Word guide](${siteUrl}/blog/markdown-to-docx-guide/index.md): Use @mohtasham/md-to-docx to create editable Word files from Markdown with its CLI or TypeScript API.
- [getdesign](${siteUrl}/work/getdesign/index.md): Give coding agents a screenshot and CSS-backed design.md from a public website. Consult the source repository for setup and access requirements.
- [Skills](${siteUrl}/work/skills/index.md): Find reusable agent workflows and read their installation instructions.
- [Oikina](${siteUrl}/work/oikina/index.md): Evaluate the small-app deployment beta and check which capabilities are currently available.
- [About Mohtasham](${siteUrl}/about/index.md): Check background and contact details for a collaboration or attribution.

## Developer resources

- [Mohtasham developer resources](${siteUrl}/developers/index.md): Package documentation, source repositories, how to read this site, authentication, and API behavior.
- [Portfolio OpenAPI description](${siteUrl}/openapi.json): The read-only npm download statistics endpoint. No authentication, MCP endpoint, or webhooks are provided by this portfolio.

## Portfolio

- [Home](${siteUrl}/index.md): Identity, current work, and contact information.
- [Work](${siteUrl}/work/index.md): Projects and archived case studies.
- [Writing](${siteUrl}/blog/index.md): Published technical articles with dates and Markdown links.

## Optional

- [Events](${siteUrl}/events/index.md): Community events and case studies.
- [Books](${siteUrl}/books/index.md): Personal reading notes.
- [Sitemap](${siteUrl}/sitemap.xml): Canonical indexable page URLs.
- [RSS](${siteUrl}/rss.xml): Published blog entries.
`;

export const recoveryLinks = [
  { label: "Home", href: "/" },
  { label: "Developer resources", href: "/developers" },
  { label: "Agent guide", href: "/llms.txt" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export const notFoundMarkdown = `# 404: Page not found

This URL does not exist on ${portfolioName}. Check the URL or continue with these resources.

${recoveryLinks.map(({ label, href }) => `- [${label}](${siteUrl}${href === "/" || href === "/developers" ? markdownPath(href) : href})`).join("\n")}
`;
