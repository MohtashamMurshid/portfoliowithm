import type { MetadataRoute } from "next";
import { archiveProjects } from "@/lib/archiveProjects";
import { blogPosts } from "@/lib/blogPosts";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mohtasham.dev";
  const siteUpdated = new Date("2026-08-26T00:00:00Z");
  return [
    {
      url: `${baseUrl}/`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/boring`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.modifiedDate}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: new Date(`${project.dateModified}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...archiveProjects.map((project) => ({
      url: `${baseUrl}/work/archive/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];
}
