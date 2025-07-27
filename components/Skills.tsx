"use client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiDjango,
  SiGit,
  SiDocker,
  SiFirebase,
  SiFigma,
  SiKotlin,
  SiAndroid,
  SiFastapi,
  SiNpm,
  SiPostgresql,
  SiVercel,
  SiCloudflare,
  SiGithub,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
  SiHuggingface,
} from "react-icons/si";
import { FaJava, FaAws, FaReact, FaCode, FaTools } from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";
import { DiReact } from "react-icons/di";
import { RiRobot2Fill } from "react-icons/ri";
import { GiArtificialIntelligence, GiBrain } from "react-icons/gi";
import Section from "./Section";

interface Skill {
  name: string;
  icon: React.ReactNode;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      skills: [
        {
          name: "JavaScript",
          icon: <SiJavascript className="text-2xl text-foreground" />,
        },
        {
          name: "TypeScript",
          icon: <SiTypescript className="text-2xl text-foreground" />,
        },
        {
          name: "Python",
          icon: <SiPython className="text-2xl text-foreground" />,
        },
        {
          name: "Java",
          icon: <FaJava className="text-2xl text-foreground" />,
        },
        {
          name: "C/C++",
          icon: <SiCplusplus className="text-2xl text-foreground" />,
        },
        {
          name: "HTML/CSS",
          icon: <SiHtml5 className="text-2xl text-foreground" />,
        },
        {
          name: "Kotlin",
          icon: <SiKotlin className="text-2xl text-foreground" />,
        },
      ],
    },
    {
      name: "Frameworks",
      skills: [
        {
          name: "React",
          icon: <SiReact className="text-2xl text-foreground" />,
        },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="text-2xl text-foreground" />,
        },
        {
          name: "Node.js",
          icon: <SiNodedotjs className="text-2xl text-foreground" />,
        },
        {
          name: "Express",
          icon: <SiExpress className="text-2xl text-foreground" />,
        },
        {
          name: "TailwindCSS",
          icon: <SiTailwindcss className="text-2xl text-foreground" />,
        },
        {
          name: "Django",
          icon: <SiDjango className="text-2xl text-foreground" />,
        },
        {
          name: "React Native",
          icon: <DiReact className="text-2xl text-foreground" />,
        },
        {
          name: "Expo",
          icon: <FaReact className="text-2xl text-foreground" />,
        },
        {
          name: "FastAPI",
          icon: <SiFastapi className="text-2xl text-foreground" />,
        },
        {
          name: "Android Dev",
          icon: <SiAndroid className="text-2xl text-foreground" />,
        },
      ],
    },
    {
      name: "Tools",
      skills: [
        {
          name: "Git",
          icon: <SiGit className="text-2xl text-foreground" />,
        },
        {
          name: "Docker",
          icon: <SiDocker className="text-2xl text-foreground" />,
        },
        {
          name: "AWS",
          icon: <FaAws className="text-2xl text-foreground" />,
        },
        {
          name: "Firebase",
          icon: <SiFirebase className="text-2xl text-foreground" />,
        },
        {
          name: "VS Code",
          icon: <TbBrandVscode className="text-2xl text-foreground" />,
        },
        {
          name: "Figma",
          icon: <SiFigma className="text-2xl text-foreground" />,
        },
        {
          name: "NPM",
          icon: <SiNpm className="text-2xl text-foreground" />,
        },
        {
          name: "Motion",
          icon: <FaTools className="text-2xl text-foreground" />,
        },
        {
          name: "PostgreSQL",
          icon: <SiPostgresql className="text-2xl text-foreground" />,
        },
        {
          name: "Cursor",
          icon: <FaCode className="text-2xl text-foreground" />,
        },
        {
          name: "Vercel",
          icon: <SiVercel className="text-2xl text-foreground" />,
        },
        {
          name: "Cloudflare",
          icon: <SiCloudflare className="text-2xl text-foreground" />,
        },
        {
          name: "GitHub",
          icon: <SiGithub className="text-2xl text-foreground" />,
        },
      ],
    },
    {
      name: "AI & ML",
      skills: [
        {
          name: "Generative AI",
          icon: (
            <GiArtificialIntelligence className="text-2xl text-foreground" />
          ),
        },
        {
          name: "AI Agents",
          icon: <GiBrain className="text-2xl text-foreground" />,
        },
        {
          name: "OpenAI",
          icon: <SiOpenai className="text-2xl text-foreground" />,
        },
        {
          name: "TensorFlow",
          icon: <SiTensorflow className="text-2xl text-foreground" />,
        },
        {
          name: "PyTorch",
          icon: <SiPytorch className="text-2xl text-foreground" />,
        },
        {
          name: "Hugging Face",
          icon: <SiHuggingface className="text-2xl text-foreground" />,
        },
        {
          name: "LangChain",
          icon: <RiRobot2Fill className="text-2xl text-foreground" />,
        },
      ],
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="py-16 px-4">
        <div className="ornate-border parchment-texture p-8 mb-12 relative">
          <div className="manuscript-corner"></div>

          {/* Decorative line */}
          <div className="decorative-line mb-6"></div>

          <div className="text-center">
            <h2 className="manuscript-heading text-3xl font-semibold mb-4 ink-shadow">
              Skills & Mastery
            </h2>
            <p className="manuscript-text text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A collection of my technical and soft skills, continuously refined
              through practice and new projects.
            </p>
          </div>

          {/* Decorative line */}
          <div className="decorative-line mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {skillCategories.map((category) => (
            <Section key={category.name} title={category.name}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center text-center gap-3 p-3 hover:bg-accent/5 rounded-lg transition-colors duration-300"
                  >
                    <div className="p-2 hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <p className="manuscript-text text-xs font-medium text-muted-foreground">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Skills;
