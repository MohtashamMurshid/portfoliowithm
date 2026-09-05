import { readFile } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";
import sharp from "sharp";
import { getOgImageUrl } from "../../lib/ogImage";

const cases = [
  ["model-debt-is-a-real-thing", "WebP"],
  ["how-i-use-grok-bot", "JPEG"],
  ["my-instruct-plus", "PNG"],
] as const;

for (const [slug, format] of cases) {
  test(`blog OG renders ${format} covers without the generic fallback`, async ({ request }) => {
    const response = await request.get(getOgImageUrl("blog", slug));
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("image/jpeg");
    const bytes = await response.body();
    const fallback = await readFile(path.join(process.cwd(), "public/og/default.jpg"));
    expect(bytes.equals(fallback)).toBe(false);
    const metadata = await sharp(bytes).metadata();
    expect(metadata.width).toBe(1200);
    expect(metadata.height).toBe(630);
    expect(bytes.byteLength).toBeLessThan(100 * 1024);
  });
}

test("the article advertises the repaired image URL to social crawlers", async ({ page }) => {
  const slug = "model-debt-is-a-real-thing";
  await page.goto(`/blog/${slug}`);
  const image = page.locator('meta[property="og:image"]');
  const url = await image.getAttribute("content");
  expect(url).toBeTruthy();
  const parsed = new URL(url!);
  expect(`${parsed.pathname}${parsed.search}`).toBe(getOgImageUrl("blog", slug));
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", url!);
});
