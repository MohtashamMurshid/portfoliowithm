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
          <p>Written August 23, 2026 · Open August 23, 2036</p>
          <h2 id="future-letter-title">Dear Mohtasham, ten years from now.</h2>
        </header>

        <div className={styles.letter}>
          <p>It&apos;s 2026. You&apos;re in Kuala Lumpur, working at CitySage and building Oikina. You want to build a successful startup. Maybe by the time you open this, you&apos;re even getting close to an IPO. That would be incredible.</p>

          <p>But I hope you didn&apos;t mistake the company for your whole life. I hope the people close to you now are still beside you, and that success, or the lack of it, didn&apos;t change how you treated them. If the company grew but those relationships disappeared, I don&apos;t think we could call that a successful life.</p>

          <p>I hope you kept time for yourself. Skiing, playing games, going out with friends, and being around the people you care about. Work should never have taken all of that from you.</p>

          <p>I don&apos;t know whether Oikina will succeed. Right now, I want to build it, learn from it, and see people actually use it. Whatever happens to this version of the idea, it doesn&apos;t decide where we end up.</p>

          <p>I only want to ask you three things.</p>

          <p>Did you try your best?</p>

          <p>Did you make the people around you happy?</p>

          <p>Are you still kind-hearted?</p>

          <p>I hope the answer is yes.</p>

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
