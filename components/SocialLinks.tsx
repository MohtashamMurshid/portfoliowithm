import { Github, Linkedin } from "lucide-react";
import { SiX } from "react-icons/si";

interface SocialLinksProps {
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
}

const SocialLinks = ({ githubUrl, linkedinUrl, xUrl }: SocialLinksProps) => {
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
      <div className="flex flex-row items-center gap-2 mt-4 mb-4">
        <a
          href={xUrl}
          className="hover:underline"
          aria-label="X (@mohtashamdotdev)"
          rel="noopener noreferrer"
          target="_blank"
        >
          <SiX className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
