import type { Metadata } from "next";
import MarkdownArticle from "@/components/blog/MarkdownArticle";
import { developerBody, developerDescription, developerTitle } from "@/lib/agent-resources";
import { pageAlternates } from "@/lib/site";
import styles from "@/app/blog/[slug]/article.module.css";

export const metadata: Metadata = {
  title: developerTitle,
  description: developerDescription,
  alternates: pageAlternates("/developers"),
  openGraph: { title: developerTitle, description: developerDescription, url: "/developers" },
  twitter: { title: developerTitle, description: developerDescription },
};

export default function DevelopersPage() {
  return (
    <main className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}><h1>{developerTitle}</h1></header>
        <MarkdownArticle body={developerBody} />
      </article>
    </main>
  );
}
