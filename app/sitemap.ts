import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogPosts";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mohtasham.dev";
  const now = new Date();
  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/boring`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];
}
