import { expect, test } from "@playwright/test";
import { blogPosts } from "../../lib/blogPosts";

const featuredBlogPost = [...blogPosts].sort((left, right) =>
  right.date.localeCompare(left.date),
)[0];

test("the home page warms the Work and Blog images before navigation", async ({
  page,
}) => {
  await page.goto("/");

  await expect
    .poll(() =>
      page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .map((entry) => entry.name),
      ),
    )
    .toEqual(
      expect.arrayContaining([
        expect.stringContaining("/projects/thumbnails/oikina-pass-"),
        expect.stringContaining(
          `url=${encodeURIComponent(featuredBlogPost.image)}`,
        ),
      ]),
    );

  await page.getByRole("link", { name: "Work", exact: true }).click();

  const workImages = page.locator("main img[src*='/projects/thumbnails/']");
  await expect(workImages).toHaveCount(7);
  await expect
    .poll(() =>
      workImages.evaluateAll((images) =>
        images.every((image) => {
          const element = image as HTMLImageElement;
          return element.complete && element.naturalWidth > 0;
        }),
      ),
    )
    .toBe(true);
});

test("hovering a case-study link warms its optimized hero image", async ({
  page,
}) => {
  await page.goto("/work");
  await page.getByRole("link", { name: /Oikina/ }).first().hover();

  await expect
    .poll(() =>
      page.evaluate(() =>
        performance
          .getEntriesByType("resource")
          .map((entry) => entry.name),
      ),
    )
    .toEqual(
      expect.arrayContaining([
        expect.stringContaining("url=%2Fprojects%2Foikina-pass.png"),
      ]),
    );
});
