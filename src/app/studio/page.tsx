import Image from "next/image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";

export const metadata = {
  title: "The Studio",
  description:
    "Visit FIIT Co. at 1047 Gerrard St E in Leslieville, Toronto. 6,000 sq ft boxing and fitness floor. Hours, equipment, gallery, and contact.",
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
];

export default function StudioPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>The Studio</div>
          <h1 className={styles.headlineLg}>
            Leslieville's<br />Fight Floor.
          </h1>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoColGrid}>
            <div>
              <div className={styles.label}>Location</div>
              <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
                1047 Gerrard St E
              </h2>
              <p className={styles.bodyLg} style={{ marginBottom: "2.5rem" }}>
                Toronto, ON M4M 1Z7<br />
                Leslieville, just east of Jones Ave.
              </p>

              <div className={styles.contactRow}>
                <div>
                  <div className={styles.contactLabel}>Phone</div>
                  <div className={styles.body}>(416) 565-9300</div>
                </div>
                <div>
                  <div className={styles.contactLabel}>Email</div>
                  <div className={styles.body}>info@fiitco.ca</div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.label}>Hours</div>
              <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
                Open 7 Days.
              </h2>
              <table className={styles.hoursTable}>
                <tbody>
                  {HOURS.map(([day, hours]) => (
                    <tr key={day}>
                      <td>{day}</td>
                      <td>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

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
              <Image src="/studio/interior-1.jpg" alt="FIIT Co. training floor" fill sizes="(max-width: 860px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/studio/interior-2.jpg" alt="FIIT Co. heavy bags" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/studio/interior-3.jpg" alt="FIIT Co. strength area" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/studio/interior-4.jpg" alt="FIIT Co. equipment" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/studio/interior-5.jpg" alt="FIIT Co. open layout" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/studio/interior-6.jpg" alt="FIIT Co. boxing floor" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/studio/interior-7.jpg" alt="FIIT Co. conditioning space" fill sizes="(max-width: 860px) 50vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Equipment</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            6,000 Sq Ft.<br />Fully Loaded.
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

      <SiteFooter />
    </>
  );
}
