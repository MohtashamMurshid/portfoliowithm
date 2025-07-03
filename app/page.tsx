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
    images: "@/public/images/Mohtasham.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohtasham Murshid Madani",
    description: "Software Engineer, AI Researcher, and Entrepreneur",
    images: "@/public/images/Mohtasham.png",
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
