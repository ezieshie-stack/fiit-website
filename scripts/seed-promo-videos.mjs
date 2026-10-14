/*
 * One-off seed — moves the hardcoded homepage promo video into Convex so
 * Arden can manage it via the ops tool's Website Promo Videos admin.
 *
 * Usage: node scripts/seed-promo-videos.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const VIDEOS = [
  {
    title: "FIIT Co. Promo (April 2026)",
    youtubeId: "EQ3KwKC5Ec8",
    pageSlot: "home:after-testimonials",
    headline: "See FIIT Co.\nIn Action.",
    subheadline: "A minute inside the studio. The floor, the coaches, the community.",
    displayOrder: 1,
  },
];

async function main() {
  console.log(`Seeding ${VIDEOS.length} promo video(s) → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listPromoVideos");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} promo videos already exist. Aborting.`);
    process.exit(1);
  }

  let ok = 0;
  for (const v of VIDEOS) {
    try {
      await client.mutation("websiteContent:createPromoVideo", v);
      console.log(`  ✓ ${v.title} → slot "${v.pageSlot}"`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${v.title}: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${VIDEOS.length}.`);
}

main().catch((err) => { console.error("Seed crashed:", err); process.exit(1); });
