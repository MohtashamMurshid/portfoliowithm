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
          description: "Aggregate npm download count. Upstream results are cached for up to one day.",
          responses: {
            "200": {
              description: "Download count available",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/NpmDownloadsResponse" },
                },
              },
            },
            "502": {
              description: "The upstream npm service is unavailable",
              content: {
                "application/problem+json": {
                  schema: { $ref: "#/components/schemas/ProblemDetails" },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        NpmDownloadsResponse: {
          type: "object",
          additionalProperties: false,
          required: ["total", "formatted", "package"],
          properties: {
            total: { type: "integer", minimum: 0 },
            formatted: { type: "string" },
            package: { type: "string", const: "@mohtasham/md-to-docx" },
          },
        },
        ProblemDetails: {
          type: "object",
          additionalProperties: false,
          required: ["type", "title", "status", "detail", "code", "resolution", "instance"],
          properties: {
            type: {
              type: "string",
              format: "uri",
              description: "Documentation for the problem type.",
            },
            title: { type: "string" },
            status: { type: "integer", minimum: 400, maximum: 599 },
            detail: { type: "string" },
            code: {
              type: "string",
              description: "Stable code for programmatic handling.",
              examples: ["NPM_STATS_UNAVAILABLE"],
            },
            resolution: {
              type: "string",
              description: "The next action a caller can take.",
            },
            instance: {
              type: "string",
              format: "uri-reference",
              description: "The request path that produced the problem.",
            },
          },
        },
      },
    },
  });
}
