import Link from "next/link";
import styles from "./ContactCta.module.css";

const EMAIL = "mohtashammurshid@gmail.com";

export default function ContactCta() {
  return (
    <section className={styles.section} aria-labelledby="contact-title">
      <span className={styles.stitch} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Have something in mind?</p>
          <h2 id="contact-title">
            I&apos;m always up for a good idea,
            <br />
            a hard problem, or a strange little project.
          </h2>
        </div>

        <div className={styles.noteWrap}>
          <span className={styles.annotation} aria-hidden="true">
            Write to me
            <svg viewBox="0 0 150 126">
              <path d="M130 6C113 51 92 70 57 91C45 98 34 103 17 105" />
              <path d="M33 88C27 96 21 103 16 106C25 106 34 109 42 116" />
            </svg>
          </span>
          <a
            className={styles.note}
            href={`mailto:${EMAIL}?subject=Hello%20from%20your%20portfolio`}
          >
            <span>Say</span>
            <span className={styles.underlined}>hello</span>
          </a>
        </div>

        <footer className={styles.footer}>
          <p>
            Or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. I&apos;m also on{" "}
            <a href="https://x.com/mohtashamdotdev">X</a>,{" "}
            <a href="https://www.linkedin.com/in/mohtashammurshid/">LinkedIn</a>, and{" "}
            <a href="https://github.com/MohtashamMurshid">GitHub</a>.
          </p>
          <p>
            <Link href="/developers">Developer resources</Link> · © 2026 Mohtasham Murshid Madani
          </p>
        </footer>
      </div>
    </section>
  );
}
