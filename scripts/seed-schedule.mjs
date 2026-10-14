/*
 * One-off seed script for the Fiitco-Operation Convex deployment.
 *
 * Populates the `weeklySchedule` table with a realistic sample week of
 * classes so the fiit-website homepage schedule widget has something to
 * render while Arden prepares the real schedule in the management tool.
 *
 * Usage:
 *   node scripts/seed-schedule.mjs
 *
 * Idempotent-ish: each run calls `addScheduleSlot` once per slot. If you
 * re-run, you'll get duplicates. For a fresh seed, use the ops dashboard
 * to clear the table first, or add a flush step.
 */

import { ConvexHttpClient } from "convex/browser";

const CONVEX_URL = "https://dutiful-ferret-681.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// Week starting Monday Apr 20, 2026. Arbitrary near-term dates so the data
// has concrete `date` values — the widget filters on `dayOfWeek` so the
// exact date doesn't matter for display.
const WEEK = {
  Monday: "2026-04-20",
  Tuesday: "2026-04-21",
  Wednesday: "2026-04-22",
  Thursday: "2026-04-23",
  Friday: "2026-04-24",
  Saturday: "2026-04-25",
  Sunday: "2026-04-26",
};

// Instructor lookup — IDs mirror trainers.ts ids, names match full names.
const INST = {
  jason: { id: "INST-JASON", name: "Jason Battiste" },
  sarah: { id: "INST-SARAH", name: "Sarah Green" },
  jaye: { id: "INST-JAYE", name: "Jaye Pan" },
  matt: { id: "INST-MATT", name: "Matt Makar" },
  nick: { id: "INST-NICK", name: "Nick Radionov" },
};

const CLS = {
  hybrid: { id: "CLS-HYBRID", name: "FIIT Hybrid", cat: "Group Fitness" },
  lift: { id: "CLS-LIFT", name: "FIIT Lift", cat: "Strength" },
  endure: { id: "CLS-ENDURE", name: "FIIT Endure", cat: "Endurance" },
  bag: { id: "CLS-BAG", name: "FIIT Boxing Bag Work", cat: "Boxing" },
  pad: { id: "CLS-PAD", name: "FIIT Boxing Pad Work", cat: "Boxing" },
  caveman: { id: "CLS-CAVEMAN", name: "FIIT Caveman Circuit", cat: "Circuit" },
  muay: { id: "CLS-MUAY", name: "Muay Thai Kickboxing", cat: "Muay Thai" },
  conditioning: { id: "CLS-COND", name: "FIIT Conditioning", cat: "Conditioning" },
  academyFund: { id: "CLS-ACA-L1", name: "Boxing Academy · Fundamentals", cat: "Academy · L1" },
  academySpar: { id: "CLS-ACA-L2", name: "Boxing Academy · Technical Sparring", cat: "Academy · L2" },
  academyComp: { id: "CLS-ACA-L3", name: "Boxing Academy · Competition", cat: "Academy · L3" },
  academyTeens: { id: "CLS-ACA-TEENS", name: "Boxing Academy · Teens", cat: "Academy · Teens" },
};

