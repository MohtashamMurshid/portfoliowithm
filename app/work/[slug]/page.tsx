import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import GitHubProjectCaseStudy from "@/components/work/GitHubProjectCaseStudy";
import MarkdownToDocxCaseStudy from "@/components/work/MarkdownToDocxCaseStudy";
import { githubCaseStudies } from "@/lib/githubCaseStudies";
import { getProject, projects } from "@/lib/projects";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: project.name,
    description: `${project.summary} ${project.description}`,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — Office of Imaginary Infrastructure`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  if (project.slug === "markdown-to-docx") {
    return <MarkdownToDocxCaseStudy project={project} />;
  }

  const githubCaseStudy = githubCaseStudies[project.slug];
  if (githubCaseStudy) {
    return <GitHubProjectCaseStudy project={githubCaseStudy} />;
  }

  return (
    <main className="work-file">
      <nav className="work-file-nav" aria-label="Project dossier navigation">
        <Link href="/"><ArrowLeft aria-hidden="true" /> Return to field report</Link>
        <span>{project.register}</span>
      </nav>

      <header className="work-file-header">
        <div>
          <p className="work-file-kicker">{project.eyebrow}</p>
          <p className="work-file-register">{project.category}</p>
        </div>
        <div>
          <h1>{project.name}</h1>
          <p className="work-file-summary">{project.summary}</p>
        </div>
      </header>

      <section className="work-file-body" aria-labelledby="dossier-heading">
        <dl className="work-file-facts">
          <div><dt>Registry</dt><dd>{project.register}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Classification</dt><dd>{project.category}</dd></div>
          <div><dt>Status</dt><dd>Public record</dd></div>
        </dl>

        <div className="work-file-copy">
          <p id="dossier-heading">{project.description}</p>
          <div className="work-file-evidence" aria-label="Project capabilities">
            {project.evidence.map((item) => <span key={item}>{item}</span>)}
          </div>
          <a className="work-file-link" href={project.url} target="_blank" rel="noreferrer">
            Visit public project <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.description,
            url: `https://mohtasham.dev/work/${project.slug}`,
            sameAs: project.url,
            creator: {
              "@type": "Person",
              name: "Mohtasham Murshid Madani",
              url: "https://mohtasham.dev",
            },
          }),
        }}
      />
    </main>
  );
}
