import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventCaseStudy from "@/components/events/EventCaseStudy";
import { eventCaseStudies, getEventCaseStudy } from "@/lib/eventCaseStudies";
import { pageAlternates, siteUrl } from "@/lib/site";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return eventCaseStudies.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventCaseStudy(slug);

  if (!event) return {};

  const image = `${siteUrl}${event.image}`;

  return {
    title: { absolute: event.title },
    description: event.seoDescription,
    alternates: pageAlternates(`/events/${event.slug}`),
    openGraph: {
      title: event.title,
      description: event.seoDescription,
      type: "article",
      url: `/events/${event.slug}`,
      publishedTime: event.datePublished,
      modifiedTime: event.dateModified,
      authors: ["Mohtasham Murshid Madani"],
      images: [{ url: image, alt: event.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.seoDescription,
      images: [image],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventCaseStudy(slug);
  if (!event) notFound();

  const index = eventCaseStudies.findIndex((candidate) => candidate.slug === event.slug);
  const previous = index > 0 ? eventCaseStudies[index - 1] : undefined;
  const next = index < eventCaseStudies.length - 1 ? eventCaseStudies[index + 1] : undefined;

  return <EventCaseStudy event={event} previous={previous} next={next} />;
}
