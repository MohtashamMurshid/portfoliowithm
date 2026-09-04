import fs from "node:fs";
import path from "node:path";
import { expect, test, type APIResponse } from "@playwright/test";
import SwaggerParser from "@apidevtools/swagger-parser";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import sitemap from "../../app/sitemap";
import { blogPosts, getBlogPostBody } from "../../lib/blogPosts";
import { siteUrl } from "../../lib/site";

const paths = [...new Set([
  ...sitemap().map((entry) => new URL(entry.url).pathname),
  "/house", "/boring", "/archive/1", "/archive/2",
])];

function variesOnAccept(response: APIResponse) {
  const vary = response.headers().vary?.toLowerCase().split(/,\s*/);
  expect(vary).toContain("accept");
  expect(vary).toContain("accept-encoding");
}

for (const pathname of paths) {
  test(`HTML and Markdown represent ${pathname}`, async ({ request }) => {
    const html = await request.get(pathname, { headers: { Accept: "text/html" } });
    expect(html.status()).toBe(200);
    expect(html.headers()["content-type"]).toContain("text/html");
    variesOnAccept(html);
    const content = await html.text();
    expect(content).toContain('rel="canonical"');
    expect(content).toContain('type="text/markdown"');
    expect(content).toContain('rel="describedby"');

    const markdown = await request.get(pathname, { headers: { Accept: "text/markdown" } });
    expect(markdown.status()).toBe(200);
    expect(markdown.headers()["content-type"]).toBe("text/markdown; charset=utf-8");
    variesOnAccept(markdown);
    expect(markdown.headers()["cache-control"]).toContain("no-store");
    expect(markdown.headers().link).toContain('rel="canonical"');
    const body = await markdown.text();
    expect(body).toMatch(/^# .+\n/);
    expect(body).toContain(`[Canonical page](${siteUrl}${pathname})`);
    expect(body).not.toMatch(/<html|<script|__next_f/);

    const alias = `${pathname === "/" ? "" : pathname}/index.md`;
    const explicit = await request.get(alias);
    expect(explicit.status()).toBe(200);
    expect(await explicit.text()).toBe(body);
    const head = await request.head(pathname, { headers: { Accept: "text/markdown" } });
    expect(head.status()).toBe(200);
    expect(await head.body()).toHaveLength(0);
    expect(head.headers()["content-type"]).toBe(markdown.headers()["content-type"]);
    variesOnAccept(head);
  });
}

const preferences = [
  ["*/*", 200, "text/html"],
  ["text/*", 200, "text/html"],
  ["text/markdown", 200, "text/markdown"],
  ["TEXT/MARKDOWN; charset=UTF-8", 200, "text/markdown"],
  ["text/markdown;q=0.5, text/html;q=0.9", 200, "text/html"],
  ["text/html;q=0.5, text/markdown;q=0.9", 200, "text/markdown"],
  ["text/markdown;q=0, */*;q=1", 200, "text/html"],
  ["text/html;q=0, text/*;q=1", 200, "text/markdown"],
  ["text/markdown, text/html", 200, "text/markdown"],
  ["text/html, text/markdown", 200, "text/html"],
  ["application/json, */*;q=0.1", 200, "text/html"],
  ["application/json", 406, "text/plain"],
  ["text/html;q=0, text/markdown;q=0", 406, "text/plain"],
  ["text/markdown;variant=unsupported", 406, "text/plain"],
] as const;

for (const [accept, status, type] of preferences) {
  test(`Accept preference: ${accept}`, async ({ request }) => {
    const response = await request.get("/", { headers: { Accept: accept } });
    expect(response.status()).toBe(status);
    expect(response.headers()["content-type"]).toContain(type);
    variesOnAccept(response);
  });
}

for (const pathname of ["/missing-agent-page", "/blog/missing", "/work/missing", "/work/archive/missing", "/events/missing", "/missing/nested", "/missing/index.md"]) {
  test(`missing path stays a recoverable 404: ${pathname}`, async ({ request }) => {
    for (const accept of ["text/html", "text/markdown", "*/*"]) {
      const response = await request.get(pathname, { headers: { Accept: accept } });
      expect(response.status()).toBe(404);
      const body = await response.text();
      expect(body).toContain("llms.txt");
      expect(body).toContain("sitemap.xml");
      expect(body).toContain("developers");
      if (accept === "text/markdown" || pathname.endsWith(".md")) {
        expect(response.headers()["content-type"]).toContain("text/markdown");
        expect(body).toMatch(/^# 404:/);
        expect(body.length).toBeLessThan(1000);
      }
      const head = await request.head(pathname, { headers: { Accept: accept } });
      expect(head.status()).toBe(404);
      expect(await head.body()).toHaveLength(0);
    }
  });
}

test("llms.txt follows the file-list format and all local guidance links resolve", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const body = await response.text();
  expect(body).toMatch(/^# Mohtasham's Portfolio\n\n> /);
  expect(body.match(/^# /gm)).toHaveLength(1);
  expect(body).toContain("## When to use this");
  expect(body).toContain("Accept: text/markdown");
  for (const section of body.split(/^## /m).slice(1)) {
    const entries = section.split("\n").slice(1).filter((line) => line.trim());
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) expect(entry).toMatch(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(: .+)?$/);
  }
  for (const match of body.matchAll(/\]\((https:\/\/www\.mohtasham\.dev[^)]+)\)/g)) {
    const url = new URL(match[1]);
    const linked = await request.get(url.pathname);
    expect(linked.status(), url.pathname).toBe(200);
    if (url.pathname.endsWith(".md")) expect(linked.headers()["content-type"]).toContain("text/markdown");
  }
});

test("blog Markdown includes the actual article, intact code, and usable links", async ({ request }) => {
  for (const post of blogPosts) {
    const response = await request.get(`/blog/${post.slug}/index.md`);
    const body = await response.text();
    const source = getBlogPostBody(post);
    for (const match of source.matchAll(/^```[^\n]*\n[\s\S]*?^```/gm)) expect(body).toContain(match[0]);
    for (const match of source.matchAll(/^## .+$/gm)) expect(body).toContain(match[0]);
    expect(body).toContain(post.date);
    expect(body).toContain(post.modifiedDate);
    expect(body.replace(/^```[^\n]*\n[\s\S]*?^```/gm, "")).not.toMatch(/\]\(\/(?!\/)/);
  }
});

test("sitemap and RSS are valid XML with canonical, resolvable URLs", async ({ request }) => {
  for (const endpoint of ["/sitemap.xml", "/rss.xml"]) {
    const response = await request.get(endpoint, { headers: { Accept: "text/markdown" } });
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("xml");
    const xml = await response.text();
    expect(XMLValidator.validate(xml)).toBe(true);
    const parsed = new XMLParser().parse(xml);
    if (endpoint === "/sitemap.xml") {
      const urls = parsed.urlset.url.map((entry: { loc: string }) => entry.loc);
      expect(urls).toContain(`${siteUrl}/developers`);
      expect(urls).toEqual(sitemap().map((entry) => entry.url));
      for (const entry of parsed.urlset.url) {
        if (entry.lastmod) expect(new Date(entry.lastmod).getTime()).toBeLessThanOrEqual(Date.now());
      }
    } else {
      expect(parsed.rss.channel.item).toHaveLength(blogPosts.length);
    }
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${siteUrl}/sitemap.xml`);
  expect(await robots.text()).toContain("Allow: /");
});

test("trailing slashes redirect before Markdown negotiation", async ({ request }) => {
  for (const pathname of ["/about", "/developers", "/work/oikina", "/blog/markdown-to-docx-guide"]) {
    const url = `${pathname}/?source=agent`;
    for (const method of ["GET", "HEAD"]) {
      const redirect = await request.fetch(url, {
        method,
        headers: { Accept: "text/markdown" },
        maxRedirects: 0,
      });
      expect(redirect.status()).toBe(308);
      expect(redirect.headers().location).toBe(`${pathname}?source=agent`);
      const document = await request.fetch(url, { method, headers: { Accept: "text/markdown" } });
      expect(document.status()).toBe(200);
      expect(document.headers()["content-type"]).toBe("text/markdown; charset=utf-8");
      if (method === "GET") expect(await document.text()).toContain(`[Canonical page](${siteUrl}${pathname})`);
      else expect(await document.body()).toHaveLength(0);
    }
  }
});

test("OpenAPI is valid and describes the live read-only API response", async ({ request }) => {
  const response = await request.get("/openapi.json", { headers: { Accept: "text/markdown" } });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/json");
  const spec = await response.json();
  expect(spec.security).toEqual([]);
  expect(Object.keys(spec.paths)).toEqual(["/api/npm-downloads"]);
  expect(spec.paths["/api/npm-downloads"].get.responses["200"].content["application/json"].schema.$ref)
    .toBe("#/components/schemas/NpmDownloadsResponse");
  expect(spec.paths["/api/npm-downloads"].get.responses["502"].content["application/problem+json"].schema.$ref)
    .toBe("#/components/schemas/ProblemDetails");
  expect(spec.components.schemas.ProblemDetails.required).toContain("resolution");
  await SwaggerParser.validate(structuredClone(spec));
  const dereferenced = await SwaggerParser.dereference(spec) as typeof spec;
  const stats = await request.get("/api/npm-downloads", { headers: { Accept: "text/markdown" } });
  expect([200, 502]).toContain(stats.status());
  const mediaType = stats.status() === 200 ? "application/json" : "application/problem+json";
  expect(stats.headers()["content-type"]).toContain(mediaType);
  const data = await stats.json();
  const schema = dereferenced.paths["/api/npm-downloads"].get.responses[String(stats.status())].content[mediaType].schema;
  expect(Object.keys(data).sort()).toEqual([...schema.required].sort());
  if (stats.status() === 200) {
    expect(data.package).toBe("@mohtasham/md-to-docx");
    expect(Number.isInteger(data.total) && data.total >= 0).toBe(true);
    expect(typeof data.formatted).toBe("string");
  } else {
    expect(data.status).toBe(502);
    expect(data.code).toBe("NPM_STATS_UNAVAILABLE");
    expect(data.resolution).toContain("Retry later");
  }
});

test("API errors are typed JSON problems with recovery guidance", async ({ request }) => {
  const developerGuide = await request.get("/developers/index.md");
  const guideBody = await developerGuide.text();
  expect(guideBody).toContain("unknown `/api/*` paths, and unsupported API methods use `application/problem+json`");
  expect(guideBody).toContain("A missing Markdown content path stays `text/markdown`");

  const missing = await request.get("/api/does-not-exist", { headers: { Accept: "text/html" } });
  expect(missing.status()).toBe(404);
  expect(missing.headers()["content-type"]).toContain("application/problem+json");
  expect(await missing.json()).toMatchObject({
    type: `${siteUrl}/developers#api-route-not-found`,
    status: 404,
    code: "API_ROUTE_NOT_FOUND",
    instance: "/api/does-not-exist",
    resolution: "Read /openapi.json for the supported API endpoint and response schemas.",
  });

  const method = await request.post("/api/npm-downloads");
  expect(method.status()).toBe(405);
  expect(method.headers()["content-type"]).toContain("application/problem+json");
  expect(method.headers().allow).toBe("GET, HEAD");
  expect(await method.json()).toMatchObject({
    type: `${siteUrl}/developers#method-not-allowed`,
    status: 405,
    code: "METHOD_NOT_ALLOWED",
    instance: "/api/npm-downloads",
  });

  const head = await request.head("/api/does-not-exist");
  expect(head.status()).toBe(404);
  expect(head.headers()["content-type"]).toContain("application/problem+json");
  expect(await head.body()).toHaveLength(0);
});

test("identity and developer discovery are present in server-rendered HTML", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Mohtasham's Portfolio.*Mohtasham Murshid Madani/);
  await expect(page.getByRole("link", { name: "Developer resources" })).toHaveAttribute("href", "/developers");
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((s) => JSON.parse(s.textContent ?? "")));
  const person = schemas.find((s) => s["@type"] === "Person");
  expect(person).toMatchObject({ name: "Mohtasham Murshid Madani", url: siteUrl, jobTitle: "AI Engineer" });
  expect(person.description).toBeTruthy();
  expect(person.sameAs).toContain("https://www.linkedin.com/in/mohtashammurshid/");
  expect(person.contactPoint.email).toBe("mohtashammurshid@gmail.com");
  expect(person.address).toMatchObject({ "@type": "PostalAddress", addressLocality: "Kuala Lumpur", addressCountry: "MY" });
  const organization = schemas.find((s) => s["@type"] === "Organization");
  expect(organization.contactPoint).toMatchObject({ "@type": "ContactPoint", email: "mohtashammurshid@gmail.com", contactType: "Founder and product inquiries" });
  const website = schemas.find((s) => s["@type"] === "WebSite");
  expect(website.name).toBe("Mohtasham's Portfolio");
  expect(website.hasPart.url).toBe(`${siteUrl}/developers`);

  await page.goto("/developers");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mohtasham developer resources");
  await expect(page.getByRole("link", { name: "OpenAPI 3.1 description" })).toHaveAttribute("href", `${siteUrl}/openapi.json`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteUrl}/developers`);
  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByText("Archive", { exact: true }).first()).toBeVisible();
});

test("framework payloads, redirects, and fixed-format assets keep their behavior", async ({ request }) => {
  for (const accept of ["*/*", "text/markdown"]) {
    const rsc = await request.get("/work", { headers: { RSC: "1", Accept: accept } });
    expect(rsc.status()).toBe(200);
    expect(rsc.headers()["content-type"]).toContain("text/x-component");
  }
  for (const [source, destination] of [["/docs", "/developers"], ["/archive", "/work#archive"], ["/github", "https://github.com/mohtashammurshid"], ["/x", "https://x.com/mohtashamdotdev"], ["/ig", "https://www.instagram.com/mohtashammurshid/"], ["/linkedin", "https://www.linkedin.com/in/mohtashammurshid/"], ["/ws", "https://wa.me/60177433260"]]) {
    const redirect = await request.get(source, { headers: { Accept: "text/markdown" }, maxRedirects: 0 });
    expect([307, 308]).toContain(redirect.status());
    expect(redirect.headers().location).toBe(destination);
  }
  const files = fs.readdirSync(path.join(process.cwd(), "public"), { recursive: true, withFileTypes: true });
  for (const file of files.filter((f) => f.isFile() && !f.name.startsWith("."))) {
    const pathname = "/" + path.relative(path.join(process.cwd(), "public"), path.join(file.parentPath, file.name)).split(path.sep).join("/");
    const asset = await request.head(pathname, { headers: { Accept: "text/markdown" } });
    expect(asset.status(), pathname).toBe(200);
    expect(asset.headers()["content-type"]).not.toContain("text/markdown");
  }
  for (const endpoint of ["/og", "/apple-icon", "/apple-touch-icon.png", "/favicon.ico", "/opengraph-image.jpg", "/twitter-image.jpg"]) {
    const asset = await request.get(endpoint, { headers: { Accept: "text/markdown" } });
    expect(asset.status(), endpoint).toBe(200);
    expect(asset.headers()["content-type"]).toContain("image/");
  }
});

test("the Markdown reader cannot read arbitrary files or fabricate pages", async ({ request }) => {
  for (const input of ["/../package.json", "/content/blog/node-js-deep-dive.md", "/work/toString", "https://example.com", "/developers/extra"]) {
    const response = await request.get("/api/markdown", { params: { path: input } });
    expect(response.status()).toBe(404);
    expect(await response.text()).toMatch(/^# 404:/);
  }
  const method = await request.post("/api/markdown");
  expect(method.status()).toBe(405);
  expect(method.headers()["content-type"]).toContain("application/problem+json");
  expect(await method.json()).toMatchObject({ status: 405, code: "METHOD_NOT_ALLOWED" });
});
