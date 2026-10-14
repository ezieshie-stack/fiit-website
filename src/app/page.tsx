import Link from "next/link";
import Image from "next/image";
import LiveImage from "@/components/ui/live-image";
import styles from "./site.module.css";
import CtaSection from "./_components/CtaSection";
import SiteFooter from "./_components/SiteFooter";
import { type Testimonial } from "@/components/ui/testimonials-section";
import LiveTestimonials from "@/components/ui/live-testimonials";
import LiveFAQ, { type FaqItem } from "@/components/ui/live-faq";
import LiveTeamShowcase from "@/components/ui/live-team-showcase";
import PromoSlot from "@/components/ui/promo-slot";
import { MINDBODY_SHOP_URL } from "@/lib/mindbody";
// Trainer rosters now live in Convex — pulled via <LiveTeamShowcase/> below.
// Static fallback roster still lives in _data/trainers.ts for build-time
// safety, but the homepage no longer imports it directly.


// Member testimonials — consumed by <TestimonialsSection> (axorax/testimonials-1
// reimplemented in CSS Modules). `role` distinguishes longtime members from
// first-timers so the quote has social proof context.
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

// Fallback FAQs used only if Convex is unreachable. Source of truth moved
// to the `faqEntries` table, edited via ops tool's Website FAQ admin.
const FAQS: FaqItem[] = [
  {
    q: "Do I need boxing or fight training experience to take a class?",
    a: "Absolutely not. Our classes are designed for all levels from beginner to advanced. Each class goes over technique and form so you have the tools you need to succeed. The most important thing is that you work hard and have fun.",
  },
  {
    q: "It's my first time. What equipment do I need?",
    a: "All you need is workout clothes, comfortable shoes and a refillable water bottle. For your first class, you can borrow a pair of boxing gloves. After that, gloves rent for $10 per session or you can buy a pair from us.",
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

// FAQPage JSON-LD now generated inside <LiveFAQ/> from whatever's currently
// rendered — keeps the structured data in sync with live admin edits.

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBgImage}>
          <LiveImage
            slot="home-hero"
            fallbackSrc="/hero/home.webp"
            fallbackAlt="FIIT Co. boxing studio training floor in Leslieville, Toronto"
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
            Toronto's Boutique<br />Boxing Studio.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontSize: "clamp(1.35rem, 2.4vw, 1.9rem)",
              color: "#D92B2B",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              margin: "1.25rem 0 1.5rem",
              lineHeight: 1.15,
            }}
          >
            You're Worth The Fight.
          </p>
          <p className={styles.heroSub}>
            FIIT Co. is a boutique boxing and fitness studio in Leslieville,
            Toronto. Group Fitness, Hybrid Boxing & Conditioning, Muay Thai
            Kickboxing, Strength Training, HIIT, and the FIIT Boxing Academy
            at 1047 Gerrard St E. Your first class is free.
          </p>
          <div className={styles.heroBottom}>
            <div className={styles.heroCtas}>
              <a
                href={MINDBODY_SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnRed}
              >
                Book Free Class
              </a>
              <Link href="/programs" className={styles.btnOutline}>
                Programs & Pricing
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
          Boxing · Strength · Conditioning · Muay Thai · HIIT · Kids · Teens · Private Coaching · Small Group Programs
        </div>
      </div>

      {/* Promo video slot — empty unless Arden publishes one here */}
      <PromoSlot name="home:after-hero" />

      {/* Schedule widget removed from the home page — moving to a dedicated
          landing page later. ScheduleWidget component + its Convex wiring +
          the staff admin page at /website-schedule stay in place, just not
          mounted here. */}

      <PromoSlot name="home:after-schedule" />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>The Approach</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "5rem" }}>
            Three Pillars.<br />One Standard.
          </h2>
          <div className={styles.pillarsGrid}>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>01</div>
              <div className={styles.pillarSubLabel}>The Training</div>
              <h3 className={styles.pillarTitle}>Fight Science</h3>
              <div className={styles.pillarDash} />
              <p className={styles.body}>
                Muay Thai Kickboxing, Boxing Pad & Bag Work, Full Body Strength
                Training, and Hybrid Circuit Training - led by certified
                trainers with decades of competitive and coaching experience.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>02</div>
              <div className={styles.pillarSubLabel}>The Space</div>
              <h3 className={styles.pillarTitle}>Built To Train</h3>
              <div className={styles.pillarDash} />
              <p className={styles.body}>
                An intimate boutique with a spacious, open layout. Heavy bags,
                focus pads, barbells, kettlebells, Concept2 rowers, Assault
                Airbikes, sleds, battle ropes, TRX, and more.
              </p>
            </div>
            <div className={styles.pillar}>
              <div className={styles.pillarNum}>03</div>
              <div className={styles.pillarSubLabel}>The Community</div>
              <h3 className={styles.pillarTitle}>Zero Ego. All Heart.</h3>
              <div className={styles.pillarDash} />
              <p className={styles.body}>
                Whether you&apos;re stepping into a gym for the first time or
                training for competition - FIIT Co. is where every level
                is welcomed and every effort is respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PromoSlot name="home:after-pillars" />

      {/* MEET THE TEAM — live from Convex `trainers` table (edited via ops
          tool's Website Trainers admin). Falls back to static roster if
          Convex is unreachable. FIIT group trainers first, Boxing Academy
          coach(es) called out separately below. */}
      <LiveTeamShowcase
        badge="The Team"
        title="Coaches Who Coach For Real."
        category="fiit"
      />

      <LiveTeamShowcase
        badge="FIIT Boxing Academy"
        title="Head Coach."
        category="academy"
      />

      <PromoSlot name="home:after-team" />

      {/* TESTIMONIALS — reads from Convex (ops tool's Website Testimonials
          admin). Falls back to the static TESTIMONIALS array above. */}
      <LiveTestimonials
        badgeText="Members Talk"
        title="Don't Take Our Word For It."
        subtitle="Real members, real reviews. This is what training at FIIT Co. feels like."
        fallback={TESTIMONIALS}
      />

      {/* Promo video slot — where the existing FIIT Co. promo lives. When
          Arden edits it via ops tool's Website Promo Videos admin, the
          change reflects here within seconds. */}
      <PromoSlot name="home:after-testimonials" />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <div className={styles.statNum}>37+</div>
              <div className={styles.statLabel}>Years Head Coach Experience</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>2500</div>
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

      <PromoSlot name="home:after-stats" />

      {/* FAQ — reads from Convex (ops tool's Website FAQ admin). Falls back
          to the static FAQS array above. Also emits the FAQPage JSON-LD
          inline so structured data always matches live admin edits. */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>You've Got Questions</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            We've Got<br />Answers.
          </h2>
          <LiveFAQ fallback={FAQS} />
        </div>
      </section>

      <PromoSlot name="home:after-faq" />

      <CtaSection />
      <SiteFooter />
    </>
  );
}
