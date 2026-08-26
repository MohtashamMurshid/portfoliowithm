import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PortfolioImage from "@/components/PortfolioImage";
import type { EventCaseStudy as EventCaseStudyRecord } from "@/lib/eventCaseStudies";
import { siteUrl } from "@/lib/site";
import styles from "./EventCaseStudy.module.css";

type EventCaseStudyProps = {
  event: EventCaseStudyRecord;
  previous?: EventCaseStudyRecord;
  next?: EventCaseStudyRecord;
};

export default function EventCaseStudy({ event, previous, next }: EventCaseStudyProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: event.title,
    description: event.summary,
    url: `${siteUrl}/events/${event.slug}`,
    mainEntityOfPage: `${siteUrl}/events/${event.slug}`,
    image: `${siteUrl}${event.image}`,
    datePublished: event.datePublished,
    dateModified: event.dateModified,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Mohtasham Murshid Madani",
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Mohtasham Murshid Madani",
      url: `${siteUrl}/about`,
    },
    about: {
      "@type": "Event",
      name: event.title,
      startDate: event.startDate,
      endDate: event.endDate,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventCompleted",
      location: {
        "@type": "Place",
        name: event.place,
      },
      image: `${siteUrl}${event.image}`,
    },
  };

  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <div className={styles.headingRow}>
          <Link className={styles.backButton} href="/events" aria-label="Back to events">
            <span aria-hidden="true">←</span>
          </Link>
          <header className={styles.header}>
            <h1>{event.title}</h1>
            <p>{event.label} · {event.dateDisplay} · {event.place}</p>
            <p className={styles.byline}>
              By <Link href="/about" rel="author">Mohtasham Murshid Madani</Link>
            </p>
          </header>
        </div>

        <section className={styles.introduction} aria-label="Event introduction">
          <p>{event.summary}</p>
          <p>{event.introduction}</p>

          <div className={styles.metadata} aria-label="Event facts">
            {event.facts.map((fact) => (
              <div key={fact.label}>
                <h2>{fact.label}</h2>
                <p><span>{fact.value}</span></p>
                <small>{fact.note}</small>
              </div>
            ))}
          </div>
        </section>

        <figure className={styles.heroFigure}>
          <div className={styles.heroImage}>
            <PortfolioImage
              src={event.image}
              alt={event.imageAlt}
              fill
              priority
              sizes="(max-width: 720px) calc(100vw - 30px), 820px"
            />
          </div>
          <figcaption>{event.title}, {event.place}.</figcaption>
        </figure>

        <section className={styles.section} aria-labelledby="event-role-title">
          <h2 id="event-role-title">What I handled</h2>
          <p>{event.role}</p>
          <div className={styles.roleGrid}>
            {event.roles.map((role, index) => (
              <div key={role}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{role}</p>
              </div>
            ))}
          </div>
        </section>

        <figure className={`${styles.wideFigure} ${styles.diagramFigure}`}>
          <div className={styles.figureHeading}>
            <h2>{event.flowTitle}</h2>
            <span>{event.flow.length} parts</span>
          </div>
          <div className={styles.flowGraph}>
            {event.flow.map((step, index) => (
              <div className={styles.flowStep} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.detail}</p>
              </div>
            ))}
          </div>
          <figcaption>{event.flowCaption}</figcaption>
        </figure>

        {event.sections.map((section) => (
          <section className={styles.section} aria-labelledby={`${event.slug}-${section.title.toLowerCase().replaceAll(" ", "-")}`} key={section.title}>
            <h2 id={`${event.slug}-${section.title.toLowerCase().replaceAll(" ", "-")}`}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}

        {event.highlight ? (
          <aside className={styles.highlight} aria-labelledby="event-highlight-title">
            <p>{event.highlight.eyebrow}</p>
            <h2 id="event-highlight-title">{event.highlight.title}</h2>
            <div>
              <p>{event.highlight.body}</p>
              {event.highlight.points ? (
                <ul>
                  {event.highlight.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              ) : null}
              {event.highlight.href && event.highlight.linkLabel ? (
                <a href={event.highlight.href} target="_blank" rel="noreferrer">
                  {event.highlight.linkLabel} <ArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </aside>
        ) : null}

        <section className={styles.sources} aria-labelledby="event-sources-title">
          <h2 id="event-sources-title">Event record</h2>
          <div>
            {event.links.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                <span>{link.label}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <nav className={styles.eventNav} aria-label="Other event case studies">
          {previous ? (
            <Link href={`/events/${previous.slug}`}>
              <span>Previous</span>
              <strong>← {previous.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/events/${next.slug}`}>
              <span>Next</span>
              <strong>{next.title} →</strong>
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
