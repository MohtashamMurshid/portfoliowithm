import DynamicHeading from "@/components/DynamicHeading";
import SocialLinks from "@/components/SocialLinks";

interface HeaderProps {
  names: string[];
  subtitle: string;
  description: string;
  pastExperience: string;
  githubUrl: string;
  linkedinUrl: string;
}

const Header = ({
  names,
  subtitle,
  description,
  pastExperience,
  githubUrl,
  linkedinUrl,
}: HeaderProps) => {
  return (
    <header className="mb-16">
      <DynamicHeading names={names} />
      <p className="text-gray-400 mt-2 text-sm italic">{subtitle}</p>
      <SocialLinks githubUrl={githubUrl} linkedinUrl={linkedinUrl} />
      <p className="text-l italic mb-4">{description}</p>
      <p className="text-gray-400">{pastExperience}</p>
    </header>
  );
};

export default Header;
