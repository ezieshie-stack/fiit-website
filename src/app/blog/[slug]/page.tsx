/*
 * /blog/[slug] — individual post detail page.
 *
 * Server-rendered with Incremental Static Regeneration (ISR):
 *   - generateStaticParams pre-renders all currently-published slugs at
 *     build time for instant first-load
 *   - `revalidate = 60` re-fetches each page every 60 seconds at the edge,
 *     so Arden's edits in the ops admin are live within ~1 minute
 *   - `dynamicParams = true` lets brand-new posts render without a rebuild
 *     (first request does an on-demand fetch, subsequent hits use the cache)
 *
 * Data source: Convex `blogPosts` (edited via ops tool Website Blog admin).
 * Falls back to the static roster in posts.ts if Convex is unreachable —
 * page never 500s just because the database is having a moment.
 */

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ConvexHttpClient } from "convex/browser";
import { anyApi } from "convex/server";
import styles from "../../site.module.css";
import SiteFooter from "../../_components/SiteFooter";
import TipTapRenderer from "@/components/ui/tiptap-renderer";
import { POSTS, getPostBySlug, type BlogPost } from "../posts";

// ISR configuration — rebuild each post page at most once per minute.
export const revalidate = 60;
// Accept any slug; resolve on demand if not in generateStaticParams.
export const dynamicParams = true;

// ── Data types shared between Convex responses and fallback posts ─────

type LivePost = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime?: string;
  coverImageUrl?: string;
  bodyJson: string;
  status: string;
  featured: boolean;
  publishedAt?: string;
};

/**
 * Unified post view used throughout this page. Either comes from a live
 * Convex record (bodyJson) or the static fallback (body array of strings).
 */
type UnifiedPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  img: string;
  /** TipTap JSON doc, when available. */
  bodyJson?: string;
  /** Legacy paragraph array, used when bodyJson is absent. */
  bodyParagraphs?: string[];
};

function liveToUnified(p: LivePost): UnifiedPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-CA", {
          month: "long", day: "numeric", year: "numeric",
        })
      : "",
    readTime: p.readTime ?? "",
    img: p.coverImageUrl ?? "/placeholders/hero-blog.jpg",
    bodyJson: p.bodyJson,
  };
}

function staticToUnified(p: BlogPost): UnifiedPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    readTime: p.readTime,
    img: p.img,
    bodyParagraphs: p.body,
  };
}

// ── Convex fetch helpers (server-side, cached per request) ───────────

function getConvexClient(): ConvexHttpClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  return new ConvexHttpClient(url);
}

async function fetchLivePost(slug: string): Promise<LivePost | null> {
  const client = getConvexClient();
  if (!client) return null;
  try {
    const result = await client.query(
      anyApi.websiteContent.getBlogPostBySlug,
      { slug }
    );
    return (result as LivePost | null) ?? null;
  } catch {
    return null;
  }
}

async function fetchAllLivePublished(): Promise<LivePost[]> {
  const client = getConvexClient();
  if (!client) return [];
  try {
    const result = await client.query(anyApi.websiteContent.listPublishedBlogPosts);
    return (result as LivePost[]) ?? [];
  } catch {
    return [];
  }
}

// ── Merged getter — prefers live Convex data, falls back to static ───

async function getPost(slug: string): Promise<UnifiedPost | null> {
  const live = await fetchLivePost(slug);
  if (live && live.status === "published") return liveToUnified(live);
  const fallback = getPostBySlug(slug);
  return fallback ? staticToUnified(fallback) : null;
}

// Next 16 passes params as a Promise.
type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  // Prefer live slugs; if Convex is unreachable at build time, fall back
  // to the static roster so the build doesn't fail.
  const live = await fetchAllLivePublished();
  if (live.length > 0) {
    return live.map((p) => ({ slug: p.slug }));
  }
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://fiitco.ca/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | FIIT Co. Journal`,
      description: post.excerpt,
      url: `https://fiitco.ca/blog/${post.slug}`,
      type: "article",
      ...(post.date ? { publishedTime: post.date } : {}),
      authors: [post.author],
      images: [{ url: post.img, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.img],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // Related posts: up to 3 others, preferring live published roster
  const liveAll = await fetchAllLivePublished();
  const allUnified: UnifiedPost[] =
    liveAll.length > 0
      ? liveAll.map(liveToUnified)
      : POSTS.map(staticToUnified);
  const moreReading = allUnified.filter((p) => p.slug !== post.slug).slice(0, 3);

  // BlogPosting + BreadcrumbList JSON-LD for rich-result structured data.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.img.startsWith("http") ? post.img : `https://fiitco.ca${post.img}`,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "FIIT Co.",
      logo: { "@type": "ImageObject", url: "https://fiitco.ca/brand/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://fiitco.ca/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://fiitco.ca" },
      { "@type": "ListItem", position: 2, name: "Journal", item: "https://fiitco.ca/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://fiitco.ca/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Hero — full-bleed image with the title overlaid. */}
      <header className={styles.postHero}>
        <div className={styles.postHeroImg}>
          <Image
            src={post.img}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
            unoptimized={post.img.startsWith("http")}
          />
          <div className={styles.postHeroScrim} aria-hidden="true" />
        </div>
        <div className={styles.postHeroInner}>
          <div className={styles.blogCategory}>{post.category}</div>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postMeta}>
            {post.author}
            {post.date && ` · ${post.date}`}
            {post.readTime && ` · ${post.readTime}`}
          </div>
        </div>
      </header>

      {/* Body — either TipTap JSON (live) or legacy paragraph array */}
      <article className={styles.postArticle}>
        <div className={styles.postBody}>
          {post.bodyJson ? (
            <TipTapRenderer json={post.bodyJson} />
          ) : (
            (post.bodyParagraphs ?? []).map((para, i) => (
              <p key={i} className={styles.postPara}>
                {para}
              </p>
            ))
          )}
          <div className={styles.postSignoff}>
            <Link href="/blog" className={styles.postBackLink}>
              ← Back to Journal
            </Link>
          </div>
        </div>
      </article>

      {/* More reading — keeps the reader in the journal. */}
      {moreReading.length > 0 && (
        <section className={styles.sectionDark}>
          <div className={styles.container}>
            <div className={styles.label}>Keep Reading</div>
            <h2 className={styles.headlineMd} style={{ marginBottom: "2.5rem" }}>
              More From The Journal.
            </h2>
            <div className={styles.blogGrid}>
              {moreReading.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className={styles.blogCardLink}
                  aria-label={`Read: ${p.title}`}
                >
                  <article className={styles.blogCard}>
                    <div className={styles.blogCardImg}>
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        sizes="(max-width: 860px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                        unoptimized={p.img.startsWith("http")}
                      />
                    </div>
                    <div className={styles.blogCategory}>{p.category}</div>
                    <h3 className={styles.blogTitle}>{p.title}</h3>
                    <p className={styles.blogExcerpt}>{p.excerpt}</p>
                    <div className={styles.blogMeta}>
                      {p.author}
                      {p.date && ` · ${p.date}`}
                      {p.readTime && ` · ${p.readTime}`}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
