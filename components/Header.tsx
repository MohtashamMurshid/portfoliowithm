import DynamicHeading from "@/components/DynamicHeading";
import SocialLinks from "@/components/SocialLinks";

interface HeaderProps {
  primaryName: string;
  names: string[];
  subtitle: string;
  description: string;
  pastExperience: string;
  githubUrl: string;
  linkedinUrl: string;
  xUrl: string;
}

const Header = ({
  primaryName,
  names,
  subtitle,
  description,
  pastExperience,
  githubUrl,
  linkedinUrl,
  xUrl,
}: HeaderProps) => {
  return (
    <header className="mb-16">
      <DynamicHeading primaryName={primaryName} names={names} />
      <p className="text-gray-400 mt-2 text-sm italic">{subtitle}</p>
      <SocialLinks githubUrl={githubUrl} linkedinUrl={linkedinUrl} xUrl={xUrl} />
      <p className="text-l italic mb-4">{description}</p>
      <p className="text-gray-400">{pastExperience}</p>
    </header>
  );
};

export default Header;
