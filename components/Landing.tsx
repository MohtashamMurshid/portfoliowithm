import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import NowSection from "@/components/NowSection";

interface LandingProps {
  npmDownloadText: string;
}

const Landing = ({ npmDownloadText }: LandingProps) => {
  const names = [
    "\u0645\u062D\u062A\u0634\u0645 \u0645\u0631\u0634\u062F \u0645\u062F\u0646\u064A",
    "\u041C\u043E\u0445\u0442\u0430\u0448\u0430\u043C \u041C\u0443\u0440\u0448\u0438\u0434 \u041C\u0430\u0434\u0430\u043D\u0438",
    "\u83AB\u8D6B\u5854\u6C99\u59C6\u00B7\u7A46\u5C14\u5E0C\u5FB7\u00B7\u9A6C\u8FBE\u5C3C",
    "\u30E2\u30BF\u30B7\u30E3\u30E0\u30FB\u30E0\u30EB\u30B7\u30C9\u30FB\u30DE\u30C0\u30CB",
    "\u041C\u043E\u0445\u0442\u0430\u0448\u0430\u043C \u041C\u0443\u0440\u0448\u0438\u0434 \u041C\u0430\u0434\u0430\u043D\u0438 .",
  ];

  const headerData = {
    primaryName: "Mohtasham Murshid Madani",
    names,
    subtitle:
      "Bachelor of Science in Computer Science specializing in Artificial Intelligence (Honors).",
    description:
      "AI Engineer at CitySage, founder of getdesign, and open-source builder.",
    pastExperience:
      "Building polished software, AI products, developer tools, and web experiences.",
    githubUrl: "https://github.com/mohtashammurshid",
    linkedinUrl: "https://www.linkedin.com/in/mohtashammurshid/",
    xUrl: "https://x.com/mohtashamdotdev",
    researchUrl: "https://www.researchgate.net/profile/Mohtasham-Madani",
    blogUrl: "https://blogwithm.netlify.app/blog",
    email: "mohtashammurshid@gmail.com",
    smarttexUrl: "https://smarttex.vercel.app",
  };

  const buildingProjects = [
    {
      title: "Citysage",
      position: "AI Engineer",
      description: "Building intelligent city-scale AI solutions.",
      url: "https://citysage.my",
      isExternal: true,
    },
    {
      title: "getdesign",
      position: "Founder",
      description:
        "On-demand design systems from any URL. Accessible via web, API, CLI, and as a portable agent.",
   
      url: "https://getdesign.app",
      isExternal: true,
    },
  ];

  const projects = [
    {
      title: "Markdown to Docx",
      description: `Convert Markdown to Docx.<br />${npmDownloadText}`,
      url: "https://npmjs.com/package/@mohtasham/md-to-docx",
      isExternal: true,
    },
    {
      title: "Eikon Studio",
      description:
        "An open-source image harness for Agents, with persistent generations, history, skills, and file tagging.",
      url: "https://eikonstudio.xyz",
      isExternal: true,
    },
  ];

  const writingProjects = [
    {
      title: "Technical Blog",
      description: "Thoughts on software development and design.",
      url: "/blog",
      isExternal: false,
    },
    {
      title: "Bookshelf",
      description: "Books I’ve read, with personal reviews on a 3D shelf.",
      url: "/books",
      isExternal: false,
    },
  ];

  const nowData = {
    content:
      "Developing skill through doing, guiltlessly exploring passion and interests, imbuing quality.",
    highlight: "everything around me is someone\u2019s life work",
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen py-16 px-4 justify-center">
        <Header {...headerData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          <Section title="Cooking in">
            {buildingProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </Section>

          <Section title="Projects" titleUrl="#projects">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </Section>

          <Section title="Writing">
            {writingProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </Section>
        </div>

        <NowSection {...nowData} />
      </div>
    </MaxWidthWrapper>
  );
};

export default Landing;
