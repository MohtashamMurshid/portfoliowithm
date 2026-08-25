import NextImage, { type ImageProps } from "next/image";

const paperBlur =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDY0IDQ4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZTNkZWQyIi8+PHN0b3Agb2Zmc2V0PSIuNDgiIHN0b3AtY29sb3I9IiNmNGYwZTciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNkNWNlYzAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSI0OSIgY3k9IjEyIiByPSI4IiBmaWxsPSIjZWVlOWRmIiBvcGFjaXR5PSIuOCIvPjwvc3ZnPg==";

/**
 * The default image for the portfolio. It keeps Next.js image optimization and
 * adds a tiny local placeholder, so an image never starts as an empty box.
 */
export default function PortfolioImage({
  blurDataURL,
  placeholder = "blur",
  ...props
}: ImageProps) {
  return (
    <NextImage
      {...props}
      blurDataURL={placeholder === "blur" ? (blurDataURL ?? paperBlur) : blurDataURL}
      placeholder={placeholder}
    />
  );
}
