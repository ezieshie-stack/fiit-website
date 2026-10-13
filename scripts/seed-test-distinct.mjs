/*
 * Distinctive test seed — proves the widget is pulling LIVE Convex data and
 * not its hardcoded fallback.
 *
 * Every slot here has something intentionally weird you won't find in the
 * fallback SAMPLE_SCHEDULE embedded in schedule-widget.tsx:
 *   • Capacity = 99 (fallback uses 10 / 12 / 14 / 16)
 *   • A star prefix on class names ("★ FIIT Hybrid")
 *   • One outlier class at 04:20 AM Monday ("★ DAWN PATROL" — not in fallback)
 *   • Distinct instructor mix vs fallback
 *
 * If you reload the homepage after running this script and see ★ / 99 /
 * "DAWN PATROL" on the schedule → the widget is querying Convex live. ✅
 * If you still see clean class names + capacity 14/16 etc → it's serving
 * the hardcoded fallback, meaning the live query isn't succeeding.
 *
 * Usage:
 *   node scripts/seed-test-distinct.mjs        (clears + reseeds test data)
 *   node scripts/seed-schedule.mjs             (restores realistic seed)
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

const WEEK = {
  Monday: "2026-04-20",
  Tuesday: "2026-04-21",
  Wednesday: "2026-04-22",
  Thursday: "2026-04-23",
  Friday: "2026-04-24",
  Saturday: "2026-04-25",
  Sunday: "2026-04-26",
};

// Every class name gets the ★ marker. Capacity is always 99 (obviously
// fake). One Monday slot at 04:20 AM is a unique marker that can't exist
// in the fallback.
const TEST_ROWS = [
  { day: "Monday", start: "04:20", end: "05:00", name: "★ DAWN PATROL", inst: "Matt Makar" },
  { day: "Monday", start: "07:15", end: "08:15", name: "★ FIIT Hybrid", inst: "Jason Battiste" },
  { day: "Monday", start: "13:45", end: "14:45", name: "★ FIIT Lift", inst: "Jaye Pan" },
  { day: "Monday", start: "19:00", end: "20:00", name: "★ Boxing Academy · Fundamentals", inst: "Nick Radionov" },

  { day: "Tuesday", start: "07:15", end: "08:15", name: "★ FIIT Endure", inst: "Sarah Green" },
  { day: "Tuesday", start: "11:30", end: "12:30", name: "★ Muay Thai Kickboxing", inst: "Sarah Green" },
  { day: "Tuesday", start: "18:15", end: "19:15", name: "★ FIIT Boxing Pad Work", inst: "Matt Makar" },

  { day: "Wednesday", start: "07:15", end: "08:15", name: "★ FIIT Hybrid", inst: "Jason Battiste" },
  { day: "Wednesday", start: "11:30", end: "12:30", name: "★ FIIT Conditioning", inst: "Jaye Pan" },
  { day: "Wednesday", start: "18:15", end: "19:15", name: "★ Boxing Academy · Technical Sparring", inst: "Nick Radionov" },

  { day: "Thursday", start: "07:15", end: "08:15", name: "★ FIIT Lift", inst: "Jaye Pan" },
  { day: "Thursday", start: "11:30", end: "12:30", name: "★ FIIT Boxing Bag Work", inst: "Matt Makar" },
  { day: "Thursday", start: "18:15", end: "19:15", name: "★ FIIT Caveman Circuit", inst: "Jason Battiste" },

  { day: "Friday", start: "07:15", end: "08:15", name: "★ FIIT Hybrid", inst: "Jason Battiste" },
  { day: "Friday", start: "11:30", end: "12:30", name: "★ Muay Thai Kickboxing", inst: "Sarah Green" },
  { day: "Friday", start: "18:15", end: "19:15", name: "★ Boxing Academy · Competition", inst: "Nick Radionov" },

  { day: "Saturday", start: "09:15", end: "10:15", name: "★ FIIT Hybrid", inst: "Jason Battiste" },
  { day: "Saturday", start: "11:30", end: "12:30", name: "★ Boxing Academy · Fundamentals", inst: "Nick Radionov" },

  { day: "Sunday", start: "09:15", end: "10:15", name: "★ FIIT Endure", inst: "Sarah Green" },
  { day: "Sunday", start: "11:30", end: "12:30", name: "★ FIIT Conditioning", inst: "Jaye Pan" },
];

// Instructor id lookup — kept consistent with the main seed.
const INSTRUCTOR_IDS = {
  "Jason Battiste": "INST-JASON",
  "Sarah Green": "INST-SARAH",
  "Jaye Pan": "INST-JAYE",
  "Matt Makar": "INST-MATT",
  "Nick Radionov": "INST-NICK",
};

async function clearAll() {
  console.log("Clearing existing weeklySchedule slots...");
  const existing = await client.query("queries:getWeeklySchedule");
  console.log(`  Found ${existing.length} slots to delete.`);
  let deleted = 0;
  for (const slot of existing) {
    try {
      await client.mutation("mutations:deleteScheduleSlot", { id: slot._id });
      deleted++;
      process.stdout.write(".");
    } catch (err) {
      process.stdout.write("x");
      console.error(`\n  failed to delete ${slot._id}: ${err.message}`);
    }
  }
  console.log(`\n  Deleted ${deleted}/${existing.length}.`);
  return deleted;
}

async function seedDistinct() {
  console.log(`\nSeeding ${TEST_ROWS.length} distinct test slots...`);
  let ok = 0;
  for (const row of TEST_ROWS) {
    const args = {
      date: WEEK[row.day],
      dayOfWeek: row.day,
      startTime: row.start,
      endTime: row.end,
      classId: "TEST-" + row.name.replace(/[^A-Z0-9]/gi, "-").toUpperCase().slice(0, 30),
      className: row.name,
      categoryName: "Live Test",
      instructorId: INSTRUCTOR_IDS[row.inst] || "INST-UNKNOWN",
      instructorName: row.inst,
      // Obvious fake capacity so it's visually distinct from the fallback's
      // 10 / 12 / 14 / 16 numbers.
      capacity: 99,
      bufferOverrideAcknowledged: true,
    };
    try {
      await client.mutation("mutations:addScheduleSlot", args);
      process.stdout.write(".");
      ok++;
    } catch (err) {
      process.stdout.write("x");
      console.error(`\n  failed: ${row.day} ${row.start} — ${err.message}`);
    }
  }
  console.log(`\n  Inserted ${ok}/${TEST_ROWS.length}.`);
  return ok;
}

async function main() {
  await clearAll();
  await seedDistinct();

  // Verify
  const after = await client.query("queries:getWeeklySchedule");
  console.log(`\nConvex now holds ${after.length} slots.`);
  console.log(`Sample (Monday):`);
  for (const s of after.filter((x) => x.dayOfWeek === "Monday").slice(0, 5)) {
    console.log(`  ${s.startTime}-${s.endTime}  ${s.className}  ${s.instructorName}  capacity=${s.capacity}`);
  }
  console.log(`\n→ Reload https://fiit-website-liart.vercel.app and check for ★ / DAWN PATROL / 99 spots.`);
}

main().catch((err) => {
  console.error("Test seed crashed:", err);
  process.exit(1);
});
