import { ArrowUpRightIcon } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  url?: string;
  isExternal?: boolean;
  position?: string;
}

const ProjectCard = ({
  title,
  description,
  url = "#",
  isExternal = false,
  position,
}: ProjectCardProps) => {
  const linkProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a href={url} {...linkProps} className="block group">
      <div className="border-l-2 border-accent pl-6 py-4 hover:border-primary transition-all duration-300 hover-lift">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="manuscript-heading text-base font-semibold group-hover:text-accent transition-colors ink-shadow">
            {title}
          </h3>
          <span className="inline-block transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-1">
            <ArrowUpRightIcon className="w-4 h-4" />
          </span>
        </div>

        {position && (
          <p className="manuscript-text text-muted-foreground italic text-xs mb-3">
            {position}
          </p>
        )}

        <p
          className="manuscript-text text-muted-foreground text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {/* Enhanced decorative dot */}
        <div className="w-1.5 h-1.5 bg-accent rounded-full mt-4 opacity-60 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </a>
  );
};

export default ProjectCard;
