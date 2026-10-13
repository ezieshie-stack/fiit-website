/*
 * Auto-generated sitemap.xml for FIIT Co.
 *
 * Next 16 picks this file up at build time and serves it at /sitemap.xml.
 * Static routes are listed explicitly; blog routes come from the POSTS
 * data file so adding a new post automatically adds it to the sitemap.
 */
import type { MetadataRoute } from "next";
import { POSTS } from "./blog/posts";

const SITE_URL = "https://fiitco.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/programs`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/studio`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/accessibility`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
