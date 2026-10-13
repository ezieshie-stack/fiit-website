/*
 * One-off seed — registers hero backgrounds + studio gallery images as
 * manageable records in Convex's websiteImages table so Arden can swap
 * them via the ops tool's Website Images admin.
 *
 * Usage: node scripts/seed-website-images.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const IMAGES = [
  // ── Hero backgrounds ─────────────────────────────────────────────────
  {
    slot: "home-hero",
    label: "Homepage Hero Background",
    group: "hero",
    page: "home",
    imageUrl: "/hero/home.webp",
    altText: "FIIT Co. boxing studio training floor in Leslieville, Toronto",
    displayOrder: 1,
  },
  {
    slot: "about-hero",
    label: "About Page Hero Background",
    group: "hero",
    page: "about",
    imageUrl: "/placeholders/hero-about.jpg",
    altText: "Boxer leaning on the ropes inside the ring at FIIT Co. Leslieville",
    displayOrder: 2,
  },
  {
    slot: "programs-hero",
    label: "Programs Page Hero Background",
    group: "hero",
    page: "programs",
    imageUrl: "/placeholders/hero-programs.jpg",
    altText: "Athletes jumping rope at FIIT Co. boxing studio in Leslieville Toronto",
    displayOrder: 3,
  },
  {
    slot: "blog-hero",
    label: "Journal Page Hero Background",
    group: "hero",
    page: "blog",
    imageUrl: "/placeholders/hero-blog.jpg",
    altText: "Sparring boxers trade punches at FIIT Co. boxing studio Toronto",
    displayOrder: 4,
  },

  // ── Studio gallery (7 images in the grid on /studio) ─────────────────
  {
    slot: "studio-gallery-1",
    label: "Studio Gallery — Image 1 (tall)",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-1.jpg",
    altText: "FIIT Co. boxing studio training floor in Leslieville Toronto",
    displayOrder: 1,
  },
  {
    slot: "studio-gallery-2",
    label: "Studio Gallery — Image 2",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-2.jpg",
    altText: "Row of heavy bags at FIIT Co. boxing gym",
    displayOrder: 2,
  },
  {
    slot: "studio-gallery-3",
    label: "Studio Gallery — Image 3",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-3.jpg",
    altText: "Strength and conditioning area at FIIT Co. Leslieville",
    displayOrder: 3,
  },
  {
    slot: "studio-gallery-4",
    label: "Studio Gallery — Image 4",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-4.jpg",
    altText: "Barbells, kettlebells, and free weights at FIIT Co. boxing studio",
    displayOrder: 4,
  },
  {
    slot: "studio-gallery-5",
    label: "Studio Gallery — Image 5",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-5.jpg",
    altText: "Open boutique training layout at FIIT Co. boxing gym in Toronto",
    displayOrder: 5,
  },
  {
    slot: "studio-gallery-6",
    label: "Studio Gallery — Image 6",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-6.jpg",
    altText: "FIIT Co. boxing floor, 1047 Gerrard St E Leslieville",
    displayOrder: 6,
  },
  {
    slot: "studio-gallery-7",
    label: "Studio Gallery — Image 7",
    group: "gallery",
    page: "studio",
    imageUrl: "/studio/interior-7.jpg",
    altText: "Functional conditioning space with rowers and airbikes at FIIT Co.",
    displayOrder: 7,
  },
];

async function main() {
  console.log(`Seeding ${IMAGES.length} image slot(s) → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listWebsiteImages");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} images already exist. Aborting.`);
    process.exit(1);
  }
  let ok = 0;
  for (const img of IMAGES) {
    try {
      await client.mutation("websiteContent:createWebsiteImage", img);
      console.log(`  ✓ ${img.slot.padEnd(22)} ${img.label}`);
      ok++;
    } catch (err) {
      console.error(`  ✗ ${img.slot}: ${err.message}`);
    }
  }
  console.log(`\nDone. Inserted: ${ok}/${IMAGES.length}.`);
}
main().catch((err) => { console.error("Seed crashed:", err); process.exit(1); });
