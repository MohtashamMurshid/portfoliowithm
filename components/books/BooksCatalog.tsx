import { catalog } from "./catalog";
import { siteConfig } from "./site-config";

export function BooksCatalog() {
  return (
    <section className="sr-only" aria-label="Reading list">
      <h1>Books</h1>
      <p>{siteConfig.description}</p>
      <ol>
        {catalog.map((book) => (
          <li key={book.id}>
            <article>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
