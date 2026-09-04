# Mohtasham’s Portfolio

A portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Requirements

- Node.js 20.9 or newer
- npm

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npm run build
npm run test:e2e
```

## Environment

`GITHUB_TOKEN` is optional. When present, it enables the GitHub pinned-repository section through the GitHub GraphQL API. The rest of the site works without it.

## Publishing a blog post

1. Write the article in `content/blog/<slug>.md` and add its cover image to `public/blog/`.
2. Add an entry to `lib/blogPosts.ts` with the slug, source filename, title, short title, description, category, image, image alt text, and dates. The site uses this registry for metadata; it ignores Markdown frontmatter.
3. Set `date` and `modifiedDate` to the UTC publication date in `YYYY-MM-DD` format. For a later substantive edit, keep `date` unchanged and update `modifiedDate` using UTC. Do not change dates just because you redeploy.
4. Run `npm run lint` and `npm run build`, then commit, push, and deploy the portfolio.
5. Check the new article, `/blog`, `/sitemap.xml`, and `/rss.xml` on the live site.

The newest publication becomes the featured article and the first entry in the blog list and RSS feed. Editing an older article does not move it above newer publications. The sitemap includes registered posts automatically, and the blog index's modification date follows the latest publication or update, with a baseline for edits to the index itself. When changing the index layout or removing a post, update `blogIndexUpdated` in `app/sitemap.ts` to the date of that change.

## Search Console

In [Google Search Console](https://search.google.com/search-console), verify ownership of `mohtasham.dev` or select its existing verified property. Submit `https://www.mohtasham.dev/sitemap.xml` through the Sitemaps page if it is not already submitted. Keep that sitemap URL; it includes new registered posts after deployment.

For an important new article, inspect its live URL and use Request indexing. Use the indexing and performance reports to check discovery, impressions, and clicks. Deployment and sitemap submission do not guarantee indexing or a particular ranking.

## Agent access

The canonical host remains `https://www.mohtasham.dev`. The apex redirects there in one hop. Keep public profiles, canonical links, sitemap URLs, and Search Console submissions consistent with that host.

- `/llms.txt` follows the [llms.txt format](https://llmstxt.org/). Its "When to use this" section links tasks to specific tools and guides.
- `/developers` is the searchable developer index. `/docs` redirects there.
- `/openapi.json` is an [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0.html) description of the existing read-only `/api/npm-downloads` endpoint. The portfolio has no hosted conversion API, MCP server, or webhook receiver.
- Public content pages support [Markdown content negotiation](https://acceptmarkdown.com/). Request `Accept: text/markdown` at the HTML URL, or append `/index.md`. The home page's explicit version is `/index.md`.
- HTML and Markdown responses advertise the agent guide through `Link: rel="describedby"`. HTML also advertises its Markdown alternate. Markdown identifies the canonical HTML page.
- Negotiation respects quality values, explicit exclusions, and wildcards. Unsupported representations return 406. Missing pages return 404 with recovery links, including a short Markdown response when requested.
- Article bodies and case-study narratives use the existing content records. Visual experiences have concise text overviews in `lib/markdown-content.ts`; update those when the underlying page changes. Register new page types there and add them to the sitemap where appropriate.
- Negotiated Markdown uses `Cache-Control: private, no-store`; this avoids shared caches that ignore custom `Vary` fields. Both variants include `Vary: Accept, Accept-Encoding` while retaining Next's routing fields.

### Next.js header patch

Next 16.2.11 overwrites custom `Vary` values in its App Router page handler, including values from `proxy.ts` and `next.config.ts`. This is tracked in [Next.js issue 85999](https://github.com/vercel/next.js/issues/85999). `patches/next+16.2.11.patch` makes the Node page template merge existing values. `npm install` and `npm ci` apply it through `postinstall`; a patch mismatch fails the install. Do not skip lifecycle scripts when building this site. Revisit the patch when upgrading Next, and remove it only after the production endpoint tests pass without it.

### Verification

`npm run test:agents` checks all sitemap pages plus the house and old portfolio editions in HTML, negotiated Markdown, explicit Markdown, and HEAD responses. It also checks quality values, 404 recovery, JSON-LD, llms.txt format and links, XML feeds, OpenAPI validity, the API response contract, static assets, redirects, and browser navigation. `npm run test:e2e` also checks reduced motion.

To test an already running production build or deployed site:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3109
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3109 npm run test:e2e
PLAYWRIGHT_BASE_URL=https://www.mohtasham.dev npm run test:agents
```

Run the test commands in another terminal while the production server is running. Install the test browser with `npx playwright install chromium` if needed. Recheck the deployed headers after any CDN changes, and rerun the external readiness audit after deployment.

### Details still needing confirmation

Oikina's public contact email is `mohtashammurshid@gmail.com`. Its Organization schema needs a confirmed business address. The Person schema uses the already-public Kuala Lumpur, Malaysia location.

Search Console ownership and indexing requests need the owner's account. Use the same portfolio name and canonical link on public profiles. Search ranking and a new readiness score must be measured after deployment and recrawling.
