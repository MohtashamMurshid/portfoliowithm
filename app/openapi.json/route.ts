import { siteName, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    openapi: "3.1.0",
    info: {
      title: "Mohtasham portfolio API",
      version: "1.0.0",
      description: `Read-only npm package statistics for ${siteName}'s portfolio.`,
    },
    servers: [{ url: siteUrl }],
    security: [],
    paths: {
      "/api/npm-downloads": {
        get: {
          operationId: "getNpmDownloads",
          summary: "Get download statistics for @mohtasham/md-to-docx",
          description: "Aggregate npm download count. Upstream results are cached for up to one day. An unavailable count is null, not zero.",
          responses: {
            "200": {
              description: "Download count available",
              content: { "application/json": { schema: {
                type: "object",
                required: ["total", "formatted", "package"],
                properties: {
                  total: { type: "integer", minimum: 0 },
                  formatted: { type: "string" },
                  package: { type: "string", const: "@mohtasham/md-to-docx" },
                },
              } } },
            },
            "502": {
              description: "The upstream npm service is unavailable",
              content: { "application/json": { schema: {
                type: "object",
                required: ["total", "formatted", "package", "error"],
                properties: {
                  total: { type: "null" },
                  formatted: { type: "null" },
                  package: { type: "string", const: "@mohtasham/md-to-docx" },
                  error: { type: "string" },
                },
              } } },
            },
          },
        },
      },
    },
  });
}
