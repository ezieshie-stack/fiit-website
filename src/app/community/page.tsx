import Link from "next/link";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
// COLLABORATORS now live in Convex — rendered via <LiveCollaborators/>
// below. The static array in _data/community.ts is kept as a fallback for
// when Convex is unreachable.
import LiveCollaborators from "@/components/ui/live-collaborators";
import PromoSlot from "@/components/ui/promo-slot";

export const metadata = {
  title: "Community",
  description:
    "The local businesses FIIT Co. trains alongside in Leslieville, Toronto. Coffee, nutrition, wellness, and neighbourhood partners who share the block at 1047 Gerrard St E.",
  alternates: { canonical: "https://fiitco.ca/community" },
  openGraph: {
    title: "Community | FIIT Co.",
    description:
      "The Leslieville neighbours FIIT Co. trains alongside. Coffee, nutrition, wellness, and the corner of Gerrard and Jones.",
    url: "https://fiitco.ca/community",
    images: [{ url: "/hero/home.webp", alt: "FIIT Co. community" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fiitco.ca" },
    { "@type": "ListItem", position: 2, name: "Community", item: "https://fiitco.ca/community" },
  ],
};

export default function CommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Community</div>
          <h1 className={styles.headlineLg}>
            Leslieville Runs<br />On Local.
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
            FIIT Co. sits on a corner of Gerrard East where every second
            storefront belongs to someone who took a risk to open it. These
            are the neighbours we train alongside, refer members to, and
            build the community with.
          </p>
        </div>
      </header>

      <PromoSlot name="community:after-hero" />

      {/* Collaborator grid — reads live from Convex (edited via ops tool's
          Website Community admin). Falls back to the static roster if
          Convex is unreachable. Handles the "Coming soon" tag for
          unconfirmed placeholder entries. */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Our Collaborators</div>
          <h2 className={styles.headlineMd} style={{ marginBottom: "4rem" }}>
            Neighbours On The Block.
          </h2>
          <LiveCollaborators />
        </div>
      </section>

      <PromoSlot name="community:after-collaborators" />

      {/* CTA — tease the Journal "Support Local" blog post for context on
          why this page exists. Keeps visitors inside the site instead of
          dead-ending if no external links are clicked. */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>Further Reading</div>
          <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
            Why This Corner Matters.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "720px", marginBottom: "2.5rem" }}>
            More on why we picked 1047 Gerrard, the neighbours who keep the
            block alive, and how FIIT Co. fits into the bigger Leslieville
            picture.
          </p>
          <Link
            href="/blog/support-local"
            className={styles.btnOutline}
          >
            Read: Support Local →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
