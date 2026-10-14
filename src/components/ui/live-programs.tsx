"use client";

/**
 * Live-data rendering of the Programs page body (everything below the hero).
 *
 * Renders:
 *   1. Class formats grid — split into FIIT group classes + Boxing Academy
 *      with a "FIIT Boxing Academy" section divider between them.
 *   2. Pricing sections in order (A / A.2 / A.3 / B / C / D) — each with
 *      its own eyebrow label, title, optional description, and card grid.
 *
 * Cards come in two styles:
 *   - `pricing` → full pricing card with features + CTA + badge
 *   - `pack`    → compact gift-card-style tile (price + label + note)
 *
 * Falls back to the build-time constants at the bottom of this file if
 * Convex is unreachable. That way Vercel's static prerender has real
 * content to ship, and client-side hydration swaps in the live data
 * seamlessly once Convex responds.
 */

import Image from "next/image";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "@/app/site.module.css";
import { MINDBODY_SHOP_URL } from "@/lib/mindbody";

// Section display order on the Programs page — hardcoded because this
// is layout, not data. A, A.2, A.3, B, C, D progression matters.
const SECTION_ORDER = [
  "group-memberships",
  "class-packs",
  "kids",
  "small-group",
  "personal-training",
  "academy-adult",
  "academy-teens",
] as const;

// Alternate section backgrounds to match the existing page rhythm
// (light / sectionDark / light / sectionDark / ...)
const SECTION_BG_VARIANTS: Record<string, "light" | "dark"> = {
  "group-memberships": "dark",
  "class-packs":       "light",
  "kids":              "dark",
  "small-group":       "light",
  "personal-training": "dark",
  "academy-adult":     "light",
  "academy-teens":     "light",
};

type LiveClassFormat = {
  _id: string;
  slug: string;
  num: string;
  tag: string;
  title: string;
  category: string;
  imageUrl?: string;
  includes: string[];
  who: string;
  displayOrder: number;
  active: boolean;
};

type LivePricingPlan = {
  _id: string;
  slug: string;
  section: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionDescription?: string;
  price: string;
  name: string;
  note?: string;
  features: string[];
  featured: boolean;
  badge?: string;
  style: string;
  displayOrder: number;
  active: boolean;
};

