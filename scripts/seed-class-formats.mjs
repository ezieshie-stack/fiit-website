/*
 * One-off seed — ports the 12 hardcoded class formats from
 * fiit-website/src/app/programs/page.tsx (PROGRAMS_FIIT + PROGRAMS_ACADEMY)
 * into Convex's `classFormats` table.
 *
 * Usage: node scripts/seed-class-formats.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const FORMATS = [
  // ── FIIT Co. group classes (8 formats) ─────────────────────────────────
  { slug: "fiit-hybrid", num: "01", tag: "Hybrid", title: "FIIT Hybrid",
    category: "fiit", imageUrl: "/classes/hybrid.webp",
    includes: ["Boxing drills", "4 functional rounds", "Race-inspired format", "Team energy"],
    who: "Playfully known as Hybox: boxing drills meet functional stations over four rounds.",
    displayOrder: 1 },
  { slug: "fiit-endure", num: "02", tag: "Endurance", title: "FIIT Endure",
    category: "fiit", imageUrl: "/classes/endure.webp",
    includes: ["Fight-inspired intervals", "Stamina & speed", "Agility & flexibility", "Later-round fuel"],
    who: "Endurance-style fight training. Fighters start strong and take over at the end.",
    displayOrder: 2 },
  { slug: "fiit-lift", num: "03", tag: "Strength", title: "FIIT Lift",
    category: "fiit", imageUrl: "/classes/lift.webp",
    includes: ["9 stations", "Barbells & kettlebells", "Compound lifts", "Lean muscle work"],
    who: "Traditional muscle-building designed to increase strength and lean mass.",
    displayOrder: 3 },
  { slug: "fiit-boxing-pad-work", num: "04", tag: "Boxing", title: "FIIT Boxing Pad Work",
    category: "fiit", imageUrl: "/classes/pad-work.webp",
    includes: ["Partner rounds", "Holding & striking", "Technique focus", "Real drills"],
    who: "Curated partner rounds to refine proper boxing technique.",
    displayOrder: 4 },
  { slug: "fiit-boxing-bag-work", num: "05", tag: "Boxing", title: "FIIT Boxing Bag Work",
    category: "fiit", imageUrl: "/classes/bag-work.webp",
    includes: ["Heavy bag rounds", "Full-body work", "All fitness levels", "Power & flow"],
    who: "Intense, full-body bag workout built for every level.",
    displayOrder: 5 },
  { slug: "fiit-caveman-circuit", num: "06", tag: "Circuit", title: "FIIT Caveman Circuit",
    category: "fiit", imageUrl: "/classes/caveman.webp",
    includes: ["10 dynamic stations", "5-min rounds", "Push, pull, run", "Mental & physical test"],
    who: "The original FIIT circuit that tests your mental and physical endurance.",
    displayOrder: 6 },
  { slug: "muay-thai-kickboxing", num: "07", tag: "Muay Thai", title: "Muay Thai Kickboxing",
    category: "fiit", imageUrl: "/classes/muay-thai.webp",
    includes: ["Punches & kicks", "Elbows & knees", "Cardio blocks", "Strength finish"],
    who: "Powerful strikes combined with intense cardio and strength training.",
    displayOrder: 7 },
  { slug: "fiit-conditioning", num: "08", tag: "Conditioning", title: "FIIT Conditioning",
    category: "fiit", imageUrl: undefined,
    includes: ["3 rounds", "Unilateral & stability work", "Total-body strength & coordination", "Agility & flexibility"],
    who: "Three sub-classes: FIIT Glute Lab, FIIT Core & Control & Abs, and FIIT Iron Engine Full Body.",
    displayOrder: 8 },

  // ── FIIT Boxing Academy (4 cards) ──────────────────────────────────────
  { slug: "boxing-academy-fundamentals", num: "09", tag: "Academy · L1",
    title: "Boxing Academy · Fundamentals", category: "academy",
    imageUrl: "/placeholders/class-academy-l1.jpg",
    includes: ["Authentic stance", "Defense & movement", "Combinations", "Rhythm & coordination"],
    who: "Level 1: learn technique, stance, defense and body control.",
    displayOrder: 9 },
  { slug: "boxing-academy-technical-sparring", num: "10", tag: "Academy · L2",
    title: "Boxing Academy · Technical Sparring", category: "academy",
    imageUrl: "/placeholders/class-academy-l2.jpg",
    includes: ["Controlled partner drills", "Technical sparring", "Ring craft", "Real application"],
    who: "Level 2: controlled drills and technical sparring bridge training and fighting.",
    displayOrder: 10 },
  { slug: "boxing-academy-competition", num: "11", tag: "Academy · L3",
    title: "Boxing Academy · Competition", category: "academy",
    imageUrl: "/placeholders/class-academy-l3.jpg",
    includes: ["Open sparring", "Tactical development", "Fight preparation", "Competition track"],
    who: "Level 3: where athletes become fighters. Advanced program, fight preparation.",
    displayOrder: 11 },
  { slug: "kids-teens-program", num: "12", tag: "Kids & Teens", title: "Kids & Teens Program",
    category: "academy", imageUrl: "/placeholders/class-kids-teens.jpg",
    includes: ["Ages 7–17", "Coached progression", "Confidence & discipline", "Structured & fun"],
    who: "Kids (7–12) and Teens (12–17): empower young fighters through combat training.",
    displayOrder: 12 },
];

async function main() {
  console.log(`Seeding ${FORMATS.length} class formats → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listClassFormats");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} class formats already exist. Aborting.`);
    process.exit(1);
  }
  let ok = 0;
  for (const f of FORMATS) {
    try {
      await client.mutation("websiteContent:createClassFormat", {
        slug: f.slug, num: f.num, tag: f.tag, title: f.title, category: f.category,
        ...(f.imageUrl ? { imageUrl: f.imageUrl } : {}),
        includes: f.includes, who: f.who, displayOrder: f.displayOrder,
      });
      console.log(`  ✓ ${f.num} ${f.title}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${f.title}: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${FORMATS.length}.`);
}
main().catch((err) => { console.error("Seed crashed:", err); process.exit(1); });
