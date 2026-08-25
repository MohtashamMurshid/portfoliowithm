import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/components/books/site-config";
import { getOgImage } from "@/lib/ogImage";
import "./books.css";

const booksOgImage = getOgImage("page", "Books read by Mohtasham Murshid Madani", "books");

export const metadata: Metadata = {
  title: "Books",
  description: siteConfig.description,
  openGraph: {
    title: "Books | Mohtasham Murshid Madani",
    description: siteConfig.description,
    type: "website",
    url: "/books",
    images: [booksOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books | Mohtasham Murshid Madani",
    description: siteConfig.description,
    images: [booksOgImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
  colorScheme: "light",
};

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="books-page">{children}</div>;
}
