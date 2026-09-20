import { expect, test } from "@playwright/test";

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`Jev study renders with local artwork and evidence links at ${viewport.width}px`, async ({ page, request }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("/blog/jev-vs-a-fast-llm");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Jev's confidence was useful. It wasn't a guarantee.");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.mohtasham.dev/blog/jev-vs-a-fast-llm");
    await expect(page.locator('article a[href="https://github.com/MohtashamMurshid/jev-speed-test"]').first()).toBeVisible();
    const images = page.locator("article img");
    await expect(images).toHaveCount(8);
    const paths = await images.evaluateAll((nodes) => nodes.map((node) => (node as HTMLImageElement).getAttribute("src")!));
    for (const src of paths) {
      const asset = await request.get(src);
      expect(asset.status()).toBe(200);
    }
    await images.evaluateAll((nodes) => nodes.forEach((node) => { (node as HTMLImageElement).loading = "eager"; }));
    await expect.poll(() => images.evaluateAll((nodes) => nodes.every((node) => {
      const img = node as HTMLImageElement;
      return img.complete && img.naturalWidth > 0;
    }))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `/tmp/jev-portfolio-${viewport.width}.png`, fullPage: true });
  });
}

test("Jev article is discoverable in the blog index and sitemap", async ({ page, request }) => {
  await page.goto("/blog");
  await expect(page.locator('a[href="/blog/jev-vs-a-fast-llm"]').first()).toBeVisible();
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://www.mohtasham.dev/blog/jev-vs-a-fast-llm");
});
