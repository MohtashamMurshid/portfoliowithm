import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`fresh Jev validation stays separate from original results at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/blog/jev-vs-a-fast-llm");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Do you need Jev, or is a fast LLM enough?");
    await expect(page.locator("article figure")).toHaveCount(15);
    await expect(page.locator("#accuracy")).toContainText("405/500 correct");
    await expect(page.locator("#accuracy")).toContainText("427/500 correct");
    await expect(page.locator("#study-budget")).toContainText("3,200 attempts");
    const fresh = page.locator("#fresh-validation");
    await expect(fresh).toContainText("Fresh validation, September 22");
    await expect(fresh).toContainText("500 new BANKING77 messages");
    await expect(fresh).toContainText("original 500");
    for (const label of ["Jev", "Independent Gemini", "Actual cascade", "Supervised TF-IDF LR"]) {
      await expect(fresh).toContainText(label);
    }
    for (const count of ["399/500 correct", "425/500 correct", "424/500 correct"]) {
      await expect(fresh).toContainText(count);
    }
    await expect(fresh.getByText("425/500 correct", { exact: true })).toHaveCount(2);
    const badges = page.getByTestId("fresh-pipeline-badges");
    for (const badge of ["OpenRouter + Vercel AI SDK", "Pinned providers", "No automatic retries"]) {
      await expect(badges.getByText(badge, { exact: true })).toBeVisible();
    }
    await expect(page.locator("article")).toContainText("1,630 new hosted calls");
    await expect(page.locator("article")).toContainText("9,742 labeled examples");
    const cost = page.locator("#fresh-cost-latency");
    await expect(cost).toContainText("23.27%");
    await expect(cost).toContainText("not an observed saving");
    await expect(cost).toContainText("1867 ms");
    await expect(cost).toContainText("1638 ms");
    await expect(cost).toContainText("0.730 CPU ms");
    const hostedChart = cost.locator('div[class*="metricChart"]').nth(1);
    await expect(hostedChart).not.toContainText("TF-IDF");
    await expect(hostedChart).not.toContainText("0.730");
    const gates = page.locator("#fresh-gates");
    for (const text of ["374", "23", "126", "0/100", "3.7%", "easy-domain"]) {
      await expect(gates).toContainText(text);
    }
    await expect(page.getByRole("link", { name: "Read the fresh follow-up" })).toHaveAttribute("href", "#fresh-validation");
    await fresh.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("draft technical report is linked and served as a real PDF", async ({ page, request }) => {
  await page.goto("/blog/jev-vs-a-fast-llm");
  const path = "/research/jev-confidence-study.pdf";
  await expect(page.locator(`article a[href="${path}"]`)).toHaveCount(2);
  const response = await request.get(path);
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});
