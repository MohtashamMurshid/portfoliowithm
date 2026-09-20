import "server-only";

import { blogPosts } from "@/lib/blogPosts";
import { projects } from "@/lib/projects";
import type {
  RoutePrefetchImage,
  RoutePrefetchTarget,
} from "@/lib/routeImagePrefetchTypes";
import manifest from "@/lib/workImageManifest.json";
import {
  featuredWorkImageSizes,
  gridWorkImageSizes,
} from "@/lib/workImageSizing";

type WorkImageSource = keyof typeof manifest;

function isWorkImageSource(src: string): src is WorkImageSource {
  return src in manifest;
}

function getWorkThumbnail(
  src: WorkImageSource,
  sizes: string,
): RoutePrefetchImage {
  const image = manifest[src];

  return {
    src: image.variants[1].src,
    srcSet: image.variants
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(", "),
    sizes,
  };
}

const featuredBlogPost = [...blogPosts].sort((left, right) =>
  right.date.localeCompare(left.date),
)[0];

const workIndexImages = projects.flatMap((project) => {
  if (!isWorkImageSource(project.image)) return [];

  return [
    getWorkThumbnail(
      project.image,
      project.slug === "oikina"
        ? featuredWorkImageSizes
        : gridWorkImageSizes,
    ),
  ];
});

const workDetailTargets: RoutePrefetchTarget[] = projects.flatMap((project) => {
  if (!isWorkImageSource(project.image)) return [];

  const image = manifest[project.image];

  return [
    {
      href: `/work/${project.slug}`,
      images: [
        {
          src: project.image,
          width: image.width,
          height: image.height,
          sizes:
            project.slug === "markdown-to-docx"
              ? "(max-width: 760px) 60vw, 420px"
              : "(max-width: 760px) 72vw, 520px",
        },
      ],
    },
  ];
});

const blogDetailTargets: RoutePrefetchTarget[] = blogPosts.map((post) => ({
  href: `/blog/${post.slug}`,
  images: [
    {
      src: post.image,
      fill: true,
      sizes: "(max-width: 860px) 100vw, 832px",
    },
  ],
}));

export const routeImagePrefetchTargets: RoutePrefetchTarget[] = [
  {
    href: "/work",
    images: workIndexImages,
    preloadWhenIdle: true,
  },
  {
    href: "/blog",
    images: [
      {
        src: featuredBlogPost.image,
        fill: true,
        sizes: "(max-width: 860px) 100vw, 812px",
      },
    ],
    preloadWhenIdle: true,
  },
  ...workDetailTargets,
  ...blogDetailTargets,
];
