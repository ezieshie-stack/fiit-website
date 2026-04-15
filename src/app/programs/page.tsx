import Image from "next/image";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";

export const metadata = {
  title: "Programs & Pricing",
  description:
    "Twelve class formats at FIIT Co. Leslieville: boxing, HIIT, strength, Muay Thai, yoga, and Boxing Academy. Memberships, class packs, personal training, kids & teens pricing.",
  alternates: { canonical: "https://fiitco.ca/programs" },
  openGraph: {
    title: "Programs & Pricing — FIIT Co.",
    description:
      "Twelve class formats. Memberships, class packs, personal training, and Boxing Academy at 1047 Gerrard St E.",
    url: "https://fiitco.ca/programs",
    images: [{ url: "/classes/hybrid.webp", alt: "FIIT Co. class format" }],
  },
};

const MINDBODY_URL =
  "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377";

const PROGRAMS = [
  {
    num: "01",
    tag: "Endurance",
    title: "FIIT Endure",
    img: "/classes/endure.webp",
    includes: ["Fight-inspired intervals", "Stamina & speed", "Agility & flexibility", "Later-round fuel"],
    who: "Endurance-style fight training. Fighters start strong and take over at the end.",
  },
  {
    num: "02",
    tag: "Hybrid",
    title: "FIIT Hybrid",
    img: "/classes/hybrid.webp",
    includes: ["Boxing drills", "4 functional rounds", "Race-inspired format", "Team energy"],
    who: "Playfully known as Hybox — boxing drills meet functional stations over four rounds.",
  },
  {
    num: "03",
    tag: "Strength",
    title: "FIIT Lift",
    img: "/classes/lift.webp",
    includes: ["9 stations", "Barbells & kettlebells", "Compound lifts", "Lean muscle work"],
    who: "Traditional muscle-building designed to increase strength and lean mass.",
  },
  {
    num: "04",
    tag: "Boxing",
    title: "FIIT Boxing Pad Work",
    img: "/classes/pad-work.webp",
    includes: ["Partner rounds", "Holding & striking", "Technique focus", "Real drills"],
    who: "Curated partner rounds to refine proper boxing technique.",
  },
  {
    num: "05",
    tag: "Boxing",
    title: "FIIT Boxing Bag Work",
    img: "/classes/bag-work.webp",
    includes: ["Heavy bag rounds", "Full-body work", "All fitness levels", "Power & flow"],
    who: "Intense, full-body bag workout built for every level.",
  },
  {
    num: "06",
    tag: "Circuit",
    title: "FIIT Caveman Circuit",
    img: "/classes/caveman.webp",
    includes: ["10 dynamic stations", "5-min rounds", "Push, pull, run", "Mental & physical test"],
    who: "The original FIIT circuit — tests your mental and physical endurance.",
  },
  {
    num: "07",
    tag: "Muay Thai",
    title: "Muay Thai Kickboxing",
    img: "/classes/muay-thai.webp",
    includes: ["Punches & kicks", "Elbows & knees", "Cardio blocks", "Strength finish"],
    who: "Powerful strikes combined with intense cardio and strength training.",
  },
  {
    num: "08",
    tag: "Recovery",
    title: "Yin Yoga",
    img: null,
    includes: ["Slow deep holds", "Tissue release", "Joint strength", "Nervous system reset"],
    who: "Your recovery edge. Long holds open tight tissue and reset the system.",
  },
  {
    num: "09",
    tag: "Academy · L1",
    title: "Boxing Academy · Fundamentals",
    img: null,
    includes: ["Authentic stance", "Defense & movement", "Combinations", "Rhythm & coordination"],
    who: "Level 1 — learn technique, stance, defense and body control. Coached by Nick Radionov.",
  },
  {
    num: "10",
    tag: "Academy · L2",
    title: "Boxing Academy · Technical Sparring",
    img: null,
    includes: ["Controlled partner drills", "Technical sparring", "Ring craft", "Real application"],
    who: "Level 2 — controlled drills and technical sparring bridge training and fighting.",
  },
  {
    num: "11",
    tag: "Academy · L3",
    title: "Boxing Academy · Competition",
    img: null,
    includes: ["Open sparring", "Tactical development", "Fight preparation", "Competition track"],
    who: "Level 3 — where athletes become fighters. Advanced program, fight preparation.",
  },
  {
    num: "12",
    tag: "Kids & Teens",
    title: "Kids & Teens Program",
    img: null,
    includes: ["Ages 7–17", "Coached progression", "Confidence & discipline", "Structured & fun"],
    who: "Kids (7–12) and Teens (12–17) — empower young fighters through combat training.",
  },
];

