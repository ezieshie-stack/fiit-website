/*
 * TestimonialsSection
 *
 * Visual adaptation of the axorax/testimonials-1 component from 21st.dev
 * (https://21st.dev/community/components/axorax/testimonials-1/default),
 * reimplemented in CSS Modules to fit FIIT Co.'s dark combat-sport palette.
 *
 * Notes:
 * - Server component (no hooks, no interactivity beyond CSS :hover).
 * - Accepts `testimonials` as a prop so the data lives in the page file
 *   alongside the rest of the FIIT content, not hardcoded into the section.
 * - `avatar` is optional. If omitted we render the member's initials on a
 *   red gradient tile — no stock-photo smell, no broken-image fallback.
 * - `rating` defaults to 5 because every testimonial on the site today is
 *   a glowing one.
 */
import { Star } from "lucide-react";
import styles from "./testimonials-section.module.css";

export type Testimonial = {
  name: string;
  role?: string;
  text: string;
  avatar?: string;
  rating?: number;
};

type TestimonialsSectionProps = {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials: Testimonial[];
};

function initialsFor(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsSection({
  title = "Don't Take Our Word For It.",
  subtitle = "What members say about training on the floor at FIIT Co.",
  badgeText = "Members Talk",
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>{badgeText}</span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t, i) => {
          const stars = typeof t.rating === "number" ? t.rating : 5;
          return (
            <article key={`${t.name}-${i}`} className={styles.card}>
              <div className={styles.stars} aria-label={`Rated ${stars} out of 5`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={idx < stars ? styles.star : styles.starEmpty}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className={styles.quote}>&ldquo;{t.text}&rdquo;</blockquote>

              <footer className={styles.footer}>
                <div className={styles.avatar} aria-hidden="true">
                  {t.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.avatar} alt="" />
                  ) : (
                    initialsFor(t.name)
                  )}
                </div>
                <div className={styles.person}>
                  <span className={styles.name}>{t.name}</span>
                  {t.role && <span className={styles.role}>{t.role}</span>}
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
