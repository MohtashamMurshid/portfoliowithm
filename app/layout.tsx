import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./report.css";
import { EB_Garamond, IBM_Plex_Mono } from "next/font/google";

const editorial = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
});

const registry = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-registry",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohtasham.dev"),
  title: {
    default: "Mohtasham Murshid Madani",
    template: "%s | Mohtasham Murshid Madani",
  },
  description:
    "The Office of Imaginary Infrastructure — a field report of software, intelligent systems, visual experiments, and ongoing work by Mohtasham Murshid Madani.",
  keywords: [
    "Mohtasham Murshid Madani",
    "Software Engineer",
    "AI Researcher",
    "Entrepreneur",
    "Portfolio",
    "Developer",
  ],
  authors: [{ name: "Mohtasham Murshid Madani", url: "https://mohtasham.dev" }],
  creator: "Mohtasham Murshid Madani",
  publisher: "Mohtasham Murshid Madani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohtasham.dev",
    siteName: "Mohtasham's Portfolio",
    title: "Mohtasham Murshid Madani",
    description:
      "A field report of software, intelligent systems, visual experiments, and ongoing work.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mohtasham Murshid Madani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohtasham Murshid Madani",
    description:
      "A field report of software, intelligent systems, visual experiments, and ongoing work.",
    images: ["/twitter-image.png"],
    creator: "@mohtashamdotdev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#eee8d2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html
        lang="en"
        className={`${editorial.variable} ${registry.variable}`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Mohtasham Murshid Madani",
                url: "https://mohtasham.dev",
                sameAs: [
                  "https://github.com/mohtashammurshid",
                  "https://www.instagram.com/mohtashammurshid/",
                  "https://www.linkedin.com/in/mohtashammurshid/",
                  "https://x.com/mohtashamdotdev",
                ],
                jobTitle: "Software Engineer",
                worksFor: {
                  "@type": "Organization",
                  name: "Independent",
                },
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Mohtasham's Portfolio",
                url: "https://mohtasham.dev",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://www.google.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}
