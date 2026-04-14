import Link from "next/link";
import styles from "./site.module.css";
import CtaSection from "./_components/CtaSection";
import SiteFooter from "./_components/SiteFooter";

const MINDBODY_URL =
  "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377";

const TRAINERS = [
  {
    name: "Jason Battiste",
    role: "Owner · Head Coach",
    bio: "Former Canadian Super Middleweight Kickboxing Champion with 37+ years in combat training.",
    tags: ["Boxing", "Kickboxing"],
  },
  {
    name: "Sarah Green",
    role: "Coach · Strength",
    bio: "Certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years' experience.",
    tags: ["Strength", "Mobility"],
  },
  {
    name: "Tyrone Warner",
    role: "Coach · Boxing Academy",
    bio: "Turns first-timers into confident boxers through the Academy program.",
    tags: ["Academy", "Fundamentals"],
  },
  {
    name: "Nick Radionov",
    role: "Coach · Boxing Academy",
    bio: "Former Ukrainian National Olympic team member. Boxing Ontario certified coach with 200+ bouts.",
    tags: ["Academy", "Competition"],
  },
  {
    name: "Matt Makar",
    role: "Coach · Movement",
    bio: "Movement coach blending mobility, recovery, and skill work into every session.",
    tags: ["Movement", "Recovery"],
  },
  {
    name: "Jaye Pan",
    role: "Coach · Strength & Conditioning",
    bio: "S&C coach with a background in kinesiology, varsity athletics, and rehab-focused training.",
    tags: ["Strength", "Performance"],
  },
];

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroWatermark}>FIIT</div>
        <div className={styles.heroInner}>
          <div className={styles.label}>Est. Toronto</div>
          <h1 className={styles.headlineXl}>
            Fight For<br />Your Best Self.
          </h1>
          <div className={styles.heroBottom}>
            <div className={styles.heroCtas}>
              <a
                href={MINDBODY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnRed}
              >
                Book Free Class
              </a>
              <Link href="/programs" className={styles.btnOutline}>
                Our Programs
              </Link>
            </div>
            <div className={styles.heroAddress}>
              1047 Gerrard St E<br />
              Toronto · Leslieville
            </div>
          </div>
        </div>
      </section>

      <div className={styles.strip}>
        <div className={styles.stripText}>
          Boxing · Strength · Conditioning · Bootcamp · Academy · Mobility · HIIT · Recovery · Private Coaching
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>The Approach</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "5rem" }}>
            Three Pillars.<br />One Standard.
          </h2>
          <div className={styles.pillarsGrid}>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>01</div>
              <h3 className={styles.pillarTitle}>Boxing First</h3>
              <p className={styles.body}>
                Everything at FIIT is built around the sweet science. Real technique,
                real coaching, real fighters on the floor.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>02</div>
              <h3 className={styles.pillarTitle}>Nine Disciplines</h3>
              <p className={styles.body}>
                From bootcamp to strength to academy boxing — nine class formats
                designed to stack into a complete program.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>03</div>
              <h3 className={styles.pillarTitle}>Serious Recovery</h3>
              <p className={styles.body}>
                Mobility, stretching, and recovery are built into the schedule.
                Training hard only works if the body can keep up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>The Team</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "5rem" }}>
            Coaches Who<br />Coach For Real.
          </h2>
          <div className={styles.teamGrid}>
            {TRAINERS.map((t) => (
              <div key={t.name} className={styles.trainerCard}>
                <div className={styles.trainerImg}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-oswald)",
                      fontSize: "4rem",
                      color: "rgba(255,255,255,0.18)",
                      letterSpacing: "-2px",
                    }}
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>
                <div className={styles.trainerRole}>{t.role}</div>
                <div className={styles.trainerName}>{t.name}</div>
                <p className={styles.trainerBio}>{t.bio}</p>
                <div className={styles.trainerTags}>
                  {t.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>35+</div>
              <div className={styles.statLabel}>Years Combined Experience</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>6000</div>
              <div className={styles.statLabel}>Square Feet</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>9</div>
              <div className={styles.statLabel}>Class Formats</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Academy Levels</div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
    </>
  );
}
