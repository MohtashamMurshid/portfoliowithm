import Image from "next/image";
import styles from "./FutureLetter.module.css";

export default function FutureLetter() {
  return (
    <section className={styles.section} id="letter" aria-labelledby="future-letter-title">
      <a className={styles.idCard} href="https://malaysian.ai" aria-label="Resident at Malaysian AI">
        <Image src="/letter/malaysian-ai-id-v2.png" alt="" fill sizes="(max-width: 720px) 24vw, 15vw" />
      </a>

      <article className={styles.paper}>
        <span className={styles.tape} aria-hidden="true" />

        <header className={styles.heading}>
          <p>Written August 24, 2026 · Open August 24, 2036</p>
          <h2 id="future-letter-title">Dear Mohtasham, ten years from now.</h2>
        </header>

        <div className={styles.letter}>
          <p>It&apos;s 2026. You&apos;re in Kuala Lumpur, working on CitySage, building Oikina, and trying to understand where AI is taking us.</p>

          <p>Ten years from now, I don&apos;t need every plan to have worked. I hope you kept building with care. I hope ambition didn&apos;t turn every quiet hour into work, and that the people you love still know how much they matter.</p>

          <p>Did we make something useful? Did we keep skiing? Are we still curious? If any answer is no, start again. You&apos;ve done that before.</p>

          <p>Remember, the goal was never to look successful. It was to live awake, make work worth caring about, and leave a few doors open for other people.</p>

          <footer>
            <span>See you in 2036,</span>
            <strong>Mohtasham</strong>
          </footer>
        </div>

        <span className={styles.stamp} aria-hidden="true">Do not open early</span>
      </article>

      <div className={styles.pencil} aria-hidden="true">
        <Image src="/letter/yellow-pencil.png" alt="" fill sizes="(max-width: 720px) 42vw, 18vw" />
      </div>
    </section>
  );
}
