import type { Metadata } from "next";
import Link from "next/link";
import EventCollage from "@/components/events/EventCollage";
import { getOgImage } from "@/lib/ogImage";
import { pageAlternates } from "@/lib/site";
import styles from "./events.module.css";

const description =
  "Events hosted and supported by Mohtasham Murshid Madani, a Cursor Ambassador and member of the Malaysian AI Residency.";
const eventsOgImage = getOgImage("page", "Events with Mohtasham Murshid Madani", "events");

export const metadata: Metadata = {
  title: "Events",
  description,
  alternates: pageAlternates("/events"),
  openGraph: {
    title: "Events with Mohtasham",
    description,
    url: "/events",
    images: [eventsOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events with Mohtasham",
    description,
    images: [eventsOgImage],
  },
};

const hostedEvents = [
  {
    id: "grok-bot-kl",
    title: "Grok Bot Meetup Kuala Lumpur",
    date: "19 September 2026",
    place: "Kuala Lumpur",
    href: "https://luma.com/user/mohtasham",
    external: true,
    image: "/events/grok-bot-meetup.webp",
    imageAlt: "Poster for the Grok Bot Kuala Lumpur Meetup.",
  },
  {
    id: "supabase-first-move",
    title: "Supabase's First Move: Malaysian AI Show & Tell",
    date: "11 August 2026",
    place: "500 Global, Southeast Asia",
    href: "/events/supabase-first-move",
    image: "/events/supabase-first-move.webp",
    imageAlt: "A full room at Supabase's Malaysian AI Show and Tell event.",
  },
  {
    id: "cursor-kashmir",
    title: "Cursor Hackathon Kashmir",
    date: "28 March 2026",
    place: "NIT Srinagar",
    href: "/events/cursor-hackathon-kashmir",
    image: "/events/cursor-hackathon-kashmir.webp",
    imageAlt: "Builders gathered for Cursor Hackathon Kashmir at NIT Srinagar.",
  },
  {
    id: "hackerdorm-summit",
    title: "AI Hackerdorm Student Builder Summit",
    date: "22 November 2025",
    place: "Taylor's University Lakeside Campus",
    href: "/events/ai-hackerdorm-builder-summit",
    image: "/events/ai-hackerdorm-builder-summit.webp",
    imageAlt: "Organizers and builders at the AI Hackerdorm Student Builder Summit.",
  },
] as const;

const participationEvents = [
  {
    id: "cursor-anthropic-malaysia",
    title: "Cursor x Anthropic Hackathon Malaysia",
    href: "https://luma.com/cursor-hack-my",
  },
  {
    id: "aimto-2026",
    title: "AI Malaysia Takeover 2026",
    href: "https://www.aimto.my/",
  },
] as const;

export default function EventsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1>Events</h1>
        <p className={styles.intro}>
          I am part of the{" "}
          <a href="https://www.malaysian.ai/residency" target="_blank" rel="noreferrer">
            Malaysian AI Residency
          </a>{" "}
          and I am a{" "}
          <a href="https://cursor.com/ambassadors" target="_blank" rel="noreferrer">
            Cursor Ambassador
          </a>
          . Through Cursor, I helped run Cursor x Anthropic Hackathon Malaysia. I later
          organized Cursor Hackathon Kashmir back home, and I am now hosting Grok Bot
          Meetup Kuala Lumpur.
        </p>

        <div className={styles.featuredHeading}>
          <h2>Hosted by me</h2>
          <span>Meetups and builder sessions I hosted or co-hosted.</span>
        </div>
        <EventCollage events={hostedEvents} />
      </header>

      <section className={styles.section} aria-labelledby="part-of-title">
        <div className={styles.sectionHeading}>
          <h2 id="part-of-title">Part of</h2>
        </div>
        <div className={styles.participationList}>
          {participationEvents.map((event) => (
            <a href={event.href} target="_blank" rel="noreferrer" key={event.id}>
              <span>{event.title}</span>
              <small>Event page ↗</small>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/about">← Back to about</Link>
      </footer>
    </main>
  );
}
