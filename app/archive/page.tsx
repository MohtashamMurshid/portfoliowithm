import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio archive",
  description: "Earlier versions of Mohtasham Murshid Madani's portfolio.",
};

const editions = [
  {
    number: "01",
    title: "The plain portfolio",
    description: "The useful, conventional version. Work, projects, skills, and public repositories.",
    href: "/archive/1",
  },
  {
    number: "02",
    title: "The field report",
    description: "A horizontal archival report from the Office of Imaginary Infrastructure.",
    href: "/archive/2",
  },
];

export default function ArchivePage() {
  return (
    <main className="min-h-screen bg-[#f3f0e8] px-6 py-8 text-[#24231f] md:px-12">
      <nav className="mb-24 flex items-center justify-between text-sm">
        <Link href="/" className="font-semibold no-underline">Mohtasham</Link>
        <Link href="/" className="underline underline-offset-4">Back home</Link>
      </nav>
      <header className="mx-auto mb-14 max-w-5xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-[#8a857b]">Portfolio archive</p>
        <h1 className="max-w-3xl text-6xl font-normal leading-[0.92] tracking-[-0.04em] md:text-8xl">Previous lives of this website.</h1>
      </header>
      <section className="mx-auto grid max-w-5xl gap-px overflow-hidden border border-black/15 bg-black/15 md:grid-cols-2">
        {editions.map((edition) => (
          <Link key={edition.number} href={edition.href} className="group min-h-80 bg-[#f3f0e8] p-7 no-underline transition-colors hover:bg-white md:p-9">
            <span className="font-mono text-xs text-[#9b5740]">ARCHIVE / {edition.number}</span>
            <h2 className="mt-24 text-4xl font-normal tracking-[-0.025em] group-hover:underline group-hover:underline-offset-8">{edition.title}</h2>
            <p className="mt-4 max-w-md font-sans leading-relaxed text-[#68645d]">{edition.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
