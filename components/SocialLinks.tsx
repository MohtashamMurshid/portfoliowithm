import { Github, Linkedin } from "lucide-react";

interface SocialLinksProps {
  githubUrl: string;
  linkedinUrl: string;
}

const SocialLinks = ({ githubUrl, linkedinUrl }: SocialLinksProps) => {
  return (
    <div className="flex justify-center lg:justify-start items-center gap-8">
      <div className="w-12 h-px bg-accent"></div>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300 hover-lift"
      >
        <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        <span className="handwriting-casual text-sm">GitHub</span>
      </a>

      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors duration-300 hover-lift"
      >
        <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        <span className="handwriting-casual text-sm">LinkedIn</span>
      </a>

      <div className="w-12 h-px bg-accent"></div>
    </div>
  );
};

export default SocialLinks;
