/*
 * One-off seed — ports the current hardcoded trainer roster from
 * fiit-website/src/app/_data/trainers.ts into Convex's `trainers` table.
 *
 * Idempotent-ish: if you re-run, you'll insert duplicates. For a fresh
 * seed, delete all existing trainers via the admin UI first.
 *
 * Photos: the hardcoded data references local files under
 *   /public/trainers/jason.webp etc.
 * We'll store those as relative URLs for now. When Arden uploads proper
 * headshots via the admin UI, they'll move to Convex file storage and
 * this reference becomes historical.
 *
 * Usage: node scripts/seed-trainers.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// Full roster from _data/trainers.ts — including the category split we set up
// earlier (FIIT trainers vs the one Boxing Academy coach).
const ROSTER = [
  {
    slug: "jason",
    name: "Jason Battiste",
    role: "Owner & Founder",
    category: "fiit",
    bio:
      "Former Canadian Super Middleweight Kickboxing Champion with 37+ years in combat training. Lives by: \"Don't stop when you're tired. Stop when you're done.\"",
    fullBio: [
      "Jason Battiste is the founder of FIIT Co. and the reason the studio exists. A former Canadian Super Middleweight Kickboxing Champion with 37+ years of combat experience, he's spent the better part of four decades learning how to coach the sport he loves, and translating that knowledge into a room where everyone from first-timers to working fighters can thrive.",
      "He opened FIIT Co. in Leslieville because he wanted a space that felt like a real gym: raw, honest, and unapologetically centred on technique. No pretense, no attitude, no scripted hype. Just real work.",
      "His mantra, printed on the wall and repeated in every class: don't stop when you're tired; stop when you're done.",
    ],
    tags: ["Boxing", "Kickboxing", "Founder"],
    photoUrl: "/trainers/jason.webp",
    displayOrder: 1,
  },
  {
    slug: "sarah",
    name: "Sarah Green",
    role: "Trainer · Kickboxing & Yoga",
    category: "fiit",
    bio:
      "Certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years' experience. Avid runner and coffee drinker.",
    fullBio: [
      "Sarah is a certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years of experience on both sides of the mic. She's the kind of coach who can take a brand-new member's fear of the heavy bag and turn it into their favourite class of the week.",
      "Outside of the studio, she's an avid runner, a serial coffee drinker, and a constant presence in the Leslieville community. Her classes blend conditioning and technique with a patient, welcoming tone that makes them a favourite for beginners and regulars alike.",
    ],
    tags: ["Kickboxing", "Yoga", "TRX"],
    photoUrl: "/trainers/sarah.webp",
    displayOrder: 2,
  },
  {
    slug: "jaye",
    name: "Jaye Pan",
    role: "Strength & Performance",
    category: "fiit",
    bio:
      "Strength & Conditioning coach with a background in kinesiology, varsity athletics, and rehab-focused training. Bridges performance and rehabilitation.",
    fullBio: [
      "Jaye is a Strength & Conditioning coach whose background sits where most coaches don't: at the intersection of kinesiology, varsity athletics, and rehabilitation-focused training. He builds programs for athletes returning from injury as fluently as he does for members chasing a new personal best.",
      "His approach is methodical and athlete-first. Expect clear programming, real progression, and a coach who understands that \"stronger\" and \"healthier\" are the same goal, not competing ones.",
    ],
    tags: ["Strength", "Performance", "Rehab"],
    photoUrl: undefined,
    displayOrder: 3,
  },
  {
    slug: "matt",
    name: "Matt Makar",
    role: "Trainer",
    category: "fiit",
    bio: "Full bio coming soon.",
    fullBio: ["Matt's full bio is on the way. Check back soon for the details."],
    tags: ["Training"],
    photoUrl: undefined,
    displayOrder: 4,
  },
  {
    slug: "nick",
    name: "Nick Radionov",
    role: "Boxing Academy Head Coach",
    category: "academy",
    bio:
      "Former Ukrainian National Olympic team member. Boxing Ontario Level 3 coach with 200+ bouts. Two-time World Kickboxing & European Savate Champion.",
    fullBio: [
      "Nick Radionov is a former member of the Ukrainian National Olympic Boxing team and a Boxing Ontario Level 3 coach with over 200 amateur and professional bouts to his name. He's a two-time World Kickboxing Champion and a European Savate Champion. Few coaches in Toronto carry that kind of competitive résumé.",
      "At FIIT Co. he leads the Boxing Academy, the program built for members who want to take their training from fitness-focused to competition-ready. His coaching is technical, demanding, and relentlessly precise. If you want to learn how fighters actually train, Nick is the person you want in your corner.",
    ],
    tags: ["Academy", "Competition", "Olympic"],
    photoUrl: "/trainers/nick.jpeg",
    displayOrder: 5,
  },
];

async function main() {
  console.log(`Seeding ${ROSTER.length} trainers → ${CONVEX_URL}`);

  const existing = await client.query("websiteContent:listTrainers");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} trainers already exist in Convex.`);
    console.log(
      "   Clear them via the admin UI (or delete manually) before re-seeding."
    );
    console.log("   Aborting to avoid duplicates.\n");
    process.exit(1);
  }

  let ok = 0;
  for (const t of ROSTER) {
    try {
      await client.mutation("websiteContent:createTrainer", {
        slug: t.slug,
        name: t.name,
        role: t.role,
        category: t.category,
        bio: t.bio,
        fullBio: t.fullBio,
        tags: t.tags,
        photoUrl: t.photoUrl,        // existing static URL from /public
        displayOrder: t.displayOrder,
      });
      console.log(`  ✓ ${t.name}${t.photoUrl ? ` (photo: ${t.photoUrl})` : " (no photo)"}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${t.name}: ${err.message}`);
    }
  }

  console.log(`\nDone. Inserted: ${ok}/${ROSTER.length}.`);
}

main().catch((err) => {
  console.error("Seed crashed:", err);
  process.exit(1);
});
