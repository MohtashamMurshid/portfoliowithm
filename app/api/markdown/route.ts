import { notFoundMarkdown } from "@/lib/agent-resources";
import { getPageMarkdown } from "@/lib/markdown-content";
import { siteUrl } from "@/lib/site";

export function GET(request: Request) {
  // Only exact registered paths are resolved; user input never becomes a file path.
  const path = new URL(request.url).searchParams.get("path") ?? "/";
  const body = getPageMarkdown(path);
  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Vary": "Accept, Accept-Encoding",
    // Keep negotiated responses out of shared caches that ignore custom Vary keys.
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
    "Link": `<${siteUrl}/llms.txt>; rel="describedby"`,
  });
  if (body) {
    headers.append("Link", `<${siteUrl}${path}>; rel="canonical"`);
    if (["/boring", "/archive/1", "/archive/2"].includes(path)) headers.set("X-Robots-Tag", "noindex, follow");
  } else {
    headers.set("X-Robots-Tag", "noindex");
  }
  return new Response(body ?? notFoundMarkdown, { status: body ? 200 : 404, headers });
}
