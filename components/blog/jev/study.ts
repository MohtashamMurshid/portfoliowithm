import study from "./study.json";

export { study };
export const models = ["jev", "gpt-oss", "mercury", "gemini"] as const;
export type Model = (typeof models)[number];
export const colors: Record<Model, string> = {
  jev: "#41697c",
  "gpt-oss": "#68786a",
  mercury: "#a07347",
  gemini: "#80658c",
};
export const shortNames: Record<Model, string> = {
  jev: "Jev 1.13",
  "gpt-oss": "GPT-OSS",
  mercury: "Mercury 2.5",
  gemini: "Gemini Flash",
};
export const percent = (value: number) => `${(value * 100).toFixed(1)}%`;
export const seconds = (ms: number) => `${(ms / 1000).toFixed(3)} s`;
export const dollars = (value: number) => `$${value.toFixed(3)}`;
export const figureUrl = (id: string) => `https://www.mohtasham.dev/blog/jev-vs-a-fast-llm#${id}`;
