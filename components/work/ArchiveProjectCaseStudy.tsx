import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ArchiveProject } from "@/lib/archiveProjects";
import styles from "./ArchiveProjectCaseStudy.module.css";

type ArchiveProjectCaseStudyProps = {
  project: ArchiveProject;
  position: number;
  total: number;
  previous?: ArchiveProject;
  next?: ArchiveProject;
};

function percentage(bytes: number, total: number): number {
  return Math.max(0.8, (bytes / total) * 100);
}

export default function ArchiveProjectCaseStudy({
  project,
  position,
  total,
  previous,
  next,
}: ArchiveProjectCaseStudyProps) {
  const languageTotal = project.languages.reduce((sum, language) => sum + language.bytes, 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.name,
    description: project.summary,
    url: `https://www.mohtasham.dev/work/archive/${project.slug}`,
    mainEntityOfPage: `https://www.mohtasham.dev/work/archive/${project.slug}`,
    author: {
      "@type": "Person",
      name: "Mohtasham Murshid Madani",
      url: "https://www.mohtasham.dev",
    },
    about: {
      "@type": "SoftwareSourceCode",
      name: project.name,
      ...(project.repositoryUrl ? { codeRepository: project.repositoryUrl } : {}),
      programmingLanguage: project.languages.map((language) => language.name),
    },
  };

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <div className={styles.headingRow}>
          <Link className={styles.backButton} href="/work" aria-label="Back to work">
            <span aria-hidden="true">←</span>
          </Link>
          <header className={styles.header}>
            <h1>{project.name}</h1>
            <p>
              {project.category} · {project.year} · Archive {String(position).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
          </header>
        </div>

        <section className={styles.introduction} aria-label="Project introduction">
          <p>{project.summary}</p>
          <p>{project.introduction}</p>

          <div className={styles.metadata} aria-label="Project facts">
            {project.facts.map((fact) => (
              <div key={`${fact.value}-${fact.label}`}>
                <h2>{fact.label}</h2>
                <p><span>{fact.value}</span></p>
                {fact.note ? <small>{fact.note}</small> : null}
              </div>
            ))}
          </div>
        </section>

        <div className={styles.rule} />

        <section className={styles.section} aria-labelledby="project-note-title">
          <h2 id="project-note-title">What I made</h2>
          {project.notes.map((note) => <p key={note}>{note}</p>)}

          <figure className={`${styles.wideFigure} ${styles.diagramFigure}`}>
            <div className={styles.figureHeading}>
              <h3>How it works</h3>
              <span>{project.flow.length} steps</span>
            </div>
            <div className={styles.flowGraph}>
              {project.flow.map((step, index) => (
                <div className={styles.flowStep} key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
            <figcaption>A compact map of the main product loop.</figcaption>
          </figure>
        </section>

        <section className={styles.section} aria-labelledby="repository-title">
          <h2 id="repository-title">Repository breakdown</h2>
          <p>
            This comes from GitHub&apos;s detected language breakdown. It measures source size, not the time or difficulty of the work.
          </p>

          <figure className={`${styles.wideFigure} ${styles.diagramFigure}`}>
            <div className={styles.figureHeading}>
              <h3>Language mix</h3>
              <span>GitHub source bytes</span>
            </div>
            <div className={styles.languageGraph}>
              {project.languages.map((language, index) => {
                const share = percentage(language.bytes, languageTotal);
                const barStyle = {
                  "--bar-size": `${share}%`,
                  "--bar-index": index,
                } as CSSProperties;

                return (
                  <div className={styles.languageRow} key={language.name} style={barStyle}>
                    <span>{language.name}</span>
                    <div aria-hidden="true"><i /></div>
                    <strong>{share < 1 ? "<1" : Math.round(share)}%</strong>
                  </div>
                );
              })}
            </div>
          </figure>
        </section>

        <section className={styles.record} aria-label="Project record">
          <div>
            <span>Role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Status</span>
            <p>{project.status}</p>
          </div>
          <div>
            <span>Source</span>
            {project.repositoryUrl ? (
              <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                {project.repositoryLabel} <ArrowUpRight aria-hidden="true" />
              </a>
            ) : <p>{project.repositoryLabel}</p>}
          </div>
        </section>

        <nav className={styles.projectNav} aria-label="Other archive projects">
          {previous ? (
            <Link href={`/work/archive/${previous.slug}`}>
              <span>Previous</span>
              <strong>← {previous.name}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/work/archive/${next.slug}`}>
              <span>Next</span>
              <strong>{next.name} →</strong>
            </Link>
          ) : <span />}
        </nav>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
