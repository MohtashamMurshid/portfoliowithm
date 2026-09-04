import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { markdownPath, siteUrl } from "./lib/site";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const explicitMarkdown = path.endsWith("/index.md");
  const headers = {
    Vary: "Accept, Accept-Encoding",
    Link: `<${siteUrl}/llms.txt>; rel="describedby"`,
  };

  // These are resources with fixed formats, not HTML pages. Keep API methods,
  // framework payloads, images, and existing redirects under Next's control.
  if (
    !["GET", "HEAD"].includes(request.method) ||
    request.headers.get("rsc") === "1" ||
    path.startsWith("/api/") || path.startsWith("/_next/") ||
    (!explicitMarkdown && (/\.[^/]+$/.test(path) ||
      ["/og", "/apple-icon", "/docs", "/archive", "/x", "/github", "/ig", "/linkedin", "/ws"].includes(path)))
  ) {
    return NextResponse.next();
  }

  const contentType = explicitMarkdown ? "text/markdown; charset=utf-8" :
    new Negotiator({ headers: { accept: request.headers.get("accept") ?? "*/*" } })
      .mediaType(["text/html; charset=utf-8", "text/markdown; charset=utf-8"]);

  if (!contentType) {
    return new NextResponse(request.method === "HEAD" ? null :
      "Available representations: text/html and text/markdown.\n", {
      status: 406,
      headers: { ...headers, "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store" },
    });
  }

  if (contentType.startsWith("text/markdown")) {
    const destination = request.nextUrl.clone();
    destination.pathname = "/api/markdown";
    destination.search = "";
    destination.searchParams.set("path", explicitMarkdown ? path.slice(0, -"/index.md".length) || "/" : path);
    return NextResponse.rewrite(destination, { headers });
  }

  return NextResponse.next({ headers: {
    ...headers,
    Link: `${headers.Link}, <${siteUrl}${markdownPath(path)}>; rel="alternate"; type="text/markdown"`,
  } });
}

export const config = {
  // Match before Next strips Flight headers from the request passed to proxy.
  matcher: [{ source: "/((?!_next/static|_next/image).*)", missing: [{ type: "header", key: "rsc" }] }],
};
