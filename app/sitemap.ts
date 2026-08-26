import type { MetadataRoute } from "next";
import { archiveProjects } from "@/lib/archiveProjects";
import { blogPosts } from "@/lib/blogPosts";
import { projects } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = new Date("2026-08-26T00:00:00Z");
  return [
    {
      url: siteUrl,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/books`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.modifiedDate}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      lastModified: new Date(`${project.dateModified}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...archiveProjects.map((project) => ({
      url: `${siteUrl}/work/archive/${project.slug}`,
      lastModified: new Date(`${project.year}-01-01T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.55,
    })),
  ];
}
