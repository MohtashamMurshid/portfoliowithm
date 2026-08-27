import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArchiveProjectCaseStudy from "@/components/work/ArchiveProjectCaseStudy";
import { archiveProjects, getArchiveProject } from "@/lib/archiveProjects";
import { getOgImage } from "@/lib/ogImage";
import { pageAlternates } from "@/lib/site";

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

  const ogImage = getOgImage(
    `${project.name}, an archived project by Mohtasham Murshid Madani`,
  );

  return {
    title: project.name,
    description: project.summary,
    alternates: pageAlternates(`/work/archive/${project.slug}`),
    openGraph: {
      title: project.name,
      description: project.summary,
      type: "article",
      url: `/work/archive/${project.slug}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.summary,
      images: [ogImage],
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
