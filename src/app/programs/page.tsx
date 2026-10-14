import LiveImage from "@/components/ui/live-image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import LivePrograms from "@/components/ui/live-programs";
import PromoSlot from "@/components/ui/promo-slot";

export const metadata = {
  title: "Programs & Pricing",
  description:
    "Twelve class formats at FIIT Co. Leslieville: boxing, HIIT, strength & conditioning, Muay Thai, and the FIIT Boxing Academy. Memberships, class packs, personal training, kids & teens pricing.",
  alternates: { canonical: "https://fiitco.ca/programs" },
  openGraph: {
    title: "Programs & Pricing | FIIT Co.",
    description:
      "Twelve class formats. Memberships, class packs, personal training, and Boxing Academy at 1047 Gerrard St E.",
    url: "https://fiitco.ca/programs",
    images: [{ url: "/classes/hybrid.webp", alt: "FIIT Co. class format" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fiitco.ca" },
    { "@type": "ListItem", position: 2, name: "Programs & Pricing", item: "https://fiitco.ca/programs" },
  ],
};

/**
 * Programs page — hero stays static, everything below is <LivePrograms/>
 * which pulls class formats + pricing plans live from Convex (edited via
 * ops tool's Website Class Formats + Website Pricing admin pages) and
 * falls back to static data if Convex is unreachable.
 */
export default function ProgramsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className={styles.pageHeaderImg}>
        <div className={styles.pageHeaderBgImage}>
          <LiveImage
            slot="programs-hero"
            fallbackSrc="/placeholders/hero-programs.jpg"
            fallbackAlt="Athletes jumping rope at FIIT Co. boxing studio in Leslieville Toronto"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Programs & Pricing</div>
          <h1 className={styles.headlineLg}>
            Boxing & Fitness Classes In Toronto.<br />Twelve Formats, One Floor.
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
            Boxing, Muay Thai, Strength & Conditioning, HIIT, and the Boxing
            Academy. Group classes, personal training, and kids programs at
            FIIT Co. Leslieville.
          </p>
        </div>
      </header>

      <PromoSlot name="programs:after-hero" />

      <LivePrograms />

      <PromoSlot name="programs:after-academy" />

      <SiteFooter />
    </>
  );
}
