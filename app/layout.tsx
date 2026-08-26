import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./report.css";
import { Caveat, EB_Garamond, IBM_Plex_Mono, Instrument_Serif, Manrope } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import { defaultDescription, defaultTitle, pageAlternates, siteName, siteUrl } from "@/lib/site";

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
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: pageAlternates(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mohtasham's Portfolio",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#f3f0e8",
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
                url: siteUrl,
                sameAs: [
                  "https://github.com/MohtashamMurshid",
                  "https://www.linkedin.com/in/mohtashammurshid/",
                  "https://x.com/mohtashamdotdev",
                  "https://www.instagram.com/mohtashammurshid/",
                  "https://peerlist.io/mohtasham",
                  "https://luma.com/user/mohtasham",
                  "https://www.researchgate.net/profile/Mohtasham-Madani",
                ],
                jobTitle: "AI Engineer",
                worksFor: {
                  "@type": "Organization",
                  name: "CitySage",
                  url: "https://citysage.my",
                },
                alumniOf: {
                  "@type": "CollegeOrUniversity",
                  name: "Taylor's University",
                  url: "https://university.taylors.edu.my/en.html",
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
                "@id": "https://oikina.com/#organization",
                name: "Oikina",
                url: "https://oikina.com",
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
                url: siteUrl,
                inLanguage: "en",
                publisher: { "@id": `${siteUrl}/#person` },
              }),
            }}
          />
        </head>
        <body>
          <PageTransition>{children}</PageTransition>
        </body>
      </html>
    </>
  );
}
