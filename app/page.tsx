import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import GithubInfo from "@/components/GithubInfo";

export const metadata = {
  metadataBase: new URL("https://portfolio.mohtasham.dev"),
  title: "Mohtasham Murshid Madani",
  description: "Software Engineer, AI Researcher, and Entrepreneur",
  keywords: [
    "Mohtasham Murshid Madani",
    "Software Engineer",
    "AI Researcher",
    "Entrepreneur",
    "Portfolio",
    "Developer",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mohtasham Murshid Madani",
    description: "Software Engineer, AI Researcher, and Entrepreneur",
    url: "https://portfolio.mohtasham.dev",
    siteName: "Mohtasham's Portfolio",
    images: "/opengraph-image.png",
    type: "website",
    locale: "en_US",
  },
  // WhatsApp specific metadata
  whatsapp: {
    title: "Mohtasham Murshid Madani",
    description: "Software Engineer, AI Researcher, and Entrepreneur",
    image: "/opengraph-image.png",
  },
  discord: {
    title: "Mohtasham Murshid Madani",
    description: "Software Engineer, AI Researcher, and Entrepreneur",
    image: "/opengraph-image.png",
    color: "#5865F2", // Discord brand color
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohtasham Murshid Madani",
    description: "Software Engineer, AI Researcher, and Entrepreneur",
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
