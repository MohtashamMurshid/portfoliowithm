import manifest from "@/lib/workImageManifest.json";
import {
  featuredWorkImageSizes,
  gridWorkImageSizes,
} from "@/lib/workImageSizing";

export type WorkImageSource = keyof typeof manifest;

export default function WorkProjectImage({
  src,
  featured,
}: {
  src: WorkImageSource;
  featured: boolean;
}) {
  const image = manifest[src];
  const srcSet = image.variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
  // Match the card widths in work.module.css, including the two-column mobile grid.
  const sizes = featured ? featuredWorkImageSizes : gridWorkImageSizes;
  const fallback = image.variants[1].src;

  return (
    <>
      {featured && (
        <link rel="preload" as="image" href={fallback} imageSrcSet={srcSet} imageSizes={sizes} />
      )}
      {/* These responsive assets are already optimized, avoiding first-request conversion. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt=""
        loading="eager"
        fetchPriority={featured ? "high" : "auto"}
        decoding="async"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </>
  );
}
