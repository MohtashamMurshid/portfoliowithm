import fs from "node:fs";
import path from "node:path";

export const renTitle = "Ren";
export const renDescription =
  "Ren is Mohtasham Murshid Madani's personal AI agent, mentioned in the Jev experiment.";

export function getRenBody() {
  return fs.readFileSync(path.join(process.cwd(), "content", "ren.md"), "utf8").trim();
}
