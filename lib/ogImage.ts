export type OgImageType =
  | "page"
  | "blog"
  | "project"
  | "archive";

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export function getOgImageUrl(type: OgImageType, slug?: string) {
  const params = new URLSearchParams({ type });
  if (slug) params.set("slug", slug);
  // Refresh cached previews after fixing WebP decoding and blog cover cropping.
  params.set("v", "2");
  return `/og?${params.toString()}`;
}

export function getOgImage(type: OgImageType, alt: string, slug?: string) {
  return {
    url: getOgImageUrl(type, slug),
    ...ogImageSize,
    alt,
    type: "image/jpeg",
  };
}
