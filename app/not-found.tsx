import Link from "next/link";
import { recoveryLinks } from "@/lib/agent-resources";
import styles from "@/app/blog/[slug]/article.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}><h1>404: Page not found</h1></header>
        <div className={styles.prose}>
          <p>This URL does not exist. Check the address or continue here.</p>
          <ul>{recoveryLinks.map(({ label, href }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
        </div>
      </article>
    </main>
  );
}
