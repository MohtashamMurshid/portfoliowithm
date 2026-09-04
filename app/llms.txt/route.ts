import { llmsText } from "@/lib/agent-resources";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText, { headers: {
    "Content-Type": "text/plain; charset=utf-8",
    "Link": `<${siteUrl}/developers>; rel="related"`,
  } });
}
