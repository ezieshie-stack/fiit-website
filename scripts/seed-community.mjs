/*
 * One-off seed — ports the current hardcoded collaborators from
 * fiit-website/src/app/_data/community.ts into Convex's `collaborators` table.
 *
 * Aborts if any records already exist to avoid duplicates.
 *
 * Usage: node scripts/seed-community.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const COLLABORATORS = [
  {
    slug: "vatican-gift-shop",
    name: "The Vatican Gift Shop",
    category: "Neighbour",
    description:
      "The storefront below the studio. Independent gift shop at the corner of Gerrard and Jones — impossible to miss on your way up to class.",
    href: undefined,
    location: "1047 Gerrard St E (ground floor)",
    confirmed: true,
    displayOrder: 1,
  },
  {
    slug: "better-bowls",
    name: "Better Bowls",
    category: "Nutrition",
    description:
      "Run by Caitlyn Bertone — nutrient-dense bowls and prepared meals built around real ingredients. Feeds a lot of FIIT Co. members on training days.",
    href: undefined,
    location: "Leslieville · Toronto",
    confirmed: true,
    displayOrder: 2,
  },
  {
    slug: "placeholder-coffee",
    name: "Local Coffee Roaster",
    category: "Coffee",
    description:
      "Neighbourhood coffee stop — post-training espresso, pre-training cold brew. [placeholder — Arden to confirm partner name.]",
    href: undefined,
    confirmed: false,
    displayOrder: 3,
  },
  {
    slug: "placeholder-wellness",
    name: "Recovery & Wellness Partner",
    category: "Wellness",
    description:
      "Massage, physio, or recovery studio member discount partner. [placeholder — Arden to confirm.]",
    href: undefined,
    confirmed: false,
    displayOrder: 4,
  },
  {
    slug: "placeholder-retail",
    name: "Apparel & Gear",
    category: "Retail",
    description:
      "Training apparel or boxing gear neighbour that FIIT Co. members cross-shop. [placeholder — Arden to confirm.]",
    href: undefined,
    confirmed: false,
    displayOrder: 5,
  },
  {
    slug: "placeholder-food",
    name: "Post-Training Spot",
    category: "Food",
    description:
      "Restaurant or market where the FIIT crew refuels after class. [placeholder — Arden to confirm.]",
    href: undefined,
    confirmed: false,
    displayOrder: 6,
  },
];

async function main() {
  console.log(`Seeding ${COLLABORATORS.length} collaborators → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listCollaborators");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} collaborators already exist. Aborting.`);
    process.exit(1);
  }
  let ok = 0;
  for (const c of COLLABORATORS) {
    try {
      await client.mutation("websiteContent:createCollaborator", {
        slug: c.slug,
        name: c.name,
        category: c.category,
        description: c.description,
        ...(c.href ? { href: c.href } : {}),
        ...(c.location ? { location: c.location } : {}),
        confirmed: c.confirmed,
        displayOrder: c.displayOrder,
      });
      console.log(`  ✓ ${c.name}${c.confirmed ? "" : " (placeholder)"}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${c.name}: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${COLLABORATORS.length}.`);
}

main().catch((err) => {
  console.error("Seed crashed:", err);
  process.exit(1);
});
