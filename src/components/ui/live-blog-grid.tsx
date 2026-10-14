"use client";

/**
 * Live-data wrapper for the /blog listing page. Reads published posts
 * from Convex (edited via ops tool's Website Blog admin), falls back
 * to the static posts.ts roster if Convex is unreachable.
 *
 * Renders the same layout as the previous inline version: a single
 * featured hero card + a 3-up grid of the rest.
 */

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "@/app/site.module.css";
import { POSTS, type BlogPost } from "@/app/blog/posts";

type LivePost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime?: string;
  coverImageUrl?: string;
  status: string;
  featured: boolean;
  publishedAt?: string;
};

// Convert a live Convex post into the shape the existing card components
// already expect. Fields that don't exist on Convex records map sensibly.
function toBlogPost(live: LivePost): BlogPost {
  return {
    slug: live.slug,
    category: live.category,
    title: live.title,
    excerpt: live.excerpt,
    author: live.author,
    date: live.publishedAt
      ? new Date(live.publishedAt).toLocaleDateString("en-CA", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "",
    readTime: live.readTime ?? "",
    img: live.coverImageUrl ?? "/placeholders/hero-blog.jpg",
    body: [],        // body only used on detail page — list cards don't need it
    featured: live.featured,
  };
}

export default function LiveBlogGrid() {
  const live = useQuery(anyApi.websiteContent.listPublishedBlogPosts) as
    | LivePost[]
    | undefined;

  const hasLive = Array.isArray(live) && live.length > 0;
  const posts: BlogPost[] = hasLive ? live!.map(toBlogPost) : POSTS;

  // Featured = the single post marked featured, or fall back to the first
  // one if nothing is explicitly featured. Matches the previous behaviour.
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  if (!featured) {
    return (
      <p style={{ color: "rgba(255,255,255,0.55)", textAlign: "center", padding: "4rem 0" }}>
        No posts yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      {/* FEATURED — entire block is a link to the post detail page. */}
      <Link
        href={`/blog/${featured.slug}`}
        className={styles.blogCardLink}
        aria-label={`Read: ${featured.title}`}
      >
        <div className={styles.blogFeatured}>
          <div className={styles.blogFeaturedImg}>
            <Image
              src={featured.img}
              alt={featured.title}
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              unoptimized={featured.img.startsWith("http")}
            />
          </div>
          <div>
            <div className={styles.blogCategory}>{featured.category}</div>
            <h2 className={styles.headlineMd} style={{ marginBottom: "1.25rem" }}>
              {featured.title}
            </h2>
            <p className={styles.bodyLg} style={{ marginBottom: "1.5rem" }}>
              {featured.excerpt}
            </p>
            <div className={styles.blogMeta}>
              {featured.author}
              {featured.date && ` · ${featured.date}`}
              {featured.readTime && ` · ${featured.readTime}`}
            </div>
            <div className={styles.blogReadMore}>Read Post →</div>
          </div>
        </div>
      </Link>

      {/* GRID — everything else */}
      {rest.length > 0 && (
        <div className={styles.blogGrid}>
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={styles.blogCardLink}
              aria-label={`Read: ${post.title}`}
            >
              <article className={styles.blogCard}>
                <div className={styles.blogCardImg}>
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 860px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    unoptimized={post.img.startsWith("http")}
                  />
                </div>
                <div className={styles.blogCategory}>{post.category}</div>
                <h3 className={styles.blogTitle}>{post.title}</h3>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <div className={styles.blogMeta}>
                  {post.author}
                  {post.date && ` · ${post.date}`}
                  {post.readTime && ` · ${post.readTime}`}
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
