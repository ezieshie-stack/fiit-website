import LiveImage from "@/components/ui/live-image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import LiveStudioLocation from "@/components/ui/live-studio-location";
import PromoSlot from "@/components/ui/promo-slot";

export const metadata = {
  title: "The Studio",
  description:
    "Visit FIIT Co. at 1047 Gerrard St E in Leslieville, Toronto. 2,500 sq ft boxing and fitness floor. Hours, equipment, gallery, and contact.",
  alternates: { canonical: "https://fiitco.ca/studio" },
  openGraph: {
    title: "The Studio | FIIT Co.",
    description:
      "1047 Gerrard St E in Leslieville. Open 7 days. Boxing, strength, and conditioning on one training floor.",
    url: "https://fiitco.ca/studio",
    images: [{ url: "/studio/interior-1.jpg", alt: "FIIT Co. studio interior" }],
  },
};

const HOURS = [
  ["Monday", "6:00 AM – 8:30 PM"],
  ["Tuesday", "6:00 AM – 8:30 PM"],
  ["Wednesday", "6:00 AM – 8:30 PM"],
  ["Thursday", "6:00 AM – 8:30 PM"],
  ["Friday", "6:00 AM – 8:30 PM"],
  ["Saturday", "8:00 AM – 8:30 PM"],
  ["Sunday", "8:00 AM – 8:30 PM"],
];

const EQUIPMENT = [
  { label: "Boxing", name: "Heavy Bags" },
  { label: "Boxing", name: "Focus Pads" },
  { label: "Boxing", name: "Ground & Pound Dummies" },
  { label: "Strength", name: "Barbells & Free Weights" },
  { label: "Strength", name: "Kettlebells" },
  { label: "Conditioning", name: "Concept2 Rowers" },
  { label: "Conditioning", name: "Assault Airbikes" },
  { label: "Functional", name: "TRX Trainers" },
  { label: "Functional", name: "Sleds & Battle Ropes" },
  { label: "Conditioning", name: "Pilates & Yoga Props" },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fiitco.ca" },
    { "@type": "ListItem", position: 2, name: "Studio", item: "https://fiitco.ca/studio" },
  ],
};

export default function StudioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Visit The Studio</div>
          <h1 className={styles.headlineLg}>
            Our Boxing Studio<br />In Leslieville, Toronto.
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
            2,500 square feet of heavy bags, strength tools, and open training
            floor at 1047 Gerrard St E. Open 7 days. First class free.
          </p>
        </div>
      </header>

      <PromoSlot name="studio:after-hero" />

      {/* Location + hours block — reads primary location from Convex,
          falls back to static Leslieville if Convex is unreachable. */}
      <section className={styles.section}>
        <div className={styles.container}>
          <LiveStudioLocation />
        </div>
      </section>

      <PromoSlot name="studio:after-location" />

      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>The Floor</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "1.5rem" }}>
            Inside The Studio.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "720px", marginBottom: "3rem" }}>
            Above The Vatican Gift Shop, corner of Gerrard and Jones. An open,
            boutique layout designed so classes flow from skill work to
            conditioning without breaking rhythm.
          </p>
          <div className={styles.galleryGrid}>
            <div className={`${styles.galleryItem} ${styles.galleryTall}`}>
              <LiveImage slot="studio-gallery-1" fallbackSrc="/studio/interior-1.jpg" fallbackAlt="FIIT Co. boxing studio training floor in Leslieville Toronto" fill sizes="(max-width: 860px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <LiveImage slot="studio-gallery-2" fallbackSrc="/studio/interior-2.jpg" fallbackAlt="Row of heavy bags at FIIT Co. boxing gym" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <LiveImage slot="studio-gallery-3" fallbackSrc="/studio/interior-3.jpg" fallbackAlt="Strength and conditioning area at FIIT Co. Leslieville" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <LiveImage slot="studio-gallery-4" fallbackSrc="/studio/interior-4.jpg" fallbackAlt="Barbells, kettlebells, and free weights at FIIT Co. boxing studio" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <LiveImage slot="studio-gallery-5" fallbackSrc="/studio/interior-5.jpg" fallbackAlt="Open boutique training layout at FIIT Co. boxing gym in Toronto" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <LiveImage slot="studio-gallery-6" fallbackSrc="/studio/interior-6.jpg" fallbackAlt="FIIT Co. boxing floor, 1047 Gerrard St E Leslieville" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <LiveImage slot="studio-gallery-7" fallbackSrc="/studio/interior-7.jpg" fallbackAlt="Functional conditioning space with rowers and airbikes at FIIT Co." fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <PromoSlot name="studio:after-gallery" />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Equipment</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            2,500 Sq Ft.<br />Fully Loaded.
          </h2>
          <div className={styles.equipmentGrid}>
            {EQUIPMENT.map((e) => (
              <div key={e.name} className={styles.equipmentItem}>
                <div className={styles.equipmentLabel}>{e.label}</div>
                <div className={styles.equipmentName}>{e.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PromoSlot name="studio:after-equipment" />

      <SiteFooter />
    </>
  );
}
