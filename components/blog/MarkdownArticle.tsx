import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import styles from "@/app/blog/[slug]/article.module.css";

const languageLabels: Record<string, string> = {
  bash: "Terminal",
  shell: "Terminal",
  sh: "Terminal",
  typescript: "TypeScript",
  ts: "TypeScript",
  tsx: "TSX",
  javascript: "JavaScript",
  js: "JavaScript",
  jsx: "JSX",
  json: "JSON",
  markdown: "Markdown",
  md: "Markdown",
  text: "Text",
};

function getCodeLanguage(children: ReactNode): string {
  const child = Children.toArray(children)[0];
  if (!isValidElement<{ className?: string }>(child)) return "text";

  return child.props.className?.match(/language-([\w-]+)/)?.[1] ?? "text";
}

export default function MarkdownArticle({ body, figures = {} }: { body: string; figures?: Record<string, ReactNode> }) {
  return (
    <div className={styles.prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: false }]]}
        components={{
          p: ({ node, children }) => {
            // Standalone figure links stay readable in the Markdown edition.
            // Replace the whole paragraph to avoid nesting a figure inside <p>.
            const child = node?.children.length === 1 ? node.children[0] : undefined;
            if (child?.type === "element" && child.tagName === "a") {
              const href = child.properties.href;
              if (typeof href === "string" && Object.hasOwn(figures, href)) return figures[href];
            }
            return <p>{children}</p>;
          },
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
          pre: ({ children }) => {
            const language = getCodeLanguage(children);
            const label = languageLabels[language] ?? language;
            const terminal = ["bash", "shell", "sh"].includes(language);

            return (
              <div className={styles.codeWindow}>
                <div className={styles.codeHeader}>
                  <span className={styles.windowControls} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{label}</span>
                  <span>{terminal ? "$" : "code"}</span>
                </div>
                <pre>{children}</pre>
              </div>
            );
          },
          table: ({ children }) => (
            <div className={styles.tableFrame}>
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