export default function LivePrograms() {
  const classFormats = useQuery(anyApi.websiteContent.listActiveClassFormats) as
    | LiveClassFormat[] | undefined;
  const pricingPlans = useQuery(anyApi.websiteContent.listActivePricingPlans) as
    | LivePricingPlan[] | undefined;

  const cf = Array.isArray(classFormats) && classFormats.length > 0
    ? classFormats : FALLBACK_CLASS_FORMATS;
  const pp = Array.isArray(pricingPlans) && pricingPlans.length > 0
    ? pricingPlans : FALLBACK_PRICING_PLANS;

  const fiitFormats = cf.filter((f) => f.category !== "academy");
  const academyFormats = cf.filter((f) => f.category === "academy");

  return (
    <>
      {/* CLASS FORMATS ─────────────────────────────────────────────────── */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.label}>Class Formats</div>
          <h2 className={styles.headlineMd} style={{ marginBottom: "4rem" }}>
            Pick Your Weapon.
          </h2>

          {fiitFormats.length > 0 && (
            <div className={styles.programsGrid}>
              {fiitFormats.map(renderClassCard)}
            </div>
          )}

          {academyFormats.length > 0 && (
            <>
              <div style={{ marginTop: "6rem", marginBottom: "3rem" }}>
                <h3 className={styles.headlineMd} style={{ marginBottom: "1.5rem" }}>
                  FIIT Boxing Academy
                </h3>
                <p className={styles.bodyLg} style={{ maxWidth: "820px" }}>
                  The Boxing Academy at FIIT Co develops technical skill,
                  conditioning, tactics, and mental discipline through
                  structured, progressive training. Coached by Nick Radionov,
                  a Boxing Ontario-certified coach (Level 3 in training) and
                  former Ukrainian National Olympic Team member.
                </p>
              </div>
              <div className={styles.programsGrid}>
                {academyFormats.map(renderClassCard)}
              </div>
            </>
          )}
        </div>
      </section>

      {/* PRICING SECTIONS ──────────────────────────────────────────────── */}
      {SECTION_ORDER.map((sectionKey) => {
        const plansInSection = pp
          .filter((p) => p.section === sectionKey)
          .sort((a, b) => a.displayOrder - b.displayOrder);
        if (plansInSection.length === 0) return null;

        const variant = SECTION_BG_VARIANTS[sectionKey] ?? "light";
        const sectionClass = variant === "dark" ? styles.sectionDark : styles.section;

        // Section-level copy is stored on every record; we use the first
        // plan in the section to pull heading/label/description.
        const first = plansInSection[0];
        const sectionLabel = first.sectionLabel;
        const sectionTitle = first.sectionTitle;
        const sectionDescription = first.sectionDescription;

        // Detect whether the section contains mostly "pricing" cards or
        // "pack" tiles to pick the right grid style.
        const isPackSection = plansInSection.every((p) => p.style === "pack");

        return (
          <section key={sectionKey} className={sectionClass}>
            <div className={styles.container}>
              <div className={styles.label}>{sectionLabel}</div>
              <h2
                className={
                  sectionKey === "class-packs" || sectionKey === "small-group"
                    ? styles.headlineMd
                    : styles.headlineLg
                }
                style={{ marginBottom: sectionDescription ? "1.5rem" : "4rem" }}
              >
                {sectionTitle.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              {sectionDescription && (
                <p className={styles.bodyLg} style={{ maxWidth: "720px", marginBottom: "4rem" }}>
                  {sectionDescription}
                </p>
              )}

              {isPackSection ? (
                <div className={styles.giftGrid}>
                  {plansInSection.map((p) => (
                    <a
                      key={p._id ?? p.slug}
                      href={MINDBODY_SHOP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.giftCard}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                        display: "block",
                      }}
                      aria-label={`Buy ${p.name} for ${p.price}`}
                    >
                      <div className={styles.giftPrice}>{p.price}</div>
                      <div className={styles.giftLabel}>{p.name}</div>
                      {p.note && (
                        <div className={styles.pricingNote} style={{ marginTop: "0.5rem" }}>
                          {p.note}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              ) : (
                <div className={styles.pricingGrid}>
                  {plansInSection.map((p) => (
                    <div
                      key={p._id ?? p.slug}
                      className={`${styles.pricingCard} ${p.featured ? styles.pricingFeatured : ""}`}
                    >
                      {p.badge && <div className={styles.pricingBadge}>{p.badge}</div>}
                      <div className={styles.pricingPrice}>{p.price}</div>
                      <div className={styles.pricingName}>{p.name}</div>
                      {p.note && <div className={styles.pricingNote}>{p.note}</div>}
                      <ul className={styles.pricingFeatures}>
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <a
                        href={MINDBODY_SHOP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={p.featured ? styles.btnRed : styles.btnOutline}
                        style={{ width: "100%", textAlign: "center", display: "block" }}
                      >
                        {sectionKey === "personal-training" ? "Book" : "Get Started"}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}

function renderClassCard(p: LiveClassFormat) {
  return (
    <div key={p._id ?? p.slug} className={styles.programCard}>
      {p.imageUrl && (
        <div className={styles.programImg}>
          <Image
            src={p.imageUrl}
            alt={p.title}
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            unoptimized={p.imageUrl.startsWith("http")}
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
  );
}

// ── FALLBACK DATA — used only if Convex is unreachable. Minimal subset ──
// just enough to render something reasonable; full roster lives in Convex.

const FALLBACK_CLASS_FORMATS: LiveClassFormat[] = [
  { _id: "fb-hybrid", slug: "fiit-hybrid", num: "01", tag: "Hybrid",
    title: "FIIT Hybrid", category: "fiit", imageUrl: "/classes/hybrid.webp",
    includes: ["Boxing drills", "4 functional rounds"],
    who: "Boxing drills meet functional stations over four rounds.",
    displayOrder: 1, active: true },
];

const FALLBACK_PRICING_PLANS: LivePricingPlan[] = [
  { _id: "fb-1month", slug: "group-memberships-1-month-unlimited-1",
    section: "group-memberships",
    sectionLabel: "A · FIIT Co Memberships",
    sectionTitle: "Train The Way\nThat Works For You.",
    price: "$169.99", name: "1 Month Unlimited", note: "Auto-Renew · Monthly",
    features: ["All classes, unlimited"], featured: true, badge: "Most Popular",
    style: "pricing", displayOrder: 1, active: true },
];
