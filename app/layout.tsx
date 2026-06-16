import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Open_Sans } from "next/font/google";
import { ModeToggle } from "@/components/ModeToggle";

const siteUrl = "https://www.mohtasham.dev";
const homeUrl = `${siteUrl}/`;
const siteName = "Mohtasham Murshid Madani";
const siteDescription =
  "Mohtasham Murshid Madani is an AI Engineer at CitySage, founder of getdesign, and open-source builder creating AI, developer tooling, and web experiences.";

// If loading a variable font, you don't need to specify the font weight
const sans = Open_Sans({
  weight: ["400", "700", "300", "500", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Mohtasham Murshid Madani | AI Engineer at CitySage, Founder of getdesign",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Mohtasham Murshid Madani",
    "AI Engineer at CitySage",
    "getdesign founder",
    "open-source builder",
    "Software Engineer",
    "AI Researcher",
    "Entrepreneur",
    "Portfolio",
    "Developer",
  ],
  authors: [{ name: siteName, url: homeUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: homeUrl,
    siteName: "Mohtasham's Portfolio",
    title: "Mohtasham Murshid Madani | AI Engineer at CitySage",
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohtasham Murshid Madani | AI Engineer at CitySage",
    description: siteDescription,
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
                "@id": `${siteUrl}/#person`,
                name: siteName,
                alternateName: [
                  "Mohtasham Madani",
                  "\u0645\u062D\u062A\u0634\u0645 \u0645\u0631\u0634\u062F \u0645\u062F\u0646\u064A",
                ],
                url: homeUrl,
                sameAs: [
                  "https://github.com/MohtashamMurshid",
                  "https://www.linkedin.com/in/mohtashammurshid/",
                  "https://x.com/mohtashamdotdev",
                  "https://www.instagram.com/mohtashammurshid/",
                  "https://peerlist.io/mohtasham",
                  "https://luma.com/user/mohtasham",
                ],
                jobTitle: "AI Engineer",
                worksFor: {
                  "@type": "Organization",
                  name: "CitySage",
                  url: "https://citysage.my",
                },
                knowsAbout: [
                  "Artificial intelligence",
                  "Software engineering",
                  "Developer tools",
                  "Open source software",
                  "Web development",
                  "Design systems",
                ],
                makesOffer: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "SoftwareApplication",
                      name: "getdesign",
                      applicationCategory: "DesignApplication",
                      url: "https://getdesign.app",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "SoftwareApplication",
                      name: "@mohtasham/md-to-docx",
                      applicationCategory: "DeveloperApplication",
                      url: "https://www.npmjs.com/package/@mohtasham/md-to-docx",
                    },
                  },
                ],
              }),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://getdesign.app/#organization",
                name: "getdesign",
                url: "https://getdesign.app",
                founder: { "@id": `${siteUrl}/#person` },
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
                url: homeUrl,
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
