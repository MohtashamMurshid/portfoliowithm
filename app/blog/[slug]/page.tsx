import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogReveal from "@/components/blog/BlogReveal";
import MarkdownArticle from "@/components/blog/MarkdownArticle";
import {
  blogPosts,
  formatBlogDate,
  getBlogPost,
  getBlogPostBody,
} from "@/lib/blogPosts";
import styles from "./article.module.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      authors: ["Mohtasham Murshid Madani"],
      url: `/blog/${post.slug}`,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const body = getBlogPostBody(post);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modifiedDate,
    url: `https://www.mohtasham.dev/blog/${post.slug}`,
    mainEntityOfPage: `https://www.mohtasham.dev/blog/${post.slug}`,
    image: {
      "@type": "ImageObject",
      url: `https://www.mohtasham.dev${post.image}`,
    },
    author: {
      "@type": "Person",
      name: "Mohtasham Murshid Madani",
      url: "https://www.mohtasham.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Mohtasham Murshid Madani",
      url: "https://www.mohtasham.dev",
    },
  }).replace(/</g, "\\u003c");

  return (
    <main className={styles.page}>
      <BlogReveal>
        <article className={styles.article}>
          <header className={styles.header}>
            <h1>{post.title}</h1>
            <p className={styles.dates}>
              Published <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              {post.modifiedDate !== post.date ? (
                <> · Updated <time dateTime={post.modifiedDate}>{formatBlogDate(post.modifiedDate)}</time></>
              ) : null}
            </p>
          </header>

          <div className={styles.hero}>
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 832px"
            />
          </div>

          <MarkdownArticle body={body} />

          <footer className={styles.footer}>
            <Link href="/blog">← All blogs</Link>
          </footer>
        </article>
      </BlogReveal>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    </main>
  );
}
