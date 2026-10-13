import Link from "next/link";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import CollaboratorsGrid from "./CollaboratorsGrid";

export const metadata = {
  title: "Community",
  description:
    "FIIT Co. community in Leslieville, Toronto. Our collaborators on Gerrard St East — neighbours we train alongside, refer members to, and build the block with.",
  alternates: { canonical: "https://fiitco.ca/community" },
  openGraph: {
    title: "Community | FIIT Co.",
    description:
      "Local collaborators on Gerrard St E — the people who make Leslieville what it is.",
    url: "https://fiitco.ca/community",
    images: [{ url: "/hero/home.webp", alt: "FIIT Co. in Leslieville" }],
  },
};

export default function CommunityPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "7rem 0 5rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className={styles.container}>
          <div className={styles.label} style={{ marginBottom: "1.25rem" }}>
            Community
          </div>
          <h1
            className={styles.headlineXl}
            style={{ marginBottom: "2rem", maxWidth: "16ch" }}
          >
            Leslieville Runs<br />On Local.
          </h1>
          <p className={styles.bodyLg} style={{ maxWidth: "62ch" }}>
            FIIT Co.&apos;s corner on Gerrard East is a block of independently
            owned storefronts. Our neighbours are the people we train
            alongside, refer our members to, and build this community with.
          </p>
        </div>
      </section>

      {/* ── Collaborators ──────────────────────────────────────────── */}
      <CollaboratorsGrid />

      {/* ── Further reading ───────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.headlineLg} style={{ marginBottom: "1.75rem" }}>
            Why This Corner<br />Matters.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "62ch", marginBottom: "2.5rem" }}>
            A longer read on why we chose 1047 Gerrard, the neighbours who
            keep the block busy, and where we fit in the wider Leslieville
            story.
          </p>
          <Link href="/blog/support-local" className={styles.btnOutline}>
            Read: Support Local →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
