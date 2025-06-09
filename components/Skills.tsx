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
          icon: (
            <SiJavascript className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "TypeScript",
          icon: (
            <SiTypescript className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "Python",
          icon: <SiPython className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Java",
          icon: <FaJava className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "C/C++",
          icon: <SiCplusplus className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "HTML/CSS",
          icon: <SiHtml5 className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Kotlin",
          icon: <SiKotlin className="text-2xl text-black dark:text-white" />,
        },
      ],
    },
    {
      name: "Frameworks",
      skills: [
        {
          name: "React",
          icon: <SiReact className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Next.js",
          icon: <SiNextdotjs className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Node.js",
          icon: <SiNodedotjs className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Express",
          icon: <SiExpress className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "TailwindCSS",
          icon: (
            <SiTailwindcss className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "Django",
          icon: <SiDjango className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "React Native",
          icon: <DiReact className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Expo",
          icon: <FaReact className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "FastAPI",
          icon: <SiFastapi className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Android Dev",
          icon: <SiAndroid className="text-2xl text-black dark:text-white" />,
        },
      ],
    },
    {
      name: "Tools",
      skills: [
        {
          name: "Git",
          icon: <SiGit className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Docker",
          icon: <SiDocker className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "AWS",
          icon: <FaAws className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Firebase",
          icon: <SiFirebase className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "VS Code",
          icon: (
            <TbBrandVscode className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "Figma",
          icon: <SiFigma className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "NPM",
          icon: <SiNpm className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Motion",
          icon: <FaTools className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "PostgreSQL",
          icon: (
            <SiPostgresql className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "Cursor",
          icon: <FaCode className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Vercel",
          icon: <SiVercel className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Cloudflare",
          icon: (
            <SiCloudflare className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "GitHub",
          icon: <SiGithub className="text-2xl text-black dark:text-white" />,
        },
      ],
    },
    {
      name: "AI & ML",
      skills: [
        {
          name: "Generative AI",
          icon: (
            <GiArtificialIntelligence className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "AI Agents",
          icon: <GiBrain className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "OpenAI",
          icon: <SiOpenai className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "TensorFlow",
          icon: (
            <SiTensorflow className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "PyTorch",
          icon: <SiPytorch className="text-2xl text-black dark:text-white" />,
        },
        {
          name: "Hugging Face",
          icon: (
            <SiHuggingface className="text-2xl text-black dark:text-white" />
          ),
        },
        {
          name: "LangChain",
          icon: (
            <RiRobot2Fill className="text-2xl text-black dark:text-white" />
          ),
        },
      ],
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="py-16 px-4">
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-4 text-gray-900 dark:text-white">
            Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            A collection of my technical and soft skills, continuously refined
            through practice and new projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {skillCategories.map((category) => (
            <Section key={category.name} title={category.name}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center text-center gap-2"
                  >
                    <div className="p-3 ">{skill.icon}</div>
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
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
