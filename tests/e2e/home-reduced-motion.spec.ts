import { expect, test } from "@playwright/test";

test("the monitor video follows reduced-motion changes", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const video = page.locator("video[src='/hero/valorant-icebox.mp4']");
  await expect(video).not.toHaveAttribute("autoplay", "");
  await expect.poll(() => video.evaluate((element) => element.paused)).toBe(true);

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(() => video.evaluate((element) => element.paused)).toBe(false);

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => video.evaluate((element) => element.paused)).toBe(true);
  expect(consoleErrors).toEqual([]);
});
