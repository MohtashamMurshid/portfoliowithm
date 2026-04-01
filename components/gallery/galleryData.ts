export type MediaType = "image" | "video";
export type Orientation = "landscape" | "portrait" | "square";
export type Category = "all" | "photos" | "videos";

export interface GalleryItem {
  id: string;
  src: string;
  thumbnail: string;
  alt: string;
  type: MediaType;
  orientation: Orientation;
  width: number;
  height: number;
  category: Exclude<Category, "all">;
  title: string;
  description?: string;
  color: string;
}

export const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Photos", value: "photos" },
  { label: "Videos", value: "videos" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "img-1",
    src: "/gallery/IMG_0566.jpg",
    thumbnail: "/gallery/IMG_0566.jpg",
    alt: "Photo 1",
    type: "image",
    orientation: "landscape",
    width: 4896,
    height: 3672,
    category: "photos",
    title: "IMG_0566",
    color: "#2c3e50",
  },
  {
    id: "img-2",
    src: "/gallery/IMG_0607.jpg",
    thumbnail: "/gallery/IMG_0607.jpg",
    alt: "Photo 2",
    type: "image",
    orientation: "landscape",
    width: 4032,
    height: 3024,
    category: "photos",
    title: "IMG_0607",
    color: "#34495e",
  },
  {
    id: "vid-1",
    src: "/gallery/copy_28B62FF6-5E2F-4F65-B600-FB8EBB55A200.mp4",
    thumbnail: "/gallery/copy_28B62FF6-5E2F-4F65-B600-FB8EBB55A200-thumb.jpg",
    alt: "Video 1",
    type: "video",
    orientation: "landscape",
    width: 1920,
    height: 1080,
    category: "videos",
    title: "Video 1",
    color: "#1a1a2e",
  },
  {
    id: "vid-2",
    src: "/gallery/copy_6998B0BF-3B53-4C5D-ABA5-136E9CE840E4.mp4",
    thumbnail: "/gallery/copy_6998B0BF-3B53-4C5D-ABA5-136E9CE840E4-thumb.jpg",
    alt: "Video 2",
    type: "video",
    orientation: "landscape",
    width: 1920,
    height: 1080,
    category: "videos",
    title: "Video 2",
    color: "#2d3436",
  },
  {
    id: "vid-3",
    src: "/gallery/copy_87C35476-CFA5-4B54-AF8D-63D395CBC16B.mp4",
    thumbnail: "/gallery/copy_87C35476-CFA5-4B54-AF8D-63D395CBC16B-thumb.jpg",
    alt: "Video 3",
    type: "video",
    orientation: "landscape",
    width: 1920,
    height: 1080,
    category: "videos",
    title: "Video 3",
    color: "#0c0c1d",
  },
];

export const featuredItems = galleryItems.filter((item) => item.type === "image");
