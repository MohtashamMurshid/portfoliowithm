import type { Metadata } from "next";
import Image from "@/components/PortfolioImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogReveal, { BlogRevealItem } from "@/components/blog/BlogReveal";
import { blogPosts, formatBlogDate } from "@/lib/blogPosts";
import { getOgImage } from "@/lib/ogImage";
import { pageAlternates } from "@/lib/site";
import styles from "./blog.module.css";

const description =
  "Notes on software, developer tools, artificial intelligence, and cognitive computing by Mohtasham Murshid Madani.";
const blogOgImage = getOgImage("page", "Writing by Mohtasham Murshid Madani", "blog");

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: pageAlternates("/blog"),
  openGraph: {
    title: "Blog",
    description,
    url: "/blog",
    images: [blogOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog",
    description,
    images: [blogOgImage],
  },
};

export default function BlogIndexPage() {
  const featured =
    blogPosts.find((post) => post.slug === "llm-disclosure-behavior") ?? blogPosts[0];
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className={styles.page}>
      <BlogReveal className={styles.content}>
        <BlogRevealItem delay={0.08}>
          <h1 className={styles.pageTitle}>Writing</h1>
        </BlogRevealItem>
        <BlogRevealItem delay={0.14}>
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

            <h2>{featured.shortTitle}</h2>
            <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
            <p>{featured.description}</p>
            <Link className={styles.continue} href={`/blog/${featured.slug}`}>
              Continue reading <ArrowRight aria-hidden="true" />
            </Link>
          </article>
        </BlogRevealItem>

        <section className={styles.archive} aria-labelledby="all-blogs">
          <BlogRevealItem delay={0.92}>
            <h2 id="all-blogs">All Blogs</h2>
          </BlogRevealItem>
          <div className={styles.archiveList}>
            {sortedPosts.map((post, index) => (
              <BlogRevealItem delay={1.08 + index * 0.16} key={post.slug}>
                <Link className={styles.archiveRow} href={`/blog/${post.slug}`}>
                  <span>{post.shortTitle}</span>
                  <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                </Link>
              </BlogRevealItem>
            ))}
          </div>
        </section>
      </BlogReveal>
    </main>
  );
}
