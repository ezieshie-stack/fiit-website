/*
 * One-off seed — ports the current hardcoded Leslieville location into
 * Convex's `locations` table. Coordinates, hours, and contact info are
 * preserved exactly from the existing SiteFooter + studio page.
 *
 * Usage: node scripts/seed-locations.mjs
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const LOCATION = {
  slug: "leslieville",
  name: "FIIT Co. Leslieville",
  address1: "1047 Gerrard St E",
  city: "Toronto",
  region: "ON",
  postalCode: "M4M 1Z7",
  country: "CA",
  phone: "(416) 565-9300",
  email: "info@fiitco.ca",
  latitude: 43.6689575,
  longitude: -79.3362194,
  hoursMonFri: "6:00 AM – 8:30 PM",
  hoursSatSun: "8:00 AM – 8:30 PM",
  isPrimary: true,
  displayOrder: 1,
};

async function main() {
  console.log(`Seeding 1 location → ${CONVEX_URL}`);
  const existing = await client.query("websiteContent:listLocations");
  if (existing.length > 0) {
    console.log(`\n⚠️  ${existing.length} locations already exist. Aborting.`);
    process.exit(1);
  }
  try {
    await client.mutation("websiteContent:createLocation", LOCATION);
    console.log(`  ✓ ${LOCATION.name} (primary)`);
  } catch (err) {
    console.error(`  ✗ ${LOCATION.name}: ${err.message}`);
    process.exit(1);
  }
  console.log(`\nDone.`);
}

main().catch((err) => {
  console.error("Seed crashed:", err);
  process.exit(1);
});
