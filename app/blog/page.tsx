import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts, formatBlogDate } from "@/lib/blogPosts";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on software, developer tools, and cognitive computing by Mohtasham Murshid Madani.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const [featured] = blogPosts;

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <article className={styles.featured}>
          <Link className={styles.artwork} href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`}>
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 812px"
            />
          </Link>

          <h1>{featured.shortTitle}</h1>
          <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
          <p>{featured.description}</p>
          <Link className={styles.continue} href={`/blog/${featured.slug}`}>
            Continue reading <ArrowRight aria-hidden="true" />
          </Link>
        </article>

        <section className={styles.archive} aria-labelledby="all-blogs">
          <h2 id="all-blogs">All Blogs</h2>
          <div className={styles.archiveList}>
            {blogPosts.map((post) => (
              <Link className={styles.archiveRow} href={`/blog/${post.slug}`} key={post.slug}>
                <span>{post.shortTitle}</span>
                <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
