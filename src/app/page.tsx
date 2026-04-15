import Link from "next/link";
import Image from "next/image";
import styles from "./site.module.css";
import CtaSection from "./_components/CtaSection";
import SiteFooter from "./_components/SiteFooter";
import TestimonialsSection, {
  type Testimonial,
} from "@/components/ui/testimonials-section";
import TeamShowcase from "@/components/ui/team-showcase";
import VideoTestimonials, {
  type VideoTestimonial,
} from "@/components/ui/video-testimonials";
import { TRAINERS } from "./_data/trainers";

const MINDBODY_URL =
  "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377";


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

// Video testimonials — ported from the old Squarespace site section
// ("We know we make your experience great. But don't take our word for it.").
// Posters live under /public/testimonials/<id>.jpg and should be portrait
// (3:4 roughly). Each entry currently has videoId: null — cards render in
// "Coming Soon" mode until Arden sends the real YouTube IDs or video files.
//
// TO ACTIVATE a card: set videoId to the YouTube ID (e.g. "abcd1234EFG"),
// OR set videoSrc to a direct MP4/webm URL. Either will light up the
// modal lightbox and make the card clickable.
const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "joanne",
    name: "Joanne",
    poster: "/testimonials/joanne.jpg",
    videoId: null,
  },
  {
    id: "jack",
    name: "Jack",
    poster: "/testimonials/jack.jpg",
    videoId: null,
  },
  {
    id: "heather",
    name: "Heather",
    poster: "/testimonials/heather.jpg",
    videoId: null,
  },
  {
    id: "tarek-rashi",
    name: "Tarek & Rashi",
    poster: "/testimonials/tarek-rashi.jpg",
    videoId: null,
  },
  {
    id: "tyler",
    name: "Tyler",
    poster: "/testimonials/tyler.jpg",
    videoId: null,
  },
];

const FAQS = [
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

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBgImage}>
          <Image
            src="/hero/home.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.heroWatermark}>FIIT</div>
        <div className={styles.heroInner}>
          <div className={styles.label}>Est. Toronto · Leslieville</div>
          <h1 className={styles.headlineXl}>
            You're Worth<br />The Fight.
          </h1>
          <p className={styles.heroSub}>
            A boutique boxing studio in Toronto where fitness meets community,
            and everyone is welcome.
          </p>
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
          Boxing · Strength · Conditioning · Academy · Muay Thai · Yin Yoga · HIIT · Kids · Teens · Private Coaching
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
              <h3 className={styles.pillarTitle}>Every Discipline</h3>
              <p className={styles.body}>
                From boxing to strength to yoga: a full stack of class formats
                built to progress you in and out of the ring.
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

      {/* MEET THE TEAM — makviesainte/team-showcase (CSS-Modules port) */}
      <TeamShowcase
        badge="The Team"
        title="Coaches Who Coach For Real."
        members={TRAINERS}
      />

      {/* TESTIMONIALS — axorax/testimonials-1 (CSS-Modules port) */}
      <TestimonialsSection
        badgeText="Members Talk"
        title="Don't Take Our Word For It."
        subtitle="Real members, real reviews. This is what training at FIIT Co. feels like."
        testimonials={TESTIMONIALS}
      />

      {/* VIDEO TESTIMONIALS — ported from old Squarespace site */}
      <VideoTestimonials testimonials={VIDEO_TESTIMONIALS} />

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
              <div className={styles.statNum}>11</div>
              <div className={styles.statLabel}>Class Formats</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>3</div>
              <div className={styles.statLabel}>Academy Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.sectionDark}>
        <div className={styles.container}>
          <div className={styles.label}>You've Got Questions</div>
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            We've Got<br />Answers.
          </h2>
          <div className={styles.faqList}>
            {FAQS.map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQ}>
                  <span className={styles.faqNum}>{String(i + 1).padStart(2, "0")}</span>
                  {faq.q}
                </summary>
                <p className={styles.faqA}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <SiteFooter />
    </>
  );
}
