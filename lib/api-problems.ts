import { siteUrl } from "./site";

export type ApiProblem = {
  type: string;
  title: string;
  status: number;
  detail: string;
  code: string;
  resolution: string;
  instance: string;
};

type ProblemOptions = Omit<ApiProblem, "type" | "instance"> & {
  headers?: HeadersInit;
};

export function problemResponse(request: Request, options: ProblemOptions) {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/problem+json; charset=utf-8");
  headers.set("Cache-Control", "private, no-store");
  headers.set("X-Content-Type-Options", "nosniff");

  const pathname = new URL(request.url).pathname;
  const problemSlug = options.code.toLowerCase().replaceAll("_", "-");
  const body: ApiProblem = {
    type: `${siteUrl}/developers#${problemSlug}`,
    title: options.title,
    status: options.status,
    detail: options.detail,
    code: options.code,
    resolution: options.resolution,
    instance: pathname,
  };

  return Response.json(body, { status: options.status, headers });
}

export function methodNotAllowedResponse(request: Request, allowed = ["GET", "HEAD"]) {
  const pathname = new URL(request.url).pathname;
  return problemResponse(request, {
    title: "Method not allowed",
    status: 405,
    detail: `${request.method} is not supported for ${pathname}.`,
    code: "METHOD_NOT_ALLOWED",
    resolution: `Use one of the supported methods: ${allowed.join(", ")}.`,
    headers: { Allow: allowed.join(", ") },
  });
}

export function apiRouteNotFoundResponse(request: Request) {
  const pathname = new URL(request.url).pathname;
  return problemResponse(request, {
    title: "API route not found",
    status: 404,
    detail: `No API route exists at ${pathname}.`,
    code: "API_ROUTE_NOT_FOUND",
    resolution: "Read /openapi.json for the supported API endpoint and response schemas.",
  });
}
