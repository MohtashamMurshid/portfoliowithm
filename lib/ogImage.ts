export type OgImageType =
  | "home"
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
  return `/og?${params.toString()}`;
}

export function getOgImage(type: OgImageType, alt: string, slug?: string) {
  return {
    url: getOgImageUrl(type, slug),
    ...ogImageSize,
    alt,
  };
}
