/*
 * robots.txt for FIIT Co.
 *
 * Next 16 serves this at /robots.txt. Allows everything by default and
 * points crawlers at the auto-generated sitemap. Keeps Next internal
 * paths and any future API routes out of the index.
 */
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://fiitco.ca/sitemap.xml",
    host: "https://fiitco.ca",
  };
}
