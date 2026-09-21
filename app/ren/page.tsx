import type { Metadata } from "next";
import Link from "next/link";
import MarkdownArticle from "@/components/blog/MarkdownArticle";
import { getRenBody, renDescription, renTitle } from "@/lib/ren";
import { pageAlternates } from "@/lib/site";
import styles from "@/app/blog/[slug]/article.module.css";

export const metadata: Metadata = {
  title: { absolute: "Ren | Mohtasham's personal AI agent" },
  description: renDescription,
  alternates: pageAlternates("/ren"),
  openGraph: { title: renTitle, description: renDescription, url: "/ren", type: "website" },
  twitter: { title: renTitle, description: renDescription },
};

export default function RenPage() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}><h1>{renTitle}</h1></header>
        <MarkdownArticle body={getRenBody()} />
        <footer className={styles.footer}>
          <Link href="/blog">← All blogs</Link>
        </footer>
      </article>
    </main>
  );
}