// A.1 + A.2 — Group class memberships
const GROUP_MEMBERSHIPS = [
  {
    price: "$49.99",
    name: "2-Week Trial",
    note: "Unlimited · 2 weeks",
    features: [
      "All group classes",
      "Muay Thai, Boxing, Strength, Hybrid",
      "New members only",
      "No commitment",
    ],
    featured: false,
    badge: null,
  },
  {
    price: "$169.99",
    name: "1 Month Unlimited",
    note: "Auto-Renew · $169.99/mo",
    features: [
      "All classes, unlimited",
      "Monthly billing",
      "30-day cancel notice",
      "Most flexibility",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    price: "$149.99",
    name: "10 Classes/Month",
    note: "Auto-Renew · $149.99/mo",
    features: [
      "10 classes per month",
      "Monthly billing",
      "30-day cancel notice",
      "Save on every class",
    ],
    featured: false,
    badge: null,
  },
  {
    price: "$179.99",
    name: "1 Month Unlimited",
    note: "One-time · No auto-renew",
    features: [
      "All classes, unlimited",
      "Expires 1 month from purchase",
      "No commitment",
    ],
    featured: false,
    badge: null,
  },
  {
    price: "$169.99",
    name: "10 Classes/Month",
    note: "One-time · No auto-renew",
    features: [
      "10 classes",
      "Expires 1 month from purchase",
      "No commitment",
    ],
    featured: false,
    badge: null,
  },
];

// A.1 — Class packs
const CLASS_PACKS = [
  { price: "$30", label: "Drop In", note: "Expires 1 week" },
  { price: "$125", label: "5-Class Pack", note: "Expires 2 months" },
  { price: "$239", label: "10-Class Pack", note: "Expires 4 months" },
  { price: "$425", label: "20-Class Pack", note: "Expires 6 months" },
];

// A.3 — Kids (7–12)
const KIDS_PRICING = [
  {
    price: "$79",
    name: "1 Day/Week",
    note: "Auto-Renew · Monthly",
    features: [
      "Ages 7–12",
      "1 class per week",
      "20-day cancel notice",
      "Structured & supportive",
    ],
    featured: true,
    badge: "Most Popular",
  },
  {
    price: "$90",
    name: "5 Class Pass",
    note: "Expires 4 months",
    features: ["Ages 7–12", "5 classes", "Flexible schedule"],
    featured: false,
    badge: null,
  },
  {
    price: "$160",
    name: "10 Class Pass",
    note: "Expires 6 months",
    features: ["Ages 7–12", "10 classes", "Flexible schedule"],
    featured: false,
    badge: null,
  },
  {
    price: "$280",
    name: "20 Class Pass",
    note: "Expires 8 months",
    features: ["Ages 7–12", "20 classes", "Best value"],
    featured: false,
    badge: null,
  },
];

// B — Small Group Training
const SMALL_GROUP = [
  { price: "$120", label: "Small Group · 3 Attendees", note: "1 session" },
  { price: "$180", label: "Small Group · 6 Attendees", note: "1 session" },
];

// C — Personal Training
const PT_PRICING = [
  {
    price: "$39",
    name: "Intro · 30 min",
    note: "First PT session",
    features: ["1-on-1 with a coach", "Assessment + plan", "30 minutes"],
    featured: false,
    badge: null,
  },
  {
    price: "$50",
    name: "30 Min PT",
    note: "Per session",
    features: ["Focused skill work", "Fast & sharp", "One-on-one"],
    featured: false,
    badge: null,
  },
  {
    price: "$95",
    name: "60 Min PT",
    note: "Per session",
    features: ["Full session", "Full coaching attention", "Programmed progressions"],
    featured: false,
    badge: null,
  },
];

// D.1 — Boxing Academy (adult) non-auto-renew
const ACADEMY_ADULT = [
  { price: "$35", label: "Single Drop-In", note: "Expires 2 weeks" },
  { price: "$135", label: "5-Class Pass", note: "Expires 2 months" },
  { price: "$220", label: "10-Class Pass", note: "Expires 3 months" },
  { price: "$400", label: "20-Class Pass", note: "Expires 6 months" },
];

// D.2 + D.3 — Boxing Academy Teens
const ACADEMY_TEENS = [
  {
    price: "$99",
    name: "Teens · 1 Day/Week",
    note: "Auto-Renew · Monthly",
    features: ["1 class per week", "Teens program", "Coached by Nick"],
    featured: false,
    badge: null,
  },
  {
    price: "$149",
    name: "Teens · Unlimited",
    note: "Auto-Renew · Monthly",
    features: ["Unlimited classes", "Teens program", "Coached by Nick"],
    featured: true,
    badge: "Best Value",
  },
  {
    price: "$25",
    name: "Teens · Drop In",
    note: "Expires 1 month",
    features: ["Single class", "No commitment", "Teens program"],
    featured: false,
    badge: null,
  },
  {
    price: "$160",
    name: "Teens · 10 Class Pass",
    note: "Expires 4 months",
    features: ["10 classes", "Teens program", "Flexible schedule"],
    featured: false,
    badge: null,
  },
  {
    price: "$280",
    name: "Teens · 20 Class Pass",
    note: "Expires 6 months",
    features: ["20 classes", "Teens program", "Best value"],
    featured: false,
    badge: null,
  },
];

type PricingPlan = {
  price: string;
  name: string;
  note: string;
  features: string[];
  featured: boolean;
  badge: string | null;
};

function PricingRow({ plans, ctaLabel = "Get Started" }: { plans: PricingPlan[]; ctaLabel?: string }) {
  return (
    <div className={styles.pricingGrid}>
      {plans.map((plan, i) => (
        <div
          key={`${plan.name}-${i}`}
          className={`${styles.pricingCard} ${plan.featured ? styles.pricingFeatured : ""}`}
        >
          {plan.badge && <div className={styles.pricingBadge}>{plan.badge}</div>}
          <div className={styles.pricingPrice}>{plan.price}</div>
          <div className={styles.pricingName}>{plan.name}</div>
          <div className={styles.pricingNote}>{plan.note}</div>
          <ul className={styles.pricingFeatures}>
            {plan.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a
            href={MINDBODY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={plan.featured ? styles.btnRed : styles.btnOutline}
            style={{ width: "100%", textAlign: "center", display: "block" }}
          >
            {ctaLabel}
          </a>
        </div>
      ))}
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Programs</div>
          <h1 className={styles.headlineLg}>
            Twelve Formats.<br />One Training Floor.
          </h1>
        </div>
      </header>

      {/* CLASS FORMATS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Class Formats</div>
          <h2 className={styles.headlineMd} style={{ marginBottom: "4rem" }}>
            Pick Your Weapon.
          </h2>
          <div className={styles.programsGrid}>
            {PROGRAMS.map((p) => (
              <div key={p.num} className={styles.programCard}>
                {p.img && (
                  <div className={styles.programImg}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 860px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className={styles.programHeader}>
                  <div className={styles.programNum}>{p.num}</div>
                  <div className={styles.programTag}>{p.tag}</div>
                </div>
                <h3 className={styles.programTitle}>{p.title}</h3>
                <ul className={styles.programIncludes}>
                  {p.includes.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <div className={styles.programWho}>{p.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A — GROUP CLASS MEMBERSHIPS */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>A · Group Class Memberships</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            Train The Way<br />That Works For You.
          </h2>
          <PricingRow plans={GROUP_MEMBERSHIPS} />
        </div>
      </section>

      {/* CLASS PACKS (A.1 drop-in / packs) */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Class Packs · Pay As You Go</div>
          <h2 className={styles.headlineMd} style={{ marginBottom: "3.5rem" }}>
            No Commitment. Still Sharp.
          </h2>
          <div className={styles.giftGrid}>
            {CLASS_PACKS.map((pack) => (
              <div key={pack.label} className={styles.giftCard}>
                <div className={styles.giftPrice}>{pack.price}</div>
                <div className={styles.giftLabel}>{pack.label}</div>
                <div className={styles.pricingNote} style={{ marginTop: "0.5rem" }}>
                  {pack.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A.3 — KIDS PROGRAM */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>A.3 · Kids Program (Ages 7–12)</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "1.5rem" }}>
            Skill, Confidence, Fun.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "720px", marginBottom: "4rem" }}>
            Sessions are structured, supportive and adaptable — whether your
            child is brand new to boxing or not.
          </p>
          <PricingRow plans={KIDS_PRICING} />
        </div>
      </section>

      {/* B — SMALL GROUP TRAINING */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>B · Small Group Training</div>
          <h2 className={styles.headlineMd} style={{ marginBottom: "3.5rem" }}>
            Your Crew. One Coach.
          </h2>
          <div className={styles.giftGrid}>
            {SMALL_GROUP.map((s) => (
              <div key={s.label} className={styles.giftCard}>
                <div className={styles.giftPrice}>{s.price}</div>
                <div className={styles.giftLabel}>{s.label}</div>
                <div className={styles.pricingNote} style={{ marginTop: "0.5rem" }}>
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C — PERSONAL TRAINING */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>C · Personal Training</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "1.5rem" }}>
            One Coach.<br />One Focus.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "720px", marginBottom: "4rem" }}>
            Schedule through MindBody to see trainer availability.
          </p>
          <PricingRow plans={PT_PRICING} ctaLabel="Book" />
        </div>
      </section>

      {/* D — BOXING ACADEMY */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>D · Boxing Academy · Coached by Nick</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "1.5rem" }}>
            Sweet Science.<br />Serious Track.
          </h2>
          <p className={styles.bodyLg} style={{ maxWidth: "720px", marginBottom: "4rem" }}>
            A separate program run by Nick Radionov — former Ukrainian Olympic
            Team boxer and Boxing Ontario Level 3 coach. Dedicated to technique,
            strategy and competition-ready development.
          </p>

          <h3 className={styles.headlineMd} style={{ marginBottom: "2rem", fontSize: "1.75rem" }}>
            Adult · Class Packs
          </h3>
          <div className={styles.giftGrid} style={{ marginBottom: "5rem" }}>
            {ACADEMY_ADULT.map((pack) => (
              <div key={pack.label} className={styles.giftCard}>
                <div className={styles.giftPrice}>{pack.price}</div>
                <div className={styles.giftLabel}>{pack.label}</div>
                <div className={styles.pricingNote} style={{ marginTop: "0.5rem" }}>
                  {pack.note}
                </div>
              </div>
            ))}
          </div>

          <h3 className={styles.headlineMd} style={{ marginBottom: "2rem", fontSize: "1.75rem" }}>
            Teens Program
          </h3>
          <PricingRow plans={ACADEMY_TEENS} />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
