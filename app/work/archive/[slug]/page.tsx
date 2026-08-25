import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveProjectCaseStudy from "@/components/work/ArchiveProjectCaseStudy";
import { archiveProjects, getArchiveProject } from "@/lib/archiveProjects";

type ArchiveProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return archiveProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ArchiveProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getArchiveProject(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/archive/${project.slug}` },
    openGraph: {
      title: `${project.name} | Work archive`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ArchiveProjectPage({ params }: ArchiveProjectPageProps) {
  const { slug } = await params;
  const project = getArchiveProject(slug);
  if (!project) notFound();

  const position = archiveProjects.findIndex((item) => item.slug === project.slug);

  return (
    <ArchiveProjectCaseStudy
      project={project}
      position={position + 1}
      total={archiveProjects.length}
      previous={archiveProjects[position - 1]}
      next={archiveProjects[position + 1]}
    />
  );
}
