export type RoutePrefetchImage = {
  src: string;
  sizes: string;
  srcSet?: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

export type RoutePrefetchTarget = {
  href: string;
  images: RoutePrefetchImage[];
  preloadWhenIdle?: boolean;
};
