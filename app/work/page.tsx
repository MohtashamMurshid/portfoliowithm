import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WorkEntrance from "@/components/work/WorkEntrance";
import styles from "./work.module.css";

type WorkItem = {
  name: string;
  category: string;
  date: string;
  href: string;
  image: string;
  status?: string;
};

const featured: WorkItem = {
  name: "Oikina",
  category: "Enterprise software",
  date: "Building now",
  href: "/work/oikina",
  image: "/projects/oikina-pass.png",
  status: "Building now",
};

const work: WorkItem[] = [
  {
    name: "Iris",
    category: "Open-source camera",
    date: "Aug 24, 2026",
    href: "/work/iris",
    image: "/projects/iris-camera.png",
  },
  {
    name: "Skills",
    category: "Agent tooling",
    date: "Aug 22, 2026",
    href: "/work/skills",
    image: "/projects/agent-skills.png",
  },
  {
    name: "md-to-docx",
    category: "Developer tool",
    date: "Aug 21, 2026",
    href: "/work/markdown-to-docx",
    image: "/projects/md-to-docx.png",
  },
  {
    name: "Eikon Studio",
    category: "AI image studio",
    date: "Aug 20, 2026",
    href: "/work/eikon-studio",
    image: "/projects/eikon-studio.png",
  },
  {
    name: "Understanding Software",
    category: "Interactive field guide",
    date: "Jul 31, 2026",
    href: "/work/understanding-software",
    image: "/projects/understanding-software-zine.png",
  },
  {
    name: "getdesign",
    category: "Design infrastructure",
    date: "Jul 20, 2026",
    href: "/work/getdesign",
    image: "/projects/getdesign.png",
  },
];

const archive = [featured, ...work];

const portfolioEditions = [
  {
    number: "01",
    title: "The plain portfolio",
    taste: "My sensible phase",
    description: "Dark mode, skills grids, GitHub stats, and everything in its proper box.",
    href: "/archive/1",
  },
  {
    number: "02",
    title: "The field report",
    taste: "My editorial phase",
    description: "A landscape dossier with archival birds, official stamps, and plenty of ceremony.",
    href: "/archive/2",
  },
];

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects and experiments by Mohtasham Murshid Madani.",
  alternates: { canonical: "/work" },
};

function ProjectLink({ item, featuredCard = false }: { item: WorkItem; featuredCard?: boolean }) {
  const external = item.href.startsWith("http");

  return (
    <Link
      className={featuredCard ? styles.featuredCard : styles.projectCard}
      href={item.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className={featuredCard ? styles.featuredImage : styles.projectImage}>
        <Image
          src={item.image}
          alt=""
          fill
          priority={featuredCard}
          loading={featuredCard ? undefined : "eager"}
          sizes={featuredCard ? "(max-width: 720px) 92vw, 660px" : "(max-width: 720px) 88vw, 280px"}
        />
      </span>
      <span className={styles.projectMeta}>
        <strong>{item.name}</strong>
        <small>{item.date}</small>
      </span>
    </Link>
  );
}

export default function WorkIndexPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <WorkEntrance
          featured={<ProjectLink item={featured} featuredCard />}
          projects={work.map((item) => <ProjectLink item={item} key={item.name} />)}
        />

        <section className={styles.archive} aria-labelledby="archive-title">
          <h2 id="archive-title">Archive</h2>
          <div className={styles.archiveList}>
            {archive.map((item) => {
              const external = item.href.startsWith("http");

              return (
                <Link
                  className={styles.archiveRow}
                  href={item.href}
                  key={item.name}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  <span className={styles.archiveName}>
                    <strong>{item.name}</strong>
                    {item.status ? <small>{item.status}</small> : null}
                  </span>
                  <span className={styles.category}>{item.category}</span>
                  <time>{item.date}</time>
                </Link>
              );
            })}
          </div>

          <div className={styles.editions}>
            <div className={styles.editionsHeading}>
              <p>Portfolio time capsule</p>
              <span>Designs I used to like enough to ship.</span>
            </div>
            <div className={styles.archiveList}>
              {portfolioEditions.map((edition) => (
                <Link
                  className={`${styles.archiveRow} ${styles.editionRow}`}
                  href={edition.href}
                  key={edition.number}
                >
                  <span className={styles.archiveName}>
                    <strong>{edition.title}</strong>
                    <small className={styles.editionBadge}>Old site</small>
                  </span>
                  <span className={styles.category}>
                    {edition.taste}. {edition.description}
                  </span>
                  <span className={styles.editionNumber}>Edition {edition.number}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
