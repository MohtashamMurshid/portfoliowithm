import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./report.css";
import { Caveat, EB_Garamond, IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";

const siteUrl = "https://www.mohtasham.dev";
const homeUrl = `${siteUrl}/`;
const siteName = "Mohtasham Murshid Madani";
const siteDescription =
  "Mohtasham Murshid Madani is an AI Engineer at CitySage, founder of getdesign, and open-source builder creating AI, developer tooling, and web experiences.";

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

const interfaceSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-interface-serif",
  display: "swap",
});

const interfaceSans = Manrope({
  subsets: ["latin"],
  variable: "--font-interface-sans",
  display: "swap",
});

const handwriting = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
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
        suppressHydrationWarning
        className={`${editorial.variable} ${registry.variable} ${interfaceSerif.variable} ${interfaceSans.variable} ${handwriting.variable}`}
      >
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
        <body>{children}</body>
      </html>
    </>
  );
}
