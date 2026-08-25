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
            <p>August 2026 · Solo project · Design, development, and documentation</p>
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
            I did not start this as a public developer tool. I was building an
            AI-assisted school writing workflow. The agent could produce a properly
            structured assignment in Markdown, but I still had to copy it into Word and
            repair the formatting by hand.
          </p>
          <p>
            So I wrote a small internal package to do that last step. The first version
            only understood titles and a few heading levels. It now turns Markdown into
            editable <code>.docx</code> files through a TypeScript API, a CLI, or an
            agent skill.
          </p>

          <div className={styles.metadata}>
            <div>
              <h2>My work</h2>
              <p><span>Built alone</span><span>Maintained alone</span></p>
            </div>
            <div>
              <h2>Available as</h2>
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
            The original problem was very specific. My agent could write the assignment,
            but the submission still had to be an editable Word document. Markdown was
            easy for the agent to produce. Word let me make final changes before handing
            it in. I was stuck between the two.
          </p>
          <p>
            Exporting a PDF would not solve it. The output had to keep real headings,
            lists, tables, images, and page breaks so I could keep editing it in Word.
            The package automates the copying and cleanup I used to do myself.
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
          <h2>I did not expect 600,000 downloads</h2>
          <p>
            I published the internal package, and it turned out to be useful beyond my
            own assignment workflow. It now has about {compactNumber.format(npmStats.total)}
            downloads in total and {compactNumber.format(npmStats.weekly)} in the last
            week. That is still slightly ridiculous to me. This began as a shortcut for
            one app.
          </p>
          <p>
            Real usage also brought real maintenance. At one point I had more than 20
            open issues to work through. I built and maintained the package alone,
            including fixes, pull-request reviews, and the less exciting work of keeping
            old behavior intact.
          </p>
        </section>

        <section className={styles.section}>
          <h2>The two features I care about most</h2>
          <p>
            Images were the first hard feature I felt proud of. In Node, the package can
            download a remote image, validate it, and place it into the document. The
            browser path has tighter limits because it cannot fetch every remote source
            safely.
          </p>
          <p>
            The table of contents matters for a different reason. It only works properly
            when the converter creates real Word heading styles. That same structure is
            what makes the document outline, cross-references, and later edits work.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Three ways to use the same converter</h2>
          <p>
            Apps can call the TypeScript API. The CLI handles a quick file conversion.
            The agent skill gives coding agents the package rules and examples. All three
            use the same parser, document builder, and styling options.
          </p>

          <figure className={`${styles.wideFigure} ${styles.codeFigure}`}>
            <div className={styles.codeWindow}>
              <div className={styles.terminalBar}>
                <span className={styles.terminalControls} aria-hidden="true"><i /><i /><i /></span>
                <span>convert.ts</span>
                <span>TypeScript API</span>
              </div>
              <pre><code>{highlightTypeScript(apiExample)}</code></pre>
            </div>
            <p className={styles.commandLine}><span>$</span><code>{commandExample}</code></p>
            <div className={styles.entryPoints}>
              <span><strong>API</strong>Use it inside an app</span>
              <span><strong>CLI</strong>Convert one file with npx</span>
              <span><strong>Agent skill</strong>Give an agent the package workflow</span>
            </div>
            <figcaption>One converter, exposed in the form that fits the job.</figcaption>
          </figure>
        </section>

        <section className={styles.section}>
          <h2>Document structure survives conversion</h2>
          <p>
            The output uses real Word document parts. A table has rows and cells. A
            heading appears in the document outline. A page break begins a new page. This
            is why the file remains useful after the conversion finishes.
          </p>

          <figure className={`${styles.wideFigure} ${styles.mappingFigure}`}>
            <span className={styles.handLabel}>markdown</span>
            <span className={styles.handLabel}>word document</span>
            <div className={styles.mappingRow}><code># Heading</code><span>→</span><div><strong>Heading 1 style</strong><small>Appears in the document outline</small></div></div>
            <div className={styles.mappingRow}><code>- List item</code><span>→</span><div><strong>Editable bullet list</strong><small>Keeps nesting and indentation</small></div></div>
            <div className={styles.mappingRow}><code>| Table |</code><span>→</span><div><strong>Rows and cells</strong><small>Can still be edited in Word</small></div></div>
            <div className={styles.mappingRow}><code>![Image](url)</code><span>→</span><div><strong>Embedded image</strong><small>Downloaded and placed in the file</small></div></div>
            <div className={styles.mappingRow}><code>[TOC]</code><span>→</span><div><strong>Table of contents</strong><small>Built from real heading styles</small></div></div>
            <div className={styles.mappingRow}><code>\pagebreak</code><span>→</span><div><strong>New document page</strong><small>Creates a real page break</small></div></div>
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
          <h2>What the package handles now</h2>
          <p>
            The first version handled titles and a few heading levels. Version
            {` ${npmStats.version}`} handles lists, tables, footnotes, images, code blocks,
            page breaks, tables of contents, and multi-section documents with headers and
            footers. It also supports captions, cross-references, charts, Mermaid
            diagrams, and editable Word math.
          </p>
          <p>
            Reference DOCX workflows go further. The converter can read styles from an
            existing Word file or patch content into placeholders, which lets a generated
            document follow a supplied school or company template instead of starting
            from a blank page.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What I am still improving</h2>
          <p>
            Tables caused some of the messiest bug reports. I fixed the cases people sent
            me, and I have not seen the same reports return, but Word formatting always
            has another edge case hiding somewhere. Issues and pull requests are how I
            find most of them.
          </p>
          <p>
            New output features need more than code. I keep regression Markdown files and
            compare the rendered documents so a fix for one format does not quietly break
            another.
          </p>
        </section>

        <footer className={styles.footer}>
          <p>I wrote this because I was tired of copying assignments into Word. Hundreds of thousands of downloads later, that is still the basic job.</p>
          <div>
            <Link href="/blog/markdown-to-docx-guide">Read the usage guide</Link>
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
            "@type": "Article",
            headline: "md-to-docx",
            description: project.description,
            url: "https://www.mohtasham.dev/work/markdown-to-docx",
            mainEntityOfPage: "https://www.mohtasham.dev/work/markdown-to-docx",
            image: "https://www.mohtasham.dev/projects/md-to-docx.png",
            datePublished: project.datePublished,
            dateModified: project.dateModified,
            author: {
              "@type": "Person",
              name: "Mohtasham Murshid Madani",
              url: "https://www.mohtasham.dev",
            },
            publisher: {
              "@type": "Person",
              name: "Mohtasham Murshid Madani",
              url: "https://www.mohtasham.dev",
            },
            about: {
              "@type": "SoftwareSourceCode",
              name: "@mohtasham/md-to-docx",
              codeRepository: "https://github.com/MohtashamMurshid/md-to-docx",
              programmingLanguage: "TypeScript",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
