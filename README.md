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
```

## Environment

`GITHUB_TOKEN` is optional. When present, it enables the GitHub pinned-repository section through the GitHub GraphQL API. The rest of the site works without it.

## Publishing a blog post

1. Write the article in `content/blog/<slug>.md` and add its cover image to `public/blog/`.
2. Add an entry to `lib/blogPosts.ts` with the slug, source filename, title, short title, description, category, image, image alt text, and dates. The site uses this registry for metadata; it ignores Markdown frontmatter.
3. Set `date` and `modifiedDate` to the publication date in `YYYY-MM-DD` format. For a later substantive edit, keep `date` unchanged and update `modifiedDate`. Do not change dates just because you redeploy.
4. Run `npm run lint` and `npm run build`, then commit, push, and deploy the portfolio.
5. Check the new article, `/blog`, `/sitemap.xml`, and `/rss.xml` on the live site.

The newest publication becomes the featured article and the first entry in the blog list and RSS feed. Editing an older article does not move it above newer publications. The sitemap includes registered posts automatically, and the blog index's modification date follows the latest publication or update, with a baseline for edits to the index itself. When changing the index layout or removing a post, update `blogIndexUpdated` in `app/sitemap.ts` to the date of that change.

## Search Console

In [Google Search Console](https://search.google.com/search-console), verify ownership of `mohtasham.dev` or select its existing verified property. Submit `https://www.mohtasham.dev/sitemap.xml` through the Sitemaps page if it is not already submitted. Keep that sitemap URL; it includes new registered posts after deployment.

For an important new article, inspect its live URL and use Request indexing. Use the indexing and performance reports to check discovery, impressions, and clicks. Deployment and sitemap submission do not guarantee indexing or a particular ranking.
