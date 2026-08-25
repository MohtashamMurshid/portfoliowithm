import Image from "next/image";
import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import type { Project } from "@/lib/projects";
import styles from "./MarkdownToDocxCaseStudy.module.css";

const apiExample = `import { convertMarkdownToDocx } from "@mohtasham/md-to-docx";

const blob = await convertMarkdownToDocx(markdown, {
  documentType: "report",
  style: {
    heading1Alignment: "CENTER",
    paragraphAlignment: "JUSTIFIED",
    direction: "LTR"
  }
});`;

const commandExample = `npx @mohtasham/md-to-docx input.md output.docx`;

const optionExample = `const options = {
  style: {
    titleSize: 32,
    heading1Size: 30,
    paragraphSize: 24,
    lineSpacing: 1.15
  },
  textReplacements: [
    { find: "ACME", replace: "Acme Corp" }
  ]
};`;

const typescriptKeywords = new Set([
  "async",
  "await",
  "const",
  "export",
  "from",
  "import",
  "interface",
  "new",
  "return",
  "type",
]);

function highlightTypeScript(code: string): ReactNode[] {
  const tokenPattern = /(\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:async|await|const|export|from|import|interface|new|return|type)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*[:(]))/gm;
  const highlighted: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(code)) !== null) {
    const token = match[0];
    const index = match.index;
    const rest = code.slice(index + token.length).trimStart();
    let className = styles.tokenFunction;

    if (index > cursor) highlighted.push(code.slice(cursor, index));

    if (token.startsWith("//")) className = styles.tokenComment;
    else if (/^["'`]/.test(token)) className = styles.tokenString;
    else if (/^\d/.test(token)) className = styles.tokenNumber;
    else if (typescriptKeywords.has(token) || /^(true|false|null|undefined)$/.test(token)) {
      className = styles.tokenKeyword;
    } else if (rest.startsWith(":")) {
      className = styles.tokenProperty;
    }

    highlighted.push(
      <span className={className} key={`${index}-${token}`}>
        {token}
      </span>,
    );
    cursor = index + token.length;
  }

  if (cursor < code.length) highlighted.push(code.slice(cursor));
  return highlighted;
}

type MarkdownToDocxCaseStudyProps = {
  project: Project;
};

type NpmStats = {
  total: number;
  weekly: number;
  version: string;
};

const fallbackStats: NpmStats = {
  total: 669_053,
  weekly: 30_740,
  version: "3.0.1",
};

const compactNumber = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

async function getNpmStats(): Promise<NpmStats> {
  const packageName = "%40mohtasham%2Fmd-to-docx";
  const today = new Date().toISOString().slice(0, 10);

  try {
    const [totalResponse, weeklyResponse, packageResponse] = await Promise.all([
      fetch(`https://api.npmjs.org/downloads/point/2025-02-24:${today}/${packageName}`, {
        next: { revalidate: 86_400 },
      }),
      fetch(`https://api.npmjs.org/downloads/point/last-week/${packageName}`, {
        next: { revalidate: 86_400 },
      }),
      fetch(`https://registry.npmjs.org/${packageName}/latest`, {
        next: { revalidate: 86_400 },
      }),
    ]);

    if (!totalResponse.ok || !weeklyResponse.ok || !packageResponse.ok) {
      return fallbackStats;
    }

    const [total, weekly, packageData] = await Promise.all([
      totalResponse.json() as Promise<{ downloads: number }>,
      weeklyResponse.json() as Promise<{ downloads: number }>,
      packageResponse.json() as Promise<{ version: string }>,
    ]);

    return {
      total: total.downloads,
      weekly: weekly.downloads,
      version: packageData.version,
    };
  } catch {
    return fallbackStats;
  }
}

export default async function MarkdownToDocxCaseStudy({ project }: MarkdownToDocxCaseStudyProps) {
  const npmStats = await getNpmStats();

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <div className={styles.headingRow}>
          <Link className={styles.backButton} href="/work" aria-label="Back to work">
            <span aria-hidden="true">←</span>
          </Link>
          <header className={styles.header}>
            <h1>md-to-docx</h1>
            <p>August 2026 · Design, Development, Documentation</p>
          </header>
        </div>

        <figure className={styles.cover}>
          <ViewTransition name={`work-image-${project.slug}`} share="work-image-morph">
            <Image
              src="/projects/md-to-docx.png"
              alt="A machine transforming a Markdown sheet into a formatted document"
              width={1536}
              height={1024}
              priority
              sizes="(max-width: 760px) 60vw, 420px"
            />
          </ViewTransition>
        </figure>

        <section className={styles.introduction} aria-label="Project introduction">
          <p>
            <code>@mohtasham/md-to-docx</code> converts Markdown into editable Word
            documents. Headings become document styles, lists remain lists, tables stay
            editable, and links still work. It also handles multi-section templates,
            captions, cross-references, diagrams, and editable Word math. The converter
            is available as a TypeScript library, a command-line tool, and an agent skill.
          </p>
          <p>
            I built it for the last step in a familiar writing process. The draft is
            clean in Markdown, but the person receiving it needs a <code>.docx</code>
            file they can review and change.
          </p>

          <div className={styles.metadata}>
            <div>
              <h2>My contributions</h2>
              <p><span>Design</span><span>Development</span><span>Docs</span></p>
            </div>
            <div>
              <h2>The interfaces</h2>
              <p><span>TypeScript</span><span>CLI</span><span>Agent skill</span></p>
            </div>
            <div>
              <h2>npm stats</h2>
              <p>
                <span>{compactNumber.format(npmStats.total)} total</span>
                <span>{compactNumber.format(npmStats.weekly)} last week</span>
                <span>v{npmStats.version}</span>
              </p>
            </div>
          </div>
        </section>

        <div className={styles.rule} />

        <figure className={`${styles.wideFigure} ${styles.productFigure}`}>
          <Image
            src="/projects/case-studies/md-to-docx-npm.png"
            alt="The published md-to-docx package page on npm"
            width={1440}
            height={900}
            sizes="(max-width: 760px) calc(100vw - 36px), 1080px"
          />
          <figcaption>
            The package is published on npm with the TypeScript API, CLI, and agent skill available from one codebase.
          </figcaption>
        </figure>

        <section className={styles.section}>
          <h2>Why I built it</h2>
          <p>
            Engineering notes, reports, proposals, and generated content often begin in
            Markdown. It is fast to write, easy to diff, and simple for software to
            produce. Word is still the required delivery format in many teams and
            institutions.
          </p>
          <p>
            Copying a finished draft into Word creates a second formatting job. Heading
            levels flatten, table structure breaks, list indentation drifts, and the
            cleanup returns with every revision. The package moves that work into one
            repeatable conversion.
          </p>

          <figure className={`${styles.wideFigure} ${styles.beforeAfter}`}>
            <span className={styles.handLabel}>before</span>
            <div className={styles.beforeBox}>
              <code># Project proposal</code>
              <code>## Timeline</code>
              <code>- Week 1: Discovery</code>
              <code>- Week 2: Implementation</code>
            </div>
            <span className={styles.arrow} aria-hidden="true">↓</span>
            <span className={styles.handLabel}>after</span>
            <div className={styles.afterBox}>
              <small>PROJECT PROPOSAL</small>
              <h3>Project proposal</h3>
              <span className={styles.documentRule} />
              <h4>Timeline</h4>
              <p>1. Discovery</p>
              <p>2. Implementation</p>
            </div>
            <figcaption>One source file, converted into an editable document.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>One converter, two entry points</h2>
          <p>
            The library fits applications and automated report pipelines. The CLI covers
            the quick conversion at the end of a writing session. Both paths use the same
            parser, document builder, and styling options.
          </p>

          <figure className={`${styles.wideFigure} ${styles.codeFigure}`}>
            <div className={styles.codeWindow}>
              <div><span>TypeScript API</span><span>convert.ts</span></div>
              <pre><code>{highlightTypeScript(apiExample)}</code></pre>
            </div>
            <p className={styles.commandLine}><span>$</span><code>{commandExample}</code></p>
            <figcaption>Use the package in code or run it directly with npx.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>Document structure survives conversion</h2>
          <p>
            The output uses Word’s real document parts. A table has rows and cells. A
            heading appears in the document outline. A page break begins a new page. This
            is what makes the result useful after it leaves the codebase.
          </p>

          <figure className={`${styles.wideFigure} ${styles.mappingFigure}`}>
            <span className={styles.handLabel}>markdown</span>
            <span className={styles.handLabel}>word document</span>
            <div className={styles.mappingRow}><code># Heading</code><span>→</span><strong>Heading 1 style</strong></div>
            <div className={styles.mappingRow}><code>- List item</code><span>→</span><strong>Editable bullet list</strong></div>
            <div className={styles.mappingRow}><code>| Table |</code><span>→</span><strong>Rows and cells</strong></div>
            <div className={styles.mappingRow}><code>[TOC]</code><span>→</span><strong>Table of contents</strong></div>
            <div className={styles.mappingRow}><code>\pagebreak</code><span>→</span><strong>New document page</strong></div>
            <figcaption>Markdown syntax maps to document structure, not flattened pixels.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>Styling stays outside the draft</h2>
          <p>
            Conversion options control heading sizes, paragraph spacing, alignment, text
            direction, and table-of-contents formatting. A replacement pass can update
            names or version strings before the document is built.
          </p>
          <p>
            The Markdown describes the content. The options decide how that content
            should look for a particular recipient.
          </p>

          <figure className={`${styles.wideFigure} ${styles.optionsFigure}`}>
            <span className={styles.handLabel}>content stays clean</span>
            <pre><code>{highlightTypeScript(optionExample)}</code></pre>
            <figcaption>Formatting can change without rewriting the source document.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>What it is becoming</h2>
          <p>
            The larger idea is a document compiler for developer and agent workflows.
            One Markdown source should become an editable Word file with real headings,
            lists, tables, sections, references, captions, diagrams, math, and the styles
            of an existing reference document. The result should still behave like a Word
            document after it leaves the codebase.
          </p>
          <p>
            Version {npmStats.version} already covers the TypeScript library, CLI, agent
            skill, multi-section templates, captions and cross-references, syntax
            highlighting, charts, Mermaid, editable math, custom renderers, and reference
            DOCX style adoption and patching.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What comes next</h2>
          <p>
            There is no published feature roadmap or open issue queue today. The next
            work should keep the conversion boundary dependable: add regression files
            from real documents, widen template compatibility, check accessibility, and
            preserve API and CLI behavior as the package changes. New output features
            should ship with a document fixture and a rendered comparison.
          </p>
        </section>

        <footer className={styles.footer}>
          <p>Markdown is good for writing. Word is often required for delivery.</p>
          <div>
            <a href="https://github.com/MohtashamMurshid/md-to-docx" target="_blank" rel="noreferrer">View the source ↗</a>
            <a href={project.url} target="_blank" rel="noreferrer">Open on npm ↗</a>
            <Link href="/work">Back to work</Link>
          </div>
        </footer>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.description,
            url: "https://mohtasham.dev/work/markdown-to-docx",
            codeRepository: "https://github.com/MohtashamMurshid/md-to-docx",
            programmingLanguage: "TypeScript",
            author: {
              "@type": "Person",
              name: "Mohtasham Murshid Madani",
              url: "https://mohtasham.dev",
            },
          }),
        }}
      />
    </main>
  );
}
