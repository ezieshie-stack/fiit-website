/*
 * One-off seed — ports all hardcoded pricing plans from
 * fiit-website/src/app/programs/page.tsx into Convex's `pricingPlans` table.
 *
 * Sections: group-memberships (A), class-packs (A.2), kids (A.3),
 *           small-group (B), personal-training (C),
 *           academy-adult (D.1), academy-teens (D.2/D.3)
 *
 * `style: "pricing"` → full pricing card with features list + badge
 * `style: "pack"`    → compact gift-card-style tile (price + label + note)
 *
 * Usage: node scripts/seed-pricing-plans.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// Section metadata — repeated on every record in the section so section
// headers live with the data (admin can edit the section title/label per
// record, and the website reconciles them).
const SECTIONS = {
  "group-memberships": {
    label: "A · FIIT Co Memberships",
    title: "Train The Way\nThat Works For You.",
    description: undefined,
  },
  "class-packs": {
    label: "A.2 · FIIT Co Class Packs · Pay As You Go",
    title: "No Commitment. Still Sharp.",
    description: undefined,
  },
  kids: {
    label: "A.3 · Kids Program (Ages 7–12)",
    title: "Skill, Confidence, Fun.",
    description: "Sessions are structured, supportive and adaptable, whether your child is brand new to boxing or not.",
  },
  "small-group": {
    label: "B · Small Group Training",
    title: "Your Crew. One Coach.",
    description: undefined,
  },
  "personal-training": {
    label: "C · Personal Training",
    title: "One Coach.\nOne Focus.",
    description: "Schedule through MindBody to see trainer availability.",
  },
  "academy-adult": {
    label: "D · Boxing Academy · Coached by Nick",
    title: "Train Smarter.\nFight Harder.",
    description: "The FIIT Boxing Academy is run by Nick Radionov, former Ukrainian Olympic Team boxer and Boxing Ontario Level 3 coach. FIIT Boxing Academy programs are dedicated to technique, strategy and competition-ready development.",
  },
  "academy-teens": {
    label: "D · Boxing Academy · Teens Program",
    title: "Teens Academy.",
    description: undefined,
  },
};

const PLANS = [
  // ── A. Group memberships (5 pricing cards) ───────────────────────────
  { section: "group-memberships", style: "pricing", price: "$49.99", name: "2-Week Trial",
    note: "Unlimited · 2 weeks", badge: undefined, featured: false,
    features: ["All group classes", "Muay Thai, Boxing, Strength, Hybrid", "New members only", "No commitment"] },
  { section: "group-memberships", style: "pricing", price: "$169.99", name: "1 Month Unlimited",
    note: "Auto-Renew · $169.99/mo", badge: "Most Popular", featured: true,
    features: ["All classes, unlimited", "Monthly billing", "30-day cancel notice", "Most flexibility"] },
  { section: "group-memberships", style: "pricing", price: "$149.99", name: "10 Classes/Month",
    note: "Auto-Renew · $149.99/mo", badge: undefined, featured: false,
    features: ["10 classes per month", "Monthly billing", "30-day cancel notice", "Save on every class"] },
  { section: "group-memberships", style: "pricing", price: "$179.99", name: "1 Month Unlimited",
    note: "One-time · No auto-renew", badge: undefined, featured: false,
    features: ["All classes, unlimited", "Expires 1 month from purchase", "No commitment"] },
  { section: "group-memberships", style: "pricing", price: "$169.99", name: "10 Classes/Month",
    note: "One-time · No auto-renew", badge: undefined, featured: false,
    features: ["10 classes", "Expires 1 month from purchase", "No commitment"] },

  // ── A.2 Class packs (4 pack tiles) ───────────────────────────────────
  { section: "class-packs", style: "pack", price: "$30", name: "Drop In",
    note: "Expires 1 week", badge: undefined, featured: false, features: [] },
  { section: "class-packs", style: "pack", price: "$125", name: "5-Class Pack",
    note: "Expires 2 months", badge: undefined, featured: false, features: [] },
  { section: "class-packs", style: "pack", price: "$239", name: "10-Class Pack",
    note: "Expires 4 months", badge: undefined, featured: false, features: [] },
  { section: "class-packs", style: "pack", price: "$425", name: "20-Class Pack",
    note: "Expires 6 months", badge: undefined, featured: false, features: [] },

  // ── A.3 Kids (4 pricing cards) ───────────────────────────────────────
  { section: "kids", style: "pricing", price: "$79", name: "1 Day/Week",
    note: "Auto-Renew · Monthly", badge: "Most Popular", featured: true,
    features: ["Ages 7–12", "1 class per week", "20-day cancel notice", "Structured & supportive"] },
  { section: "kids", style: "pricing", price: "$90", name: "5 Class Pass",
    note: "Expires 4 months", badge: undefined, featured: false,
    features: ["Ages 7–12", "5 classes", "Flexible schedule"] },
  { section: "kids", style: "pricing", price: "$160", name: "10 Class Pass",
    note: "Expires 6 months", badge: undefined, featured: false,
    features: ["Ages 7–12", "10 classes", "Flexible schedule"] },
  { section: "kids", style: "pricing", price: "$280", name: "20 Class Pass",
    note: "Expires 8 months", badge: undefined, featured: false,
    features: ["Ages 7–12", "20 classes", "Best value"] },

  // ── B. Small group (2 pack tiles) ────────────────────────────────────
  { section: "small-group", style: "pack", price: "$120", name: "Small Group · 3 Attendees",
    note: "1 session", badge: undefined, featured: false, features: [] },
  { section: "small-group", style: "pack", price: "$180", name: "Small Group · 6 Attendees",
    note: "1 session", badge: undefined, featured: false, features: [] },

  // ── C. Personal training (3 pricing cards) ───────────────────────────
  { section: "personal-training", style: "pricing", price: "$39", name: "Intro · 30 min",
    note: "First PT session", badge: undefined, featured: false,
    features: ["1-on-1 with a coach", "Assessment + plan", "30 minutes"] },
  { section: "personal-training", style: "pricing", price: "$50", name: "30 Min PT",
    note: "Per session", badge: undefined, featured: false,
    features: ["Focused skill work", "Fast & sharp", "One-on-one"] },
  { section: "personal-training", style: "pricing", price: "$95", name: "60 Min PT",
    note: "Per session", badge: undefined, featured: false,
    features: ["Full session", "Full coaching attention", "Programmed progressions"] },

  // ── D.1 Academy adult (4 pack tiles) ─────────────────────────────────
  { section: "academy-adult", style: "pack", price: "$35", name: "Single Drop-In",
    note: "Expires 2 weeks", badge: undefined, featured: false, features: [] },
  { section: "academy-adult", style: "pack", price: "$135", name: "5-Class Pass",
    note: "Expires 2 months", badge: undefined, featured: false, features: [] },
  { section: "academy-adult", style: "pack", price: "$220", name: "10-Class Pass",
    note: "Expires 3 months", badge: undefined, featured: false, features: [] },
  { section: "academy-adult", style: "pack", price: "$400", name: "20-Class Pass",
    note: "Expires 6 months", badge: undefined, featured: false, features: [] },

  // ── D.2+3 Academy teens (5 pricing cards) ────────────────────────────
  { section: "academy-teens", style: "pricing", price: "$99", name: "Teens · 1 Day/Week",
    note: "Auto-Renew · Monthly", badge: undefined, featured: false,
    features: ["1 class per week", "Teens program", "Coached by Nick"] },
  { section: "academy-teens", style: "pricing", price: "$149", name: "Teens · Unlimited",
    note: "Auto-Renew · Monthly", badge: "Best Value", featured: true,
    features: ["Unlimited classes", "Teens program", "Coached by Nick"] },
  { section: "academy-teens", style: "pricing", price: "$25", name: "Teens · Drop In",
    note: "Expires 1 month", badge: undefined, featured: false,
    features: ["Single class", "No commitment", "Teens program"] },
  { section: "academy-teens", style: "pricing", price: "$160", name: "Teens · 10 Class Pass",
    note: "Expires 4 months", badge: undefined, featured: false,
    features: ["10 classes", "Teens program", "Flexible schedule"] },
  { section: "academy-teens", style: "pricing", price: "$280", name: "Teens · 20 Class Pass",
    note: "Expires 6 months", badge: undefined, featured: false,
    features: ["20 classes", "Teens program", "Best value"] },
];

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

async function main() {
  console.log(`Seeding ${PLANS.length} pricing plans → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listPricingPlans");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} pricing plans already exist. Aborting.`);
    process.exit(1);
  }
  let ok = 0;
  let displayOrderPerSection = {};
  for (const p of PLANS) {
    const orderInSection = (displayOrderPerSection[p.section] ?? 0) + 1;
    displayOrderPerSection[p.section] = orderInSection;
    const sec = SECTIONS[p.section];
    const slug = `${p.section}-${slugify(p.name)}-${orderInSection}`;
    try {
      await client.mutation("websiteContent:createPricingPlan", {
        slug,
        section: p.section,
        sectionLabel: sec.label,
        sectionTitle: sec.title,
        ...(sec.description ? { sectionDescription: sec.description } : {}),
        price: p.price,
        name: p.name,
        ...(p.note ? { note: p.note } : {}),
        features: p.features,
        featured: p.featured,
        ...(p.badge ? { badge: p.badge } : {}),
        style: p.style,
        displayOrder: orderInSection,
      });
      console.log(`  ✓ ${p.section.padEnd(20)} ${p.price.padEnd(8)} ${p.name}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${p.section} ${p.name}: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${PLANS.length}.`);
}
main().catch((err) => { console.error("Seed crashed:", err); process.exit(1); });
