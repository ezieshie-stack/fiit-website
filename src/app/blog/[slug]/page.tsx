/*
 * /blog/[slug] — individual post detail page.
 *
 * Reads from the shared posts.ts data file. Uses generateStaticParams so
 * every post gets pre-rendered at build time (fast, SEO-friendly, no
 * runtime fetches). Uses generateMetadata to stamp each post with its
 * own title + OG image for proper social sharing.
 */

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "../../site.module.css";
import SiteFooter from "../../_components/SiteFooter";
import { POSTS, getPostBySlug } from "../posts";

// Next 16 passes params as a Promise that must be awaited.
type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://fiitco.ca/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} — FIIT Co. Journal`,
      description: post.excerpt,
      url: `https://fiitco.ca/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
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
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  // Suggest up to 2 "more reading" posts so the bottom of the article
  // keeps the reader on the site instead of dead-ending.
  const moreReading = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
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
          />
          <div className={styles.postHeroScrim} aria-hidden="true" />
        </div>
        <div className={styles.postHeroInner}>
          <div className={styles.blogCategory}>{post.category}</div>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postMeta}>
            {post.author} · {post.date} · {post.readTime}
          </div>
        </div>
      </header>

      {/* Body — prose column at comfortable reading width. */}
      <article className={styles.postArticle}>
        <div className={styles.postBody}>
          {post.body.map((para, i) => (
            <p key={i} className={styles.postPara}>
              {para}
            </p>
          ))}
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
                      />
                    </div>
                    <div className={styles.blogCategory}>{p.category}</div>
                    <h3 className={styles.blogTitle}>{p.title}</h3>
                    <p className={styles.blogExcerpt}>{p.excerpt}</p>
                    <div className={styles.blogMeta}>
                      {p.author} · {p.date} · {p.readTime}
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
