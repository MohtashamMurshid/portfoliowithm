/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import sharp from "sharp";
import { getArchiveProject } from "@/lib/archiveProjects";
import { formatBlogDate, getBlogPost } from "@/lib/blogPosts";
import { ogImageSize, type OgImageType } from "@/lib/ogImage";
import { getProject } from "@/lib/projects";

export const runtime = "nodejs";

const maxJpegBytes = 100 * 1024;
const jpegQualities = [78, 70, 62, 54, 46, 38, 30, 22, 14, 6, 1] as const;

async function encodeJpegUnderLimit(png: ArrayBuffer) {
  const input = Buffer.from(png);

  for (const quality of jpegQualities) {
    const jpeg = await sharp(input)
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();

    if (jpeg.byteLength < maxJpegBytes) return jpeg;
  }

  throw new Error(`Open Graph image exceeds ${maxJpegBytes} bytes at minimum quality.`);
}

const caveatFont = fetch(
  "https://fonts.gstatic.com/s/caveat/v23/WnznHAc5bAfYB2QRah7pcpNvOx-pjSx6SII.ttf",
).then((response) => response.arrayBuffer());

const manropeFont = fetch(
  "https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F.ttf",
).then((response) => response.arrayBuffer());

const monoFont = fetch(
  "https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJ8lc.ttf",
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
    image: "/about/mountain-portrait.jpg",
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
    image: "/projects/getdesign.png",
  },
  "archive-1": {
    title: "The plain portfolio",
    eyebrow: "Portfolio archive / 01",
    description: "Dark mode, skills grids, GitHub stats, and everything in its proper box.",
    image: "/projects/getdesign.png",
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
  const type: OgImageType = ["page", "blog", "project", "archive"].includes(
    requestedType ?? "",
  )
    ? (requestedType as OgImageType)
    : "page";
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

  if (pageCards[slug]) return { type: "page", ...pageCards[slug] };

  return {
    type: "page",
    title: "Mohtasham Murshid Madani",
    eyebrow: "Field note / 2026",
    description: "Software, artificial intelligence, design, and the interesting questions between them.",
  };
}

function hash(value: string) {
  return [...value].reduce((total, character) => total + character.charCodeAt(0), 0);
}

function titleSize(title: string) {
  if (title.length > 76) return 47;
  if (title.length > 58) return 52;
  if (title.length > 40) return 58;
  return 68;
}

function accentFor(type: OgImageType) {
  if (type === "blog") return "#b64f2c";
  if (type === "project") return "#276474";
  if (type === "archive") return "#9b701d";
  return "#d85b28";
}

export async function GET(request: NextRequest) {
  const card = resolveCard(request);
  const origin = request.nextUrl.origin;
  const accent = accentFor(card.type);
  const serial = String((hash(card.title) % 89) + 10).padStart(2, "0");
  const [caveat, manrope, mono] = await Promise.all([caveatFont, manropeFont, monoFont]);
  const template = `${origin}/og/field-card-template.png`;
  const contentImage = card.image ? `${origin}${card.image}` : null;

  const pngResponse = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          color: "#292a24",
          background: "#123f35",
        }}
      >
        <img
          alt=""
          src={template}
          width="1200"
          height="630"
          style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            left: 151,
            top: 112,
            width: 594,
            height: 410,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              color: accent,
              fontFamily: "IBM Plex Mono",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 28, height: 3, display: "flex", background: accent }} />
            {card.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              maxWidth: 594,
              color: "#24251f",
              fontFamily: "Caveat",
              fontSize: titleSize(card.title),
              fontWeight: 600,
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
            }}
          >
            {card.title}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              maxWidth: 540,
              color: "#504d43",
              fontFamily: "Manrope",
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.42,
            }}
          >
            {card.description}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 151,
            top: 516,
            display: "flex",
            alignItems: "center",
            gap: 11,
            color: "#6e685b",
            fontFamily: "IBM Plex Mono",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.055em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 7, height: 7, display: "flex", borderRadius: 99, background: accent }} />
          Mohtasham.dev / {card.type} record / {serial}
        </div>

        {contentImage ? (
          <img
            alt=""
            src={contentImage}
            width="254"
            height="270"
            style={{
              position: "absolute",
              left: 791,
              top: 167,
              width: 254,
              height: 270,
              objectFit: "cover",
              transform: "rotate(1.6deg)",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              left: 791,
              top: 167,
              width: 254,
              height: 270,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: accent,
              fontFamily: "Caveat",
              fontSize: 92,
              fontWeight: 600,
              transform: "rotate(1.6deg)",
            }}
          >
            {card.title.slice(0, 1)}
          </div>
        )}
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Caveat", data: caveat, weight: 600, style: "normal" },
        { name: "Manrope", data: manrope, weight: 500, style: "normal" },
        { name: "IBM Plex Mono", data: mono, weight: 500, style: "normal" },
      ],
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );

  const jpeg = await encodeJpegUnderLimit(await pngResponse.arrayBuffer());

  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(jpeg.byteLength),
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
