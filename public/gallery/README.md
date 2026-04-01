# Gallery Media Guide

## Adding New Images

1. Convert HEIC to JPEG (browsers can't display HEIC):
   ```bash
   cd public/gallery
   sips -s format jpeg YOUR_IMAGE.HEIC --out YOUR_IMAGE.jpg -s formatOptions 85
   ```
2. Delete the original HEIC file.
3. Add an entry in `components/gallery/galleryData.ts`:
   ```ts
   {
     id: "img-X",
     src: "/gallery/YOUR_IMAGE.jpg",
     thumbnail: "/gallery/YOUR_IMAGE.jpg",
     alt: "Description",
     type: "image",
     orientation: "landscape", // or "portrait" or "square"
     width: 4032,   // run: sips -g pixelWidth YOUR_IMAGE.jpg
     height: 3024,  // run: sips -g pixelHeight YOUR_IMAGE.jpg
     category: "photos",
     title: "Your Title",
     color: "#2c3e50",
   }
   ```

## Adding New Videos

1. Convert MOV to MP4 (browsers can't play MOV):
   ```bash
   cd public/gallery
   ffmpeg -i YOUR_VIDEO.mov -c:v libx264 -crf 23 -preset medium -c:a aac -movflags +faststart YOUR_VIDEO.mp4
   ```
2. Generate a thumbnail from the first frame:
   ```bash
   ffmpeg -i YOUR_VIDEO.mp4 -vframes 1 -q:v 5 YOUR_VIDEO-thumb.jpg
   ```
3. Delete the original MOV file.
4. Get the video dimensions:
   ```bash
   ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 YOUR_VIDEO.mp4
   ```
5. Add an entry in `components/gallery/galleryData.ts`:
   ```ts
   {
     id: "vid-X",
     src: "/gallery/YOUR_VIDEO.mp4",
     thumbnail: "/gallery/YOUR_VIDEO-thumb.jpg",
     alt: "Description",
     type: "video",
     orientation: "landscape",
     width: 1920,
     height: 1080,
     category: "videos",
     title: "Your Title",
     color: "#1a1a2e",
   }
   ```

## Requirements

- **sips** — built into macOS (for image conversion)
- **ffmpeg/ffprobe** — install via `brew install ffmpeg`
