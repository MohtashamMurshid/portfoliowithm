import { ArrowUpRightIcon } from "lucide-react";
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  titleUrl?: string;
  children: ReactNode;
  position?: string;
}

const Section = ({ title, titleUrl, children, position }: SectionProps) => {
  const TitleComponent = titleUrl ? (
    <a
      href={titleUrl}
      className="hover:text-gray-400 transition-colors group flex flex-row items-center gap-2 mb-8"
    >
      <h2 className="text-sm uppercase tracking-wider">{title}</h2>
      {position && <span className="text-gray-400">{position}</span>}
      <span className="inline-block transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-1">
        <ArrowUpRightIcon className="w-3 h-3" />
      </span>
    </a>
  ) : (
    <div className="mb-8">
      <h2 className="text-sm uppercase tracking-wider">{title}</h2>
      {position && <span className="text-gray-400">{position}</span>}
    </div>
  );

  return (
    <div>
      {TitleComponent}
      <div className="space-y-8">{children}</div>
    </div>
  );
};

export default Section;
