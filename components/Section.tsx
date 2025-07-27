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
      className="hover:text-accent transition-colors group flex flex-row items-center gap-2 mb-8"
    >
      <div className="flex items-center gap-3">
        <h2 className="manuscript-heading text-lg uppercase tracking-wider ink-shadow">
          {title}
        </h2>
        {position && (
          <span className="manuscript-text text-muted-foreground italic text-sm">
            {position}
          </span>
        )}
        <span className="inline-block transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-1">
          <ArrowUpRightIcon className="w-4 h-4" />
        </span>
      </div>
    </a>
  ) : (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <h2 className="manuscript-heading text-lg uppercase tracking-wider ink-shadow">
          {title}
        </h2>
        {position && (
          <span className="manuscript-text text-muted-foreground italic text-sm">
            {position}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="ornate-border parchment-texture p-8 relative hover-lift">
      <div className="manuscript-corner"></div>

      {/* Enhanced decorative line */}
      <div className="decorative-line mb-8"></div>

      {TitleComponent}
      <div className="space-y-8">{children}</div>

      {/* Enhanced decorative line */}
      <div className="decorative-line mt-8"></div>
    </div>
  );
};

export default Section;