// Schedule entries. Each row becomes one addScheduleSlot call.
const SCHEDULE = [
  // ── Monday ──
  { day: "Monday", start: "06:00", end: "06:50", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Monday", start: "10:00", end: "11:00", cls: CLS.hybrid, inst: INST.jason, capacity: 14 },
  { day: "Monday", start: "12:00", end: "12:50", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Monday", start: "16:30", end: "17:30", cls: CLS.academyTeens, inst: INST.nick, capacity: 12 },
  { day: "Monday", start: "17:30", end: "18:30", cls: CLS.academyFund, inst: INST.nick, capacity: 12 },
  { day: "Monday", start: "18:30", end: "19:30", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Monday", start: "19:30", end: "20:30", cls: CLS.academySpar, inst: INST.nick, capacity: 10 },

  // ── Tuesday ──
  { day: "Tuesday", start: "06:00", end: "06:50", cls: CLS.lift, inst: INST.jaye, capacity: 12 },
  { day: "Tuesday", start: "09:30", end: "10:30", cls: CLS.muay, inst: INST.sarah, capacity: 14 },
  { day: "Tuesday", start: "12:00", end: "12:50", cls: CLS.bag, inst: INST.jason, capacity: 16 },
  { day: "Tuesday", start: "17:30", end: "18:30", cls: CLS.endure, inst: INST.sarah, capacity: 14 },
  { day: "Tuesday", start: "18:30", end: "19:30", cls: CLS.pad, inst: INST.jason, capacity: 16 },
  { day: "Tuesday", start: "19:30", end: "20:30", cls: CLS.academyComp, inst: INST.nick, capacity: 10 },

  // ── Wednesday ──
  { day: "Wednesday", start: "06:00", end: "06:50", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Wednesday", start: "10:00", end: "11:00", cls: CLS.conditioning, inst: INST.jaye, capacity: 12 },
  { day: "Wednesday", start: "12:00", end: "12:50", cls: CLS.caveman, inst: INST.jason, capacity: 14 },
  { day: "Wednesday", start: "16:30", end: "17:30", cls: CLS.academyTeens, inst: INST.nick, capacity: 12 },
  { day: "Wednesday", start: "17:30", end: "18:30", cls: CLS.academyFund, inst: INST.nick, capacity: 12 },
  { day: "Wednesday", start: "18:30", end: "19:30", cls: CLS.hybrid, inst: INST.matt, capacity: 16 },

  // ── Thursday ──
  { day: "Thursday", start: "06:00", end: "06:50", cls: CLS.lift, inst: INST.jaye, capacity: 12 },
  { day: "Thursday", start: "09:30", end: "10:30", cls: CLS.endure, inst: INST.sarah, capacity: 14 },
  { day: "Thursday", start: "12:00", end: "12:50", cls: CLS.muay, inst: INST.sarah, capacity: 14 },
  { day: "Thursday", start: "17:30", end: "18:30", cls: CLS.bag, inst: INST.matt, capacity: 16 },
  { day: "Thursday", start: "18:30", end: "19:30", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Thursday", start: "19:30", end: "20:30", cls: CLS.academySpar, inst: INST.nick, capacity: 10 },

  // ── Friday ──
  { day: "Friday", start: "06:00", end: "06:50", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Friday", start: "10:00", end: "11:00", cls: CLS.caveman, inst: INST.jason, capacity: 14 },
  { day: "Friday", start: "12:00", end: "12:50", cls: CLS.pad, inst: INST.matt, capacity: 16 },
  { day: "Friday", start: "17:30", end: "18:30", cls: CLS.endure, inst: INST.sarah, capacity: 14 },
  { day: "Friday", start: "18:30", end: "19:30", cls: CLS.academyFund, inst: INST.nick, capacity: 12 },

  // ── Saturday ──
  { day: "Saturday", start: "08:00", end: "09:00", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Saturday", start: "09:00", end: "10:00", cls: CLS.conditioning, inst: INST.jaye, capacity: 12 },
  { day: "Saturday", start: "10:00", end: "11:00", cls: CLS.muay, inst: INST.sarah, capacity: 14 },
  { day: "Saturday", start: "11:00", end: "12:00", cls: CLS.academyFund, inst: INST.nick, capacity: 12 },
  { day: "Saturday", start: "12:00", end: "13:00", cls: CLS.academySpar, inst: INST.nick, capacity: 10 },

  // ── Sunday ──
  { day: "Sunday", start: "09:00", end: "10:00", cls: CLS.hybrid, inst: INST.jason, capacity: 16 },
  { day: "Sunday", start: "10:00", end: "11:00", cls: CLS.lift, inst: INST.jaye, capacity: 12 },
  { day: "Sunday", start: "11:00", end: "12:00", cls: CLS.endure, inst: INST.sarah, capacity: 14 },
];

async function main() {
  console.log(`Seeding ${SCHEDULE.length} schedule slots → ${CONVEX_URL}`);

  let ok = 0;
  let failed = 0;

  for (const row of SCHEDULE) {
    const args = {
      date: WEEK[row.day],
      dayOfWeek: row.day,
      startTime: row.start,
      endTime: row.end,
      classId: row.cls.id,
      className: row.cls.name,
      categoryName: row.cls.cat,
      instructorId: row.inst.id,
      instructorName: row.inst.name,
      capacity: row.capacity,
      // Bypass buffer-time checks — sample data intentionally packs close
      // together for visual density.
      bufferOverrideAcknowledged: true,
    };

    try {
      await client.mutation("mutations:addScheduleSlot", args);
      process.stdout.write(".");
      ok++;
    } catch (err) {
      process.stdout.write("x");
      console.error(`\n  failed: ${row.day} ${row.start} ${row.cls.name} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\n\nDone. Inserted: ${ok}, failed: ${failed}.`);
  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Seed script crashed:", err);
  process.exit(1);
});
