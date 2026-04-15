import Image from "next/image";
import Link from "next/link";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import { getFeaturedPost, getNonFeaturedPosts } from "./posts";

export const metadata = {
  title: "Journal",
  description:
    "Notes from the floor at FIIT Co. — training, habits, nutrition, recipes, and community stories from Leslieville's boxing studio.",
  alternates: { canonical: "https://fiitco.ca/blog" },
  openGraph: {
    title: "Journal — FIIT Co.",
    description:
      "Training, habits, nutrition, and community stories from FIIT Co. Leslieville.",
    url: "https://fiitco.ca/blog",
    images: [{ url: "/blog/new-years-wishes.jpg", alt: "FIIT Co. journal" }],
  },
};

export default function BlogPage() {
  const featured = getFeaturedPost();
  const posts = getNonFeaturedPosts();

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Journal</div>
          <h1 className={styles.headlineLg}>
            Notes From<br />The Floor.
          </h1>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          {/* FEATURED — entire block is a link to the post detail page.
              The .blogCardLink wrapper kills default anchor styling so the
              two-column feature layout renders exactly as before. */}
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
                  {featured.author} · {featured.date} · {featured.readTime}
                </div>
                <div className={styles.blogReadMore}>Read Post →</div>
              </div>
            </div>
          </Link>

          {/* GRID — every card links to its own /blog/<slug> page. */}
          <div className={styles.blogGrid}>
            {posts.map((post) => (
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
                    />
                  </div>
                  <div className={styles.blogCategory}>{post.category}</div>
                  <h3 className={styles.blogTitle}>{post.title}</h3>
                  <p className={styles.blogExcerpt}>{post.excerpt}</p>
                  <div className={styles.blogMeta}>
                    {post.author} · {post.date} · {post.readTime}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
