import Image from "@/components/PortfolioImage";
import Link from "next/link";
import styles from "./ProjectCollage.module.css";

const projects = [
  {
    name: "getdesign",
    note: "A design system from any URL.",
    href: "/work/getdesign",
    image: "/projects/getdesign.png",
    className: styles.getdesign,
    sizes: "(max-width: 760px) 86vw, 38vw",
  },
  {
    name: "Oikina",
    note: "Small software, inside your cloud.",
    href: "/work/oikina",
    image: "/projects/oikina-pass.png",
    className: styles.oikina,
    sizes: "(max-width: 760px) 82vw, 34vw",
  },
  {
    name: "md-to-docx",
    note: "Markdown to production-ready Word docs.",
    href: "/work/markdown-to-docx",
    image: "/projects/md-to-docx.png",
    className: styles.markdown,
    sizes: "(max-width: 760px) 88vw, 37vw",
  },
  {
    name: "Eikon Studio",
    note: "A multi-model AI image studio.",
    href: "/work/eikon-studio",
    image: "/projects/eikon-studio.png",
    className: styles.eikon,
    sizes: "(max-width: 760px) 92vw, 42vw",
  },
  {
    name: "Iris",
    note: "An open-source camera for iPhone.",
    href: "/work/iris",
    image: "/projects/iris-camera.png",
    className: styles.iris,
    sizes: "(max-width: 760px) 62vw, 23vw",
  },
  {
    name: "Understanding Software",
    note: "A visual field guide to how software works.",
    href: "/work/understanding-software",
    image: "/projects/understanding-software-zine.png",
    className: styles.understanding,
    sizes: "(max-width: 760px) 94vw, 42vw",
  },
  {
    name: "Skills",
    note: "Reusable abilities for coding agents.",
    href: "/work/skills",
    image: "/projects/agent-skills.png",
    className: styles.skills,
    sizes: "(max-width: 760px) 88vw, 38vw",
  },
];

export default function ProjectCollage() {
  return (
    <section className={styles.section} id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title">
        Here are some interesting things
        <br />
        I&apos;ve been <em>working</em> on lately…
      </h2>

      <div className={styles.collage}>
        {projects.map((project) => (
          <Link
            key={project.name}
            className={`${styles.artifact} ${project.className}`}
            href={project.href}
            aria-label={`Open ${project.name}`}
          >
            <span className={styles.artwork}>
              <Image
                src={project.image}
                alt=""
                fill
                sizes={project.sizes}
              />
            </span>
            <span className={styles.caption}>
              <strong>{project.name}</strong>
              <small>{project.note}</small>
            </span>
          </Link>
        ))}
      </div>

      <span className={styles.stitch} aria-hidden="true" />
    </section>
  );
}
