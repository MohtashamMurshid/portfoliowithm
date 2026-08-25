/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getArchiveProject } from "@/lib/archiveProjects";
import { formatBlogDate, getBlogPost } from "@/lib/blogPosts";
import { getProject } from "@/lib/projects";
import { ogImageSize, type OgImageType } from "@/lib/ogImage";

export const runtime = "nodejs";

const caveatFont = fetch(
  "https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SII.ttf",
).then((response) => response.arrayBuffer());

const manropeFont = fetch(
  "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F.ttf",
).then((response) => response.arrayBuffer());

type OgCard = {
  type: OgImageType;
  title: string;
  eyebrow: string;
  description: string;
  image?: string;
};

const pageCards: Record<string, Omit<OgCard, "type">> = {
  about: {
    title: "About Mohtasham",
    eyebrow: "Kashmir to Kuala Lumpur",
    description: "Founder of Oikina, AI engineer, open-source builder, and researcher.",
  },
  work: {
    title: "Selected work",
    eyebrow: "Software / AI / design",
    description: "Products, open-source tools, research, and experiments by Mohtasham Murshid Madani.",
    image: "/projects/oikina-pass.png",
  },
  blog: {
    title: "Notes from the workbench",
    eyebrow: "Writing",
    description: "Field notes on software, developer tools, artificial intelligence, and research.",
    image: "/blog/llm-disclosure-behavior.png",
  },
  books: {
    title: "The reading shelf",
    eyebrow: "Books",
    description: "Books I have read, kept, and occasionally argued with.",
    image: "/books/percy-jackson-1/cover.jpg",
  },
  boring: {
    title: "The plain portfolio",
    eyebrow: "No ceremony this time",
    description: "The conventional version of my work, skills, writing, and public repositories.",
  },
  "archive-1": {
    title: "The plain portfolio",
    eyebrow: "Portfolio archive / 01",
    description: "Dark mode, skills grids, GitHub stats, and everything in its proper box.",
  },
  "archive-2": {
    title: "Imaginary Infrastructure",
    eyebrow: "Portfolio archive / 02",
    description: "A field report about software, artificial intelligence, design, and unfinished work.",
    image: "/report/cover-observatory.png",
  },
};

function resolveCard(request: NextRequest): OgCard {
  const requestedType = request.nextUrl.searchParams.get("type");
  const type: OgImageType = ["home", "page", "blog", "project", "archive"].includes(
    requestedType ?? "",
  )
    ? (requestedType as OgImageType)
    : "home";
  const slug = request.nextUrl.searchParams.get("slug") ?? "";

  if (type === "blog") {
    const post = getBlogPost(slug);
    if (post) {
      return {
        type,
        title: post.title,
        eyebrow: `${post.category} / ${formatBlogDate(post.date)}`,
        description: post.description,
        image: post.image,
      };
    }
  }

  if (type === "project") {
    const project = getProject(slug);
    if (project) {
      return {
        type,
        title: project.name,
        eyebrow: `${project.category} / ${project.role}`,
        description: project.summary,
        image: project.image,
      };
    }
  }

  if (type === "archive") {
    const project = getArchiveProject(slug);
    if (project) {
      return {
        type,
        title: project.name,
        eyebrow: `${project.year} archive / ${project.category}`,
        description: project.summary,
      };
    }
  }

  if (type === "page" && pageCards[slug]) {
    return { type, ...pageCards[slug] };
  }

  return {
    type: "home",
    title: "Mohtasham Murshid Madani",
    eyebrow: "Founder and AI engineer",
    description: "Follow the interesting question.",
  };
}

function titleSize(title: string) {
  if (title.length > 72) return 45;
  if (title.length > 54) return 50;
  if (title.length > 36) return 57;
  return 68;
}

function accentFor(card: OgCard) {
  if (card.type === "blog") return "#b34b2c";
  if (card.type === "project") return "#2e6671";
  if (card.type === "archive") return "#a27320";
  return "#dd5b24";
}

function rotationFor(value: string) {
  const total = [...value].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return total % 2 === 0 ? "-2.5deg" : "2deg";
}

export async function GET(request: NextRequest) {
  const card = resolveCard(request);
  const origin = request.nextUrl.origin;
  const accent = accentFor(card);
  const [caveat, manrope] = await Promise.all([caveatFont, manropeFont]);
  const notebook = `${origin}/about/open-notebook-mohtasham-transparent.png`;
  const pen = `${origin}/about/orange-pen.png`;
  const contentImage = card.image ? `${origin}${card.image}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#123f35",
          color: "#2b2a24",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={`vertical-${index}`}
              style={{
                position: "absolute",
                left: 36 + index * 76,
                top: 0,
                width: 1,
                height: 630,
                background: "rgba(224, 207, 143, 0.24)",
              }}
            />
          ))}
          {Array.from({ length: 9 }, (_, index) => (
            <div
              key={`horizontal-${index}`}
              style={{
                position: "absolute",
                left: 0,
                top: 26 + index * 72,
                width: 1200,
                height: 1,
                background: "rgba(224, 207, 143, 0.24)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 11,
            display: "flex",
            border: "2px solid rgba(210, 191, 128, 0.58)",
            borderRadius: 28,
          }}
        />

        <img
          alt=""
          src={notebook}
          width="1120"
          height="747"
          style={{
            position: "absolute",
            left: 40,
            top: -56,
            width: 1120,
            height: 747,
            objectFit: "contain",
          }}
        />

        {contentImage ? (
          <div
            style={{
              position: "absolute",
              left: 176,
              top: 144,
              width: 338,
              height: 284,
              display: "flex",
              padding: 14,
              background: "#eee8dc",
              boxShadow: "0 14px 24px rgba(40, 24, 10, 0.28)",
              transform: `rotate(${rotationFor(card.title)})`,
            }}
          >
            <img
              alt=""
              src={contentImage}
              width="310"
              height="256"
              style={{ width: 310, height: 256, objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                left: 112,
                top: -24,
                width: 122,
                height: 42,
                display: "flex",
                background: "rgba(204, 151, 55, 0.68)",
                transform: "rotate(5deg)",
              }}
            />
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            left: 614,
            top: 132,
            width: 448,
            height: 390,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: accent,
              fontFamily: "Manrope",
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: "0.11em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 26,
                height: 3,
                display: "flex",
                borderRadius: 8,
                background: accent,
              }}
            />
            {card.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 15,
              maxWidth: 448,
              color: "#25251f",
              fontFamily: "Caveat",
              fontSize: titleSize(card.title),
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
          >
            {card.title}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              maxWidth: 408,
              color: "#4f4a40",
              fontFamily: "Manrope",
              fontSize: 19,
              fontWeight: 500,
              lineHeight: 1.38,
            }}
          >
            {card.description}
          </div>

          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 2,
              display: "flex",
              color: "#777064",
              fontFamily: "Manrope",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            mohtasham.dev / 2026
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 1024,
            top: 430,
            width: 62,
            height: 62,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `3px solid ${accent}`,
            color: accent,
            fontFamily: "Caveat",
            fontSize: 38,
            fontWeight: 600,
            transform: "rotate(-5deg)",
          }}
        >
          M
        </div>

        <img
          alt=""
          src={pen}
          width="72"
          height="280"
          style={{
            position: "absolute",
            left: 1082,
            top: 416,
            width: 72,
            height: 280,
            objectFit: "contain",
            transform: "rotate(20deg)",
          }}
        />
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Caveat", data: caveat, weight: 600, style: "normal" },
        { name: "Manrope", data: manrope, weight: 500, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
