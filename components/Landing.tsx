import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Header from "@/components/Header";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import NowSection from "@/components/NowSection";

const Landing = () => {
  const names = [
    "محتشم مرشد مدني",
    "Мохташам Муршид Мадани",
    "莫赫塔沙姆·穆尔希德·马达尼",
    "モタシャム・ムルシド・マダニ",
    "Мохташам Муршид Мадани .",
    "Mohtasham Murshid Madani",
  ];

  const headerData = {
    names,
    subtitle:
      "Bachlor of Science in Computer Science specializing in Artificial Intelligence(Honors).",
    description:
      "Building polished software and web experiences. Experimenting with magical details in user interfaces.",
    pastExperience:
      "In the past I've developed various web applications and contributed to open source projects.",
    githubUrl: "https://github.com/mohtashammurshid",
    linkedinUrl: "https://www.linkedin.com/in/mohtashammurshid/",
    researchUrl: "https://www.researchgate.net/profile/Mohtasham-Madani",
    blogUrl: "https://blogwithm.netlify.app/blog",
    email: "mohtashammurshid@gmail.com",
    smarttexUrl: "https://smarttex.vercel.app",
  };

  const buildingProjects = [
    {
      title: "Smarttex AI",
      position: "Co-Founder",

      description:
        "Smarttex.ai is a platform for creating and managing AI-powered documents.",
      url: "https://smarttex.vercel.app",
      isExternal: true,
    },
  ];

  const projects = [
    {
      title: "Markdown to Docx",
      description: "Convert Markdown to Docx.<br />Over 1000 downloads on npm.",
      url: "https://npmjs.com/package/@mohtasham/md-to-docx",
      isExternal: true,
    },
    {
      title: "Checkmate",
      description:
        "Developed an AI-powered misinformation detection tool that analyzes content credibility across social media platforms.",
      url: "https://checkmate-imaginehack.vercel.app/",
      isExternal: true,
    },
  ];

  const writingProjects = [
    {
      title: "Technical Blog",
      description: "Thoughts on software development and design.",
      url: "https://blog.mohtasham.dev",
      isExternal: false,
    },
    {
      title: "Research",
      description: "My research work",
      url: "https://www.researchgate.net/profile/Mohtasham-Madani",
      isExternal: false,
    },
  ];

  const nowData = {
    content:
      "Developing skill through doing, guiltlessly exploring passion and interests, imbuing quality.",
    highlight: "everything around me is someone's life work",
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col min-h-screen py-16 px-4 justify-center">
        <Header {...headerData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Building Column */}
          <Section title="Building">
            {buildingProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </Section>

          {/* Projects Column */}
          <Section title="Projects" titleUrl="#projects">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </Section>

          {/* Writing Column */}
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
