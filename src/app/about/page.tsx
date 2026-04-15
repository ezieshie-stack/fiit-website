import Link from "next/link";
import Image from "next/image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";
import { TRAINERS } from "../_data/trainers";

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

export default function AboutPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>About</div>
          <h1 className={styles.headlineLg}>
            Built By Fighters.<br />Run For Everyone.
          </h1>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.twoColGrid}>
            <div>
              <div className={styles.label}>The Story</div>
              <h2 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
                A Community Where Everyone Thrives.
              </h2>
              <p className={styles.bodyLg} style={{ marginBottom: "1.5rem" }}>
                At FIIT Co., we're dedicated to creating a community where everyone
                thrives. Our fitness studio in Toronto, ON combines expert fight
                training with a dynamic and welcoming environment.
              </p>
              <p className={styles.body}>
                This is where you'll push your limits, test your boundaries, and
                discover your inner champion. FIIT Co. offers an intimate, boutique
                space with a spacious open layout designed to maximize your training
                experience.
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
                That's the standard founder Jason Battiste, a former Canadian Super
                Middleweight Kickboxing Champion with 37+ years of combat experience,
                built this studio on.
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
            6,000 Square Feet<br />Of Work To Do.
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

      {/* MEET THE TEAM — detail section with per-trainer anchors.
          Homepage team cards link to /about#trainer-<id> so visitors
          land on the right bio when they click through. */}
      <section id="meet-the-team" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Meet The Team</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            The Coaches On<br />Your Corner.
          </h2>

          <div className={styles.trainerList}>
            {TRAINERS.map((t, i) => {
              const paragraphs = t.fullBio && t.fullBio.length > 0
                ? t.fullBio
                : t.bio
                ? [t.bio]
                : [];
              // Alternate left/right layout so the page has rhythm
              // instead of a stack of identical cards.
              const reversed = i % 2 === 1;
              return (
                <article
                  key={t.id}
                  id={`trainer-${t.id}`}
                  className={`${styles.trainerRow} ${
                    reversed ? styles.trainerRowReversed : ""
                  }`}
                >
                  <div className={styles.trainerPortrait}>
                    {t.img ? (
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        sizes="(max-width: 860px) 100vw, 40vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className={styles.trainerPortraitFallback}>
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div className={styles.trainerContent}>
                    <div className={styles.trainerRoleLabel}>{t.role}</div>
                    <h3 className={styles.trainerNameBig}>{t.name}</h3>
                    {t.tags && t.tags.length > 0 && (
                      <div className={styles.trainerTagRow}>
                        {t.tags.map((tag) => (
                          <span key={tag} className={styles.trainerTagChip}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className={styles.trainerParagraphs}>
                      {paragraphs.map((para, idx) => (
                        <p key={idx} className={styles.body}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
