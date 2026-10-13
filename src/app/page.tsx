import Link from "next/link";
import styles from "./site.module.css";
import CtaSection from "./_components/CtaSection";
import SiteFooter from "./_components/SiteFooter";
import { type Testimonial } from "@/components/ui/testimonials-section";
import { type TeamMember } from "@/components/ui/team-showcase";
import LiveImage from "@/components/ui/live-image";
import LiveTeamShowcase from "@/components/ui/live-team-showcase";
import LiveTestimonials from "@/components/ui/live-testimonials";
import LiveFAQ, { type FaqItem } from "@/components/ui/live-faq";
import ScheduleWidget from "@/components/ui/schedule-widget";
import PromoSlot from "@/components/ui/promo-slot";
import { MINDBODY_INTRO_OFFER_URL } from "@/lib/mindbody";
import { TRAINERS } from "./_data/trainers";

// Static fallbacks — rendered when their Convex counterparts have no data
// yet or are still loading. Keeps SSR / SEO showing real content, and
// means the home page never shows an empty section after a deploy.
//
// Each `Live*` component takes `fallback={…}` for exactly this reason.

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ahmed A.",
    role: "Member",
    rating: 5,
    text: "A welcoming space to exercise with no judgement. If you want to get excited about getting in great shape Jason is the man. In just 1 week my boxing technique and fitness improved, and I'm looking forward to more progress. I feel glad to be part of this tribe.",
  },
  {
    name: "Heather W.",
    role: "Member",
    rating: 5,
    text: "Since my first day at FIIT, I've been warmly welcomed by Jason and the trainers, and all of the members. Although I've only been attending for a few weeks, it already feels like home.",
  },
  {
    name: "Tim M.",
    role: "Member · Parent",
    rating: 5,
    text: "It's been a great bonding experience with my son as we enjoy training together. FIIT offers an opportunity to combine fitness and fun through a variety of creative classes led by highly motivational instructors.",
  },
  {
    name: "JD L.",
    role: "Member",
    rating: 5,
    text: "I really enjoy the combination of boxing bag workouts with the high intensity workouts. The trainers are extremely knowledgable and passionate. The community is really friendly and positive as well.",
  },
  {
    name: "Eriko I.",
    role: "Member",
    rating: 5,
    text: "Absolutely amazing boxing gym! Jason is very friendly and kind from day 1 of my visit. He helps every beginner to learn the basics and motivates everyone. Highly recommended!",
  },
  {
    name: "Alex H.",
    role: "Member",
    rating: 5,
    text: "Always a great workout. Jason and the team are extremely welcoming and create a fun and challenging workout environment. Highly recommend!",
  },
];

const FAQS: FaqItem[] = [
  {
    q: "Do I need boxing or fight training experience to take a class?",
    a: "Absolutely not. Our classes are designed for all levels from beginner to advanced. Each class goes over technique and form so you have the tools you need to succeed. The most important thing is that you work hard and have fun.",
  },
  {
    q: "It's my first time. What equipment do I need?",
    a: "All you need is workout clothes, comfortable shoes and a refillable water bottle. For your first class, you can borrow a pair of boxing gloves. After that, gloves rent for $5 per session or you can buy a pair from us.",
  },
  {
    q: "Do you offer affordable membership options?",
    a: "At FIIT Co, we believe fitness is for everybody. We have a variety of memberships based on your goals and budget: 5, 10 or 20 class passes, monthly memberships, and auto-renew plans.",
  },
  {
    q: "Do you have personal trainers available?",
    a: "Yes. We offer one-on-one training to help you meet your goals faster. Depending on your goals, budget and schedule, we'll match you to a trainer that can best meet your needs.",
  },
  {
    q: "Where exactly is the gym?",
    a: "FIIT Co is located in Leslieville at 1047 Gerrard St E on the upper floor, above The Vatican Gift Shop. Nearest intersection: Gerrard and Jones.",
  },
];

// FIIT team (homepage grid) vs. Boxing Academy head coach (dedicated card).
// Convex trainers carry a `category` field — "fiit" | "academy" — and
// <LiveTeamShowcase category="…"/> filters by it. Static fallbacks here
// split the git TRAINERS roster the same way so SSR looks right.
const FIIT_TEAM_FALLBACK: TeamMember[] = TRAINERS.filter((t) => t.id !== "nick");
const ACADEMY_HEAD_COACH_FALLBACK: TeamMember[] = TRAINERS.filter((t) => t.id === "nick");

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBgImage}>
          <LiveImage
            slot="home-hero"
            fallbackSrc="/hero/home.webp"
            fallbackAlt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.heroWatermark}>FIIT</div>
        <div className={styles.heroInner}>
          <div className={styles.label}>Leslieville · Toronto</div>
          <h1 className={styles.headlineXl}>
            Toronto&apos;s Boutique<br />Boxing Studio.
          </h1>
          <p className={styles.heroSub}>You&apos;re Worth The Fight.</p>
          <div className={styles.heroBottom}>
            <div className={styles.heroCtas}>
              <a
                href={MINDBODY_INTRO_OFFER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnRed}
              >
                Book Free Class
              </a>
              <Link href="/programs" className={styles.btnOutline}>
                Programs &amp; Pricing
              </Link>
            </div>
            <div className={styles.heroAddress}>
              1047 Gerrard St E<br />
              Toronto · Leslieville
            </div>
          </div>
        </div>
      </section>

      {/* ── Class Schedule — live from staff portal Convex ────────── */}
      <ScheduleWidget />

      {/* ── The Approach ──────────────────────────────────────────── */}
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
                Everything at FIIT is built around the sweet science. Real
                technique, real coaching, real fighters on the floor.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>02</div>
              <h3 className={styles.pillarTitle}>Every Discipline</h3>
              <p className={styles.body}>
                From boxing to strength to yoga: a full stack of class
                formats built to progress you in and out of the ring.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>03</div>
              <h3 className={styles.pillarTitle}>Serious Recovery</h3>
              <p className={styles.body}>
                Mobility, yin yoga, and recovery built into the schedule.
                Training hard only works if the body can keep up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Team ──────────────────────────────────────────────── */}
      <LiveTeamShowcase
        badge="The Team"
        title="Coaches Who Coach For Real."
        category="fiit"
        fallback={FIIT_TEAM_FALLBACK}
      />

      {/* ── FIIT Boxing Academy — head coach ─────────────────────── */}
      <LiveTeamShowcase
        badge="FIIT Boxing Academy"
        title="Head Coach."
        category="academy"
        fallback={ACADEMY_HEAD_COACH_FALLBACK}
      />

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <LiveTestimonials
        badgeText="Members Talk"
        title="Don't Take Our Word For It."
        subtitle="Real members, real reviews. This is what training at FIIT Co. feels like."
        fallback={TESTIMONIALS}
      />

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>37+</div>
              <div className={styles.statLabel}>Years Head Coach Experience</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>6000</div>
              <div className={styles.statLabel}>Square Feet</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>12</div>
              <div className={styles.statLabel}>Class Formats</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Academy Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <LiveFAQ
        badge="You've Got Questions"
        title={<>We&apos;ve Got<br />Answers.</>}
        fallback={FAQS}
      />

      {/* ── Optional promo video slot — rendered iff Convex has rows ── */}
      <PromoSlot slot="home:after-faq" />

      {/* ── Member Perks (Guest Pass + Refer A Friend) ────────────── */}
      <CtaSection />

      {/* ── Visit / Contact / Follow / promo-footer / legal footer ── */}
      <SiteFooter />
    </>
  );
}
