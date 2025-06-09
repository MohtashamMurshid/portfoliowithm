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
      <div className="flex items-center gap-2">
        <h3 className="font-medium mb-2 group-hover:text-gray-400 transition-colors">
          {title}
        </h3>
        <span className="inline-block transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-1">
          <ArrowUpRightIcon className="w-3 h-3" />
        </span>
      </div>
      {position && <p className="text-gray-400 text-xs mb-1">{position}</p>}
      <p
        className="text-gray-400 text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </a>
  );
};

export default ProjectCard;
