/*
 * One-off seed — ports the 5 hardcoded homepage FAQ entries from page.tsx
 * into Convex's `faqEntries` table.
 *
 * Usage: node scripts/seed-faqs.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const FAQS = [
  {
    question: "Do I need boxing or fight training experience to take a class?",
    answer: "Absolutely not. Our classes are designed for all levels from beginner to advanced. Each class goes over technique and form so you have the tools you need to succeed. The most important thing is that you work hard and have fun.",
    displayOrder: 1,
  },
  {
    question: "It's my first time. What equipment do I need?",
    answer: "All you need is workout clothes, comfortable shoes and a refillable water bottle. For your first class, you can borrow a pair of boxing gloves. After that, gloves rent for $10 per session or you can buy a pair from us.",
    displayOrder: 2,
  },
  {
    question: "Do you offer affordable membership options?",
    answer: "At FIIT Co, we believe fitness is for everybody. We have a variety of memberships based on your goals and budget: 5, 10 or 20 class passes, monthly memberships, and auto-renew plans.",
    displayOrder: 3,
  },
  {
    question: "Do you have personal trainers available?",
    answer: "Yes. We offer one-on-one training to help you meet your goals faster. Depending on your goals, budget and schedule, we'll match you to a trainer that can best meet your needs.",
    displayOrder: 4,
  },
  {
    question: "Where exactly is the gym?",
    answer: "FIIT Co is located in Leslieville at 1047 Gerrard St E on the upper floor, above The Vatican Gift Shop. Nearest intersection: Gerrard and Jones.",
    displayOrder: 5,
  },
];

async function main() {
  console.log(`Seeding ${FAQS.length} FAQ entries → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listFaqEntries");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} FAQ entries already exist. Aborting.`);
    process.exit(1);
  }
  let ok = 0;
  for (const f of FAQS) {
    try {
      await client.mutation("websiteContent:createFaqEntry", f);
      console.log(`  ✓ ${f.question.slice(0, 60)}${f.question.length > 60 ? "…" : ""}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${f.question}: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${FAQS.length}.`);
}

main().catch((err) => { console.error("Seed crashed:", err); process.exit(1); });
