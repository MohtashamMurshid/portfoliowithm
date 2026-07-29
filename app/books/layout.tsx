import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/components/books/site-config";
import "./books.css";

export const metadata: Metadata = {
  title: "Books",
  description: siteConfig.description,
  openGraph: {
    title: "Books | Mohtasham Murshid Madani",
    description: siteConfig.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#eee8d2",
  colorScheme: "light",
};

export default function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="books-page">{children}</div>;
}
