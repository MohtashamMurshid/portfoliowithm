import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Commit the generated files so dev and production serve the same ready-made
// thumbnails. Run `npm run images:work` after changing a project PNG.
const sourceDirectory = new URL("../public/projects/", import.meta.url);
const outputDirectory = new URL("thumbnails/", sourceDirectory);
const widths = [240, 480, 768, 1024];
const manifest = {};

await mkdir(outputDirectory, { recursive: true });

for (const filename of (await readdir(sourceDirectory)).sort()) {
  if (!filename.endsWith(".png")) continue;

  const source = await readFile(new URL(filename, sourceDirectory));
  const metadata = await sharp(source).metadata();
  const variants = [];

  for (const width of widths) {
    const { data, info } = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toBuffer({ resolveWithObject: true });
    const hash = createHash("sha256").update(data).digest("hex").slice(0, 12);
    const outputName = `${filename.slice(0, -4)}-${info.width}-${hash}.webp`;
    await writeFile(new URL(outputName, outputDirectory), data);
    variants.push({ src: `/projects/thumbnails/${outputName}`, width: info.width });
  }

  manifest[`/projects/${filename}`] = {
    width: metadata.width,
    height: metadata.height,
    variants,
  };
}

await writeFile(
  new URL("../lib/workImageManifest.json", import.meta.url),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
console.log(`Generated responsive WebP thumbnails for ${Object.keys(manifest).length} projects.`);
