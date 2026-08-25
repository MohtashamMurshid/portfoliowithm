import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "@/app/blog/[slug]/article.module.css";

export default function MarkdownArticle({ body }: { body: string }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                rel={external ? "noreferrer" : undefined}
                target={external ? "_blank" : undefined}
              >
                {children}
              </a>
            );
          },
          img: ({ alt, src }) => (
            // The migrated Node.js article uses remote figures with no local asset.
            // eslint-disable-next-line @next/next/no-img-element
            <img alt={alt ?? ""} loading="lazy" src={src ?? ""} />
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
