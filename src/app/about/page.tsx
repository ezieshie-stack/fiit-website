import Link from "next/link";
import Image from "next/image";
import LiveImage from "@/components/ui/live-image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import LiveTrainerList from "@/components/ui/live-trainer-list";
import PromoSlot from "@/components/ui/promo-slot";

export const metadata = {
  title: "About",
  description:
    "How Jason Battiste's boxing obsession became FIIT Co., Toronto's boutique boxing and fitness studio in Leslieville. Our story, mantra, and the community we train alongside.",
  alternates: { canonical: "https://fiitco.ca/about" },
  openGraph: {
    title: "About | FIIT Co.",
    description:
      "Don't stop when you're tired. Stop when you're done. The story behind FIIT Co. Leslieville.",
    url: "https://fiitco.ca/about",
    images: [{ url: "/hero/home.webp", alt: "FIIT Co. training floor" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://fiitco.ca" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://fiitco.ca/about" },
  ],
};

// Trainer rendering moved to <LiveTrainerList/> (client component) which
// reads from Convex and handles both the FIIT + Academy split, plus all
// the per-row JSX including alternating layout. Edit trainer data via the
// ops tool's Website Trainers admin page, not this file.

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <header className={styles.pageHeaderImg}>
        <div className={styles.pageHeaderBgImage}>
          <LiveImage
            slot="about-hero"
            fallbackSrc="/placeholders/hero-about.jpg"
            fallbackAlt="Boxer leaning on the ropes inside the ring at FIIT Co. Leslieville"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Our Story</div>
          <h1 className={styles.headlineLg}>
            A Toronto Boxing Studio,<br />Built By A Champion.
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
            FIIT Co is a boutique boxing studio in Leslieville, Toronto,
            where fitness meets community, and everyone is welcome.
          </p>
        </div>
      </header>

      <PromoSlot name="about:after-hero" />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoColGrid}>
            <div>
              <div className={styles.label}>The Story</div>
              <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
                A Community Where Everyone Thrives.
              </h2>
              <p className={styles.bodyLg} style={{ marginBottom: "1.5rem" }}>
                FIIT Co. is a boutique boxing and fitness studio in Leslieville,
                Toronto. We&apos;re building a boxing community where first-timers
                and working fighters train on the same floor, coached by people
                who have spent their lives in the sport.
              </p>
              <p className={styles.body}>
                This is where you&apos;ll push your limits, test your boundaries,
                and discover what you&apos;re actually capable of. A 2,500 sq ft
                open training floor with heavy bags, strength tools, and the
                room you need to move.
              </p>
            </div>
            <div>
              <div className={styles.label}>The Mantra</div>
              <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
                Don't Stop When You're Tired.
              </h2>
              <p className={styles.bodyLg} style={{ marginBottom: "1.5rem" }}>
                <span className={styles.accent}>Stop when you're done.</span>
              </p>
              <p className={styles.body} style={{ marginBottom: "1.25rem" }}>
                That's the standard that founder Jason Battiste, a former Canadian
                Super Middleweight Kickboxing Champion, built this studio on.
              </p>
              <p className={styles.body}>
                Real coaching. Real technique. A room that welcomes first-timers and
                sharpens fighters on the same floor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>The Room</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "3rem" }}>
            2,500 Square Feet<br />Of Work To Do.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "820px", marginBottom: "3rem" }}>
            Traditional fight gear (heavy bags, focus pads, ground and pound
            dummies, jump ropes) sits alongside strength tools like barbells,
            free weights and kettlebells. Concept2 rowers, Assault Airbikes,
            medicine balls, battle ropes, sleds and TRX trainers round out the
            functional floor.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/studio" className={styles.btnRed}>
              See The Studio
            </Link>
            <Link href="/programs" className={styles.btnOutline}>
              View Programs
            </Link>
          </div>
        </div>
      </section>

      <PromoSlot name="about:after-story" />

      {/* MEET THE TEAM — detail section with per-trainer anchors.
          Homepage team cards link to /about#trainer-<id> so visitors
          land on the right bio when they click through. */}
      <section id="meet-the-team" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Meet The Team</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            The Coaches On<br />Your Corner.
          </h2>

          {/* Live trainer list — reads from Convex, falls back to static
              roster if Convex is unreachable. Handles the FIIT + Academy
              split, alternating row layout, and per-trainer anchors. */}
          <LiveTrainerList />
        </div>
      </section>

      <PromoSlot name="about:after-team" />

      <SiteFooter />
    </>
  );
}
