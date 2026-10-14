/*
 * One-off seed — ports the 6 hardcoded member testimonials from the
 * homepage (TESTIMONIALS array in page.tsx) into Convex's `testimonials`
 * table.
 *
 * Usage: node scripts/seed-testimonials.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const TESTIMONIALS = [
  {
    firstName: "Ahmed",
    lastInitial: "A",
    role: "Member",
    rating: 5,
    text: "A welcoming space to exercise with no judgement. If you want to get excited about getting in great shape Jason is the man. In just 1 week my boxing technique and fitness improved, and I'm looking forward to more progress. I feel glad to be part of this tribe.",
    source: "Google Review",
    displayOrder: 1,
  },
  {
    firstName: "Heather",
    lastInitial: "W",
    role: "Member",
    rating: 5,
    text: "Since my first day at FIIT, I've been warmly welcomed by Jason and the trainers, and all of the members. Although I've only been attending for a few weeks, it already feels like home.",
    source: "Google Review",
    displayOrder: 2,
  },
  {
    firstName: "Tim",
    lastInitial: "M",
    role: "Member · Parent",
    rating: 5,
    text: "It's been a great bonding experience with my son as we enjoy training together. FIIT offers an opportunity to combine fitness and fun through a variety of creative classes led by highly motivational instructors.",
    source: "Google Review",
    displayOrder: 3,
  },
  {
    firstName: "JD",
    lastInitial: "L",
    role: "Member",
    rating: 5,
    text: "I really enjoy the combination of boxing bag workouts with the high intensity workouts. The trainers are extremely knowledgable and passionate. The community is really friendly and positive as well.",
    source: "Google Review",
    displayOrder: 4,
  },
  {
    firstName: "Eriko",
    lastInitial: "I",
    role: "Member",
    rating: 5,
    text: "Absolutely amazing boxing gym! Jason is very friendly and kind from day 1 of my visit. He helps every beginner to learn the basics and motivates everyone. Highly recommended!",
    source: "Google Review",
    displayOrder: 5,
  },
  {
    firstName: "Alex",
    lastInitial: "H",
    role: "Member",
    rating: 5,
    text: "Always a great workout. Jason and the team are extremely welcoming and create a fun and challenging workout environment. Highly recommend!",
    source: "Google Review",
    displayOrder: 6,
  },
];

async function main() {
  console.log(`Seeding ${TESTIMONIALS.length} testimonials → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listTestimonials");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} testimonials already exist. Aborting.`);
    process.exit(1);
  }
  let ok = 0;
  for (const t of TESTIMONIALS) {
    try {
      await client.mutation("websiteContent:createTestimonial", t);
      console.log(`  ✓ ${t.firstName} ${t.lastInitial}.`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${t.firstName} ${t.lastInitial}.: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${TESTIMONIALS.length}.`);
}

main().catch((err) => { console.error("Seed crashed:", err); process.exit(1); });
