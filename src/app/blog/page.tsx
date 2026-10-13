import LiveImage from "@/components/ui/live-image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import LiveBlogGrid from "@/components/ui/live-blog-grid";
import PromoSlot from "@/components/ui/promo-slot";

export const metadata = {
  title: "Journal",
  description:
    "Notes from the floor at FIIT Co.: training, habits, nutrition, recipes, and community stories from Leslieville's boxing studio.",
  alternates: { canonical: "https://fiitco.ca/blog" },
  openGraph: {
    title: "Journal | FIIT Co.",
    description:
      "Training, habits, nutrition, and community stories from FIIT Co. Leslieville.",
    url: "https://fiitco.ca/blog",
    images: [{ url: "/blog/new-years-wishes.jpg", alt: "FIIT Co. journal" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fiitco.ca" },
    { "@type": "ListItem", position: 2, name: "Journal", item: "https://fiitco.ca/blog" },
  ],
};

/**
 * Blog listing — hero stays static, the featured + grid cards below read
 * live from Convex (edited via ops tool's Website Blog admin). Static
 * fallback in posts.ts handles the empty / unreachable case.
 */
export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className={styles.pageHeaderImg}>
        <div className={styles.pageHeaderBgImage}>
          <LiveImage
            slot="blog-hero"
            fallbackSrc="/placeholders/hero-blog.jpg"
            fallbackAlt="Sparring boxers trade punches at FIIT Co. boxing studio Toronto"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Journal</div>
          <h1 className={styles.headlineLg}>
            The FIIT Co.<br />Boxing Journal.
          </h1>
          <p
            style={{
              maxWidth: "720px",
              marginTop: "1.5rem",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.6,
            }}
          >
            Training, habits, nutrition, and community stories from our
            boutique boxing studio in Leslieville, Toronto.
          </p>
        </div>
      </header>

      <PromoSlot name="journal:after-hero" />

      <section className={styles.section}>
        <div className={styles.container}>
          <LiveBlogGrid />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
