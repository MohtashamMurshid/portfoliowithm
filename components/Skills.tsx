"use client";
import GithubInfo from "./GithubInfo";
import MaxWidthWrapper from "./MaxWidthWrapper";
import * as motion from "motion/react-client";
import { useState } from "react";
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
import {
  FaDatabase,
  FaJava,
  FaAws,
  FaReact,
  FaCode,
  FaTools,
} from "react-icons/fa";
import { TbBrandVscode } from "react-icons/tb";
import { DiReact } from "react-icons/di";
import { RiRobot2Fill } from "react-icons/ri";
import { GiArtificialIntelligence, GiBrain } from "react-icons/gi";

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  description?: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("Languages");

  const skillCategories: SkillCategory[] = [
    {
      name: "Languages",
      skills: [
        {
          name: "JavaScript",
          level: 90,
          icon: <SiJavascript className="text-[#F7DF1E]" />,
        },
        {
          name: "TypeScript",
          level: 85,
          icon: <SiTypescript className="text-[#3178C6]" />,
        },
        {
          name: "Python",
          level: 80,
          icon: <SiPython className="text-[#3776AB]" />,
        },
        {
          name: "Java",
          level: 75,
          icon: <FaJava className="text-[#007396]" />,
        },
        {
          name: "C/C++",
          level: 70,
          icon: <SiCplusplus className="text-[#00599C]" />,
        },
        {
          name: "HTML/CSS",
          level: 95,
          icon: <SiHtml5 className="text-[#E34F26]" />,
        },
        {
          name: "Kotlin",
          level: 60,
          icon: <SiKotlin className="text-[#7F52FF]" />,
          description: "Beginner",
        },
      ],
    },
    {
      name: "Frameworks",
      skills: [
        {
          name: "React",
          level: 90,
          icon: <SiReact className="text-[#61DAFB]" />,
        },
        { name: "Next.js", level: 88, icon: <SiNextdotjs /> },
        {
          name: "Node.js",
          level: 85,
          icon: <SiNodedotjs className="text-[#339933]" />,
        },
        { name: "Express", level: 82, icon: <SiExpress /> },
        {
          name: "TailwindCSS",
          level: 92,
          icon: <SiTailwindcss className="text-[#06B6D4]" />,
        },
        {
          name: "Django",
          level: 70,
          icon: <SiDjango className="text-[#092E20]" />,
        },
        {
          name: "React Native",
          level: 75,
          icon: <DiReact className="text-[#61DAFB]" />,
          description: "Intermediate",
        },
        {
          name: "Expo",
          level: 75,
          icon: <FaReact className="text-[#000020]" />,
          description: "Intermediate",
        },
        {
          name: "FastAPI",
          level: 65,
          icon: <SiFastapi className="text-[#009688]" />,
          description: "Beginner",
        },
        {
          name: "Android Dev",
          level: 60,
          icon: <SiAndroid className="text-[#3DDC84]" />,
          description: "Beginner",
        },
      ],
    },
    {
      name: "Tools",
      skills: [
        { name: "Git", level: 88, icon: <SiGit className="text-[#F05032]" /> },
        {
          name: "Docker",
          level: 75,
          icon: <SiDocker className="text-[#2496ED]" />,
        },
        { name: "AWS", level: 70, icon: <FaAws className="text-[#FF9900]" /> },
        {
          name: "Firebase",
          level: 80,
          icon: <SiFirebase className="text-[#FFCA28]" />,
        },
        {
          name: "VS Code",
          level: 95,
          icon: <TbBrandVscode className="text-[#007ACC]" />,
        },
        { name: "Figma", level: 75, icon: <SiFigma /> },
        {
          name: "NPM",
          level: 85,
          icon: <SiNpm className="text-[#CB3837]" />,
          description: "Intermediate",
        },
        {
          name: "Motion",
          level: 80,
          icon: <FaTools className="text-gray-700 dark:text-gray-300" />,
        },
        {
          name: "PostgreSQL",
          level: 78,
          icon: <SiPostgresql className="text-[#4169E1]" />,
        },
        {
          name: "Cursor",
          level: 85,
          icon: <FaCode className="text-gray-800 dark:text-gray-200" />,
        },
        {
          name: "Neon DB",
          level: 70,
          icon: <FaDatabase className="text-green-400" />,
        },
        { name: "Vercel", level: 85, icon: <SiVercel /> },
        {
          name: "Cloudflare",
          level: 75,
          icon: <SiCloudflare className="text-[#F38020]" />,
        },
        { name: "GitHub", level: 90, icon: <SiGithub /> },
      ],
    },
    {
      name: "AI & ML",
      skills: [
        {
          name: "Generative AI",
          level: 85,
          icon: <GiArtificialIntelligence className="text-purple-500" />,
        },
        {
          name: "AI Agents",
          level: 80,
          icon: <GiBrain className="text-purple-400" />,
        },
        { name: "OpenAI", level: 85, icon: <SiOpenai /> },
        {
          name: "TensorFlow",
          level: 65,
          icon: <SiTensorflow className="text-[#FF6F00]" />,
        },
        {
          name: "PyTorch",
          level: 60,
          icon: <SiPytorch className="text-[#EE4C2C]" />,
        },
        { name: "Hugging Face", level: 75, icon: <SiHuggingface /> },
        {
          name: "LangChain",
          level: 70,
          icon: <RiRobot2Fill className="text-green-500" />,
        },
      ],
    },
    {
      name: "Soft Skills",
      skills: [
        {
          name: "Problem Solving",
          level: 95,
          icon: <span className="text-xl">🧩</span>,
        },
        {
          name: "Communication",
          level: 90,
          icon: <span className="text-xl">💬</span>,
        },
        {
          name: "Teamwork",
          level: 92,
          icon: <span className="text-xl">👥</span>,
        },
        {
          name: "Time Management",
          level: 85,
          icon: <span className="text-xl">⏱️</span>,
        },
        {
          name: "Leadership",
          level: 80,
          icon: <span className="text-xl">🚀</span>,
        },
        {
          name: "Adaptability",
          level: 88,
          icon: <span className="text-xl">🔄</span>,
        },
      ],
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="py-4 sm:py-8 md:py-16">
        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            Here are my technical skills and proficiency levels across different
            domains. I continuously improve these skills through hands-on
            projects and learning new technologies.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  activeCategory === category.name
                    ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                    : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skillCategories
              .find((category) => category.name === activeCategory)
              ?.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-white dark:bg-gray-900/50 backdrop-blur-sm p-5 rounded-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-gray-300/50 dark:hover:border-gray-700/50 transition-all shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">{skill.icon}</div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </h3>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>

                  {skill.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-2 mt-0.5">
                      {skill.description}
                    </p>
                  )}

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-800 dark:bg-gray-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* GitHub Projects Section */}
        <div className="mt-16">
          <GithubInfo />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Skills;
