import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import GithubInfo from "@/components/GithubInfo";

export const metadata = {
  metadataBase: new URL("https://portfolio.mohtasham.dev"),
  title: "Mohtasham Murshid Madani - Renaissance Portfolio",
  description:
    "Software Engineer, AI Researcher, and Entrepreneur - A Renaissance manuscript-style portfolio showcasing technical mastery and artistic expression.",
  keywords: [
    "Mohtasham Murshid Madani",
    "Software Engineer",
    "AI Researcher",
    "Entrepreneur",
    "Portfolio",
    "Developer",
    "Renaissance",
    "Manuscript",
    "Artistic Portfolio",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mohtasham Murshid Madani - Renaissance Portfolio",
    description:
      "Software Engineer, AI Researcher, and Entrepreneur - A Renaissance manuscript-style portfolio showcasing technical mastery and artistic expression.",
    url: "https://portfolio.mohtasham.dev",
    siteName: "Mohtasham's Renaissance Portfolio",
    images: "/opengraph-image.png",
    type: "website",
    locale: "en_US",
  },
  // WhatsApp specific metadata
  whatsapp: {
    title: "Mohtasham Murshid Madani - Renaissance Portfolio",
    description:
      "Software Engineer, AI Researcher, and Entrepreneur - A Renaissance manuscript-style portfolio showcasing technical mastery and artistic expression.",
    image: "/opengraph-image.png",
  },
  discord: {
    title: "Mohtasham Murshid Madani - Renaissance Portfolio",
    description:
      "Software Engineer, AI Researcher, and Entrepreneur - A Renaissance manuscript-style portfolio showcasing technical mastery and artistic expression.",
    image: "/opengraph-image.png",
    color: "#5865F2", // Discord brand color
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohtasham Murshid Madani - Renaissance Portfolio",
    description:
      "Software Engineer, AI Researcher, and Entrepreneur - A Renaissance manuscript-style portfolio showcasing technical mastery and artistic expression.",
    images: "/twitter-image.png",
  },
  alternates: {
    canonical: "https://portfolio.mohtasham.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Landing />
      <Skills />
      <GithubInfo />
    </>
  );
}
