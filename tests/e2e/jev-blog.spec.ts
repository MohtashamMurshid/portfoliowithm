import { expect, test } from "@playwright/test";

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`Jev study renders native figures and working controls at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("/blog/jev-vs-a-fast-llm");
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Do you need Jev, or is a fast LLM enough?");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.mohtasham.dev/blog/jev-vs-a-fast-llm");
    await expect(page.locator('article a[href="https://github.com/MohtashamMurshid/jev-speed-test"]').first()).toBeVisible();
    await expect(page.locator("article img")).toHaveCount(1);
    await expect(page.locator("article figure")).toHaveCount(12);
    await expect(page.locator("p figure")).toHaveCount(0);
    await expect(page.locator("#study-architecture")).toContainText("Freeze the rules");
    await expect(page.locator("#study-architecture")).toContainText("500 × 4 = 2,000");
    await expect(page.locator("#accuracy")).toContainText("405/500 correct");
    await expect(page.locator("#accuracy")).toContainText("427/500 correct");

    const latency = page.locator("#latency");
    await expect(latency).toContainText("0.347 s");
    await latency.getByRole("button", { name: "95th percentile" }).click();
    await expect(latency.getByRole("button", { name: "95th percentile" })).toHaveAttribute("aria-pressed", "true");
    await expect(latency).toContainText("3.239 s");

    const distribution = page.locator("#confidence-distribution");
    await distribution.getByRole("button", { name: "Selected-answer probability", exact: true }).click();
    await expect(distribution).toContainText("10 mistakes among 198 accepted answers");

    const acceptance = page.locator("#acceptance");
    await expect(acceptance.getByRole("img")).toHaveAttribute("aria-label", "Jev / native: 163 accepted and correct, 5 accepted and wrong, 332 deferred.");
    for (const [name, summary] of [
      ["Gemini", "Gemini: 350 accepted and correct, 15 accepted and wrong, 135 deferred."],
      ["Jev / probability", "Jev / probability: 188 accepted and correct, 10 accepted and wrong, 302 deferred."],
      ["GPT-OSS", "GPT-OSS: 0 accepted and correct, 0 accepted and wrong, 500 deferred."],
      ["Mercury", "Mercury: 0 accepted and correct, 0 accepted and wrong, 500 deferred."],
    ]) {
      await acceptance.getByRole("button", { name, exact: true }).click();
      await expect(acceptance.getByRole("img")).toHaveAttribute("aria-label", summary);
    }
    await expect(acceptance).toContainText("Its accepted-error rate is undefined");
    await acceptance.getByRole("button", { name: "Jev / native", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(acceptance.getByRole("button", { name: "Jev / native", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(acceptance).toContainText("1.3% to 6.8%");

    const reliability = page.locator("#reliability");
    await reliability.getByRole("button", { name: "Mercury 2.5" }).click();
    await expect(reliability).toContainText("472 valid answers");
    await reliability.getByText("View reliability bins and sample counts", { exact: true }).click();
    await expect(reliability.locator("table")).toBeVisible();
    await expect(page.locator("#study-budget")).toContainText("$1.007308");
    await expect(page.locator("#study-budget")).toContainText("$0.021401");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await expect(page.locator("#study-at-a-glance")).toHaveCount(0);
    await page.locator("#study-architecture").screenshot({ path: `/tmp/jev-architecture-${viewport.width}.png` });
    await expect(page.locator("article img")).toHaveAttribute("src", /cover/);
    expect(await page.locator("#study-architecture").evaluate((node) => node.previousElementSibling?.textContent)).toBe("How we built and ran the test");
    await acceptance.screenshot({ path: `/tmp/jev-react-acceptance-${viewport.width}.png` });
    await reliability.screenshot({ path: `/tmp/jev-react-reliability-${viewport.width}.png` });
  });
}

test("Jev figures retain their content without JavaScript and in Markdown", async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/blog/jev-vs-a-fast-llm");
  await expect(page.locator("article figure")).toHaveCount(12);
  await expect(page.locator("#acceptance")).toContainText("332 deferred");
  await expect(page.locator("#accuracy")).toContainText("405/500 correct");
  await context.close();
  const markdown = await request.get("/blog/jev-vs-a-fast-llm/index.md");
  expect(markdown.status()).toBe(200);
  expect(await markdown.text()).toContain("#confidence-distribution");
  expect(await markdown.text()).not.toContain("01-workflow.webp");
});

test("other articles keep their existing image rendering", async ({ page }) => {
  await page.goto("/blog/model-debt-is-a-real-thing");
  await expect(page.locator("article img").first()).toBeVisible();
  await expect(page.locator("#study-at-a-glance")).toHaveCount(0);
});

test("Jev article is discoverable in the blog index and sitemap", async ({ page, request }) => {
  await page.goto("/blog");
  await expect(page.locator('a[href="/blog/jev-vs-a-fast-llm"]').first()).toBeVisible();
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("https://www.mohtasham.dev/blog/jev-vs-a-fast-llm");
});
