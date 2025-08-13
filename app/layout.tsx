import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Open_Sans } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";

// If loading a variable font, you don't need to specify the font weight
const sans = Open_Sans({
  weight: ["400", "700", "300", "500", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohtasham.dev"),
  title: {
    default: "Mohtasham Murshid Madani",
    template: "%s | Mohtasham Murshid Madani",
  },
  description: "Software Engineer, AI Researcher, and Entrepreneur",
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
    description: "Software Engineer, AI Researcher, and Entrepreneur",
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
    description: "Software Engineer, AI Researcher, and Entrepreneur",
    images: ["/twitter-image.png"],
    creator: "@mohtashamdev",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={sans.className}>
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
                  "https://github.com/mohtashammurshidmadani",
                  "https://www.linkedin.com/in/mohtasham-murshid-madani/",
                  "https://x.com/mohtashamdev",
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
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed right-4 bottom-4 z-50">
              <ModeToggle />
            </div>

            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
