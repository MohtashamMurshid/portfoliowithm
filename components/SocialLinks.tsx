import { Github, Linkedin } from "lucide-react";

interface SocialLinksProps {
  githubUrl: string;
  linkedinUrl: string;
}

const SocialLinks = ({ githubUrl, linkedinUrl }: SocialLinksProps) => {
  return (
    <div className="flex flex-row items-center gap-2 mb-4">
      <div className="flex flex-row items-center gap-2 mt-4 mb-4">
        <a href={githubUrl} className="hover:underline">
          <Github className="w-4 h-4" />
        </a>
      </div>
      <div className="flex flex-row items-center gap-2 mt-4 mb-4">
        <a href={linkedinUrl} className="hover:underline">
          <Linkedin className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
