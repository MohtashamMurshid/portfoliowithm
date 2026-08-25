import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./GitHubProjectCaseStudy.module.css";

export type GitHubProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type GitHubProjectMetadata = {
  title: string;
  items: readonly string[];
};

export type GitHubProjectNarrativeSection = {
  title: string;
  paragraphs: readonly string[];
};

export type GitHubProjectMappingRow = {
  source: string;
  target: string;
};

export type GitHubProjectMappingFigure = {
  sourceLabel: string;
  targetLabel: string;
  rows: readonly [
    GitHubProjectMappingRow,
    GitHubProjectMappingRow,
    GitHubProjectMappingRow,
    GitHubProjectMappingRow,
  ];
  caption: string;
  afterSection?: 0 | 1 | 2;
};

export type GitHubProjectCodeFigure = {
  label: string;
  fileName: string;
  code: string;
  command: string;
  caption: string;
  afterSection?: 0 | 1 | 2;
};

export type GitHubProjectFooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type GitHubProjectMedia =
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      label: string;
      caption: string;
    };

export type GitHubProjectMediaBlock = {
  afterSection: 0 | 1 | 2;
  items: readonly GitHubProjectMedia[];
};

export type GitHubProjectCaseStudyData = {
  name: string;
  dateLine: string;
  description: string;
  compactImages?: boolean;
  image: GitHubProjectImage;
  introduction: readonly [string, string];
  metadata: readonly [
    GitHubProjectMetadata,
    GitHubProjectMetadata,
    GitHubProjectMetadata,
  ];
  sections: readonly [
    GitHubProjectNarrativeSection,
    GitHubProjectNarrativeSection,
    GitHubProjectNarrativeSection,
  ];
  mappingFigure: GitHubProjectMappingFigure;
  codeFigure: GitHubProjectCodeFigure;
  mediaBlocks?: readonly GitHubProjectMediaBlock[];
  footer: {
    statement: string;
    links: readonly GitHubProjectFooterLink[];
  };
  pageUrl: string;
  repositoryUrl?: string;
  programmingLanguage: string | readonly string[];
  dateCreated?: string;
  author?: {
    name: string;
    url: string;
  };
};

export type GitHubProjectCaseStudyProps = {
  project: GitHubProjectCaseStudyData;
  backHref?: string;
};

const codeKeywords = new Set([
  "async",
  "await",
  "const",
  "export",
  "from",
  "function",
  "import",
  "interface",
  "new",
  "return",
  "type",
]);

function highlightCode(code: string): ReactNode[] {
  const tokenPattern = /(#[^\n]*|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:async|await|const|export|from|function|import|interface|new|return|type)\b|\b(?:true|false|null|undefined)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*(?=\s*[:(]))/gm;
  const highlighted: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(code)) !== null) {
    const token = match[0];
    const index = match.index;
    const rest = code.slice(index + token.length).trimStart();
    let className = styles.tokenFunction;

    if (index > cursor) highlighted.push(code.slice(cursor, index));

    if (token.startsWith("//") || token.startsWith("#")) className = styles.tokenComment;
    else if (/^["'`]/.test(token)) className = styles.tokenString;
    else if (/^\d/.test(token)) className = styles.tokenNumber;
    else if (codeKeywords.has(token) || /^(true|false|null|undefined)$/.test(token)) {
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

function isExternalLink(link: GitHubProjectFooterLink): boolean {
  return link.external ?? /^https?:\/\//.test(link.href);
}

export default function GitHubProjectCaseStudy({
  project,
  backHref = "/work",
}: GitHubProjectCaseStudyProps) {
  const author = project.author ?? {
    name: "Mohtasham Murshid Madani",
    url: "https://mohtasham.dev",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: project.pageUrl,
    ...(project.repositoryUrl ? { codeRepository: project.repositoryUrl } : {}),
    programmingLanguage: project.programmingLanguage,
    ...(project.dateCreated ? { dateCreated: project.dateCreated } : {}),
    author: {
      "@type": "Person",
      name: author.name,
      url: author.url,
    },
  };

  return (
    <main className={styles.page}>
      <article className={`${styles.article} ${project.compactImages ? styles.compactImages : ""}`}>
        <div className={styles.headingRow}>
          <Link className={styles.backButton} href={backHref} aria-label="Back to work">
            <span aria-hidden="true">←</span>
          </Link>
          <header className={styles.header}>
            <h1>{project.name}</h1>
            <p>{project.dateLine}</p>
          </header>
        </div>

        <figure className={styles.cover}>
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            priority
            sizes="(max-width: 760px) 72vw, 520px"
          />
        </figure>

        <section className={styles.introduction} aria-label="Project introduction">
          {project.introduction.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className={styles.metadata}>
            {project.metadata.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <p>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className={styles.rule} />

        {project.sections.map((section, sectionIndex) => (
          <section className={styles.section} key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {project.mediaBlocks
              ?.filter((block) => block.afterSection === sectionIndex)
              .map((block, blockIndex) => (
                <div
                  className={`${styles.wideFigure} ${styles.mediaGrid} ${
                    block.items.length === 1 ? styles.mediaSingle : styles.mediaPair
                  }`}
                  key={`${section.title}-media-${blockIndex}`}
                >
                  {block.items.map((item) => (
                    <figure className={styles.mediaItem} key={item.src}>
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          sizes={
                            project.compactImages
                              ? "(max-width: 760px) 42vw, 320px"
                              : block.items.length === 1
                                ? "(max-width: 760px) 94vw, 1080px"
                                : "(max-width: 760px) 46vw, 500px"
                          }
                        />
                      ) : (
                        <video
                          aria-label={item.label}
                          controls
                          playsInline
                          poster={item.poster}
                          preload="metadata"
                          src={item.src}
                        />
                      )}
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ))}

            {(project.mappingFigure.afterSection ?? 0) === sectionIndex && (
              <figure className={`${styles.wideFigure} ${styles.mappingFigure}`}>
                <span className={styles.handLabel}>{project.mappingFigure.sourceLabel}</span>
                <span className={styles.handLabel}>{project.mappingFigure.targetLabel}</span>
                {project.mappingFigure.rows.map((row) => (
                  <div className={styles.mappingRow} key={`${row.source}-${row.target}`}>
                    <code>{row.source}</code>
                    <span aria-hidden="true">→</span>
                    <strong>{row.target}</strong>
                  </div>
                ))}
                <figcaption>{project.mappingFigure.caption}</figcaption>
              </figure>
            )}

            {(project.codeFigure.afterSection ?? 1) === sectionIndex && (
              <figure className={`${styles.wideFigure} ${styles.codeFigure}`}>
                <div className={styles.codeWindow}>
                  <div>
                    <span>{project.codeFigure.label}</span>
                    <span>{project.codeFigure.fileName}</span>
                  </div>
                  <pre><code>{highlightCode(project.codeFigure.code)}</code></pre>
                </div>
                <p className={styles.commandLine}>
                  <span aria-hidden="true">$</span>
                  <code>{project.codeFigure.command}</code>
                </p>
                <figcaption>{project.codeFigure.caption}</figcaption>
              </figure>
            )}
          </section>
        ))}

        <footer className={styles.footer}>
          <p>{project.footer.statement}</p>
          <div>
            {project.footer.links.map((link) =>
              isExternalLink(link) ? (
                <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} key={link.href}>{link.label}</Link>
              ),
            )}
            <Link href={backHref}>Back to work</Link>
          </div>
        </footer>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
