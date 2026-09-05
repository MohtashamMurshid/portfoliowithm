import manifest from "@/lib/workImageManifest.json";

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
  const sizes = featured
    ? "(max-width: 544px) calc(82vw - 26.24px), (max-width: 720px) 420px, 484px"
    : "(max-width: 592px) calc(50vw - 25px), (max-width: 720px) 271px, 202px";
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
        loading={featured ? "eager" : "lazy"}
        fetchPriority={featured ? "high" : "auto"}
        decoding="async"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </>
  );
}
