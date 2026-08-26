import { BooksCatalog } from "@/components/books/BooksCatalog";
import { catalog } from "@/components/books/catalog";
import { ProgressLibrary } from "@/components/books/ProgressLibrary";
import { siteConfig } from "@/components/books/site-config";
import { siteUrl } from "@/lib/site";

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Books",
  description: siteConfig.description,
  url: `${siteUrl}/books`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: catalog.length,
    itemListElement: catalog.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Book",
        name: book.title,
        author: book.author,
        description: book.description,
        url: book.url,
      },
    })),
  },
};

export default function BooksPage() {
  return (
    <>
      <BooksCatalog />
      <ProgressLibrary />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
