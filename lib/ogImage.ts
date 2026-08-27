export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

/** File-convention homepage card. Nested routes cannot inherit that file, so metadata points here instead of `/og`. */
export const defaultOgImagePath = "/opengraph-image.jpg";

export function getOgImage(alt: string) {
  return {
    url: defaultOgImagePath,
    ...ogImageSize,
    alt,
    type: "image/jpeg",
  };
}
