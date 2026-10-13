"use client";

/**
 * Weekly class schedule widget shown on the homepage and Programs page.
 *
 * Data source: `websiteContent:listActiveWebsiteSchedule` on the shared
 * Convex backend. This is admin-curated from staff.fiitco.ca > Website
 * UI/UX > Schedule. The widget no longer reads from the operational
 * `weeklySchedule` table — that's the staff portal's class-management
 * data and isn't suitable for public display.
 *
 * If the table is empty (e.g., right after deploy, before Arden has
 * seeded it via the admin "Seed default schedule" button), the widget
 * falls back to a small built-in template so the homepage never shows
 * an empty block.
 *
 * "Reserve" / "Book Via MindBody" buttons open the MindBody consumer
 * schedule. Spots-left / capacity numbers were intentionally removed
 * from this view — capacity belongs to live booking flows in MindBody,
 * not to a static template.
 */

import { useState } from "react";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "./schedule-widget.module.css";
import { MINDBODY_SCHEDULE_URL } from "@/lib/mindbody";

type Slot = {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  className: string;
  instructorName: string;
  categoryName?: string;
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// Day-name aliases — admins may type "Mon" or "Monday" depending on form
// behaviour, so accept both.
const DAY_ALIASES: Record<string, string> = {
  Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday",
  Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};

function normalizeDay(d: string): string {
  return DAY_ALIASES[d] ?? d;
}

// Built-in fallback used only when the websiteSchedule table is empty.
// Transcribed verbatim from the MindBody class schedule on 2026-04-28.
// Once Arden seeds the table via the admin UI, this is never displayed.
const FALLBACK_SCHEDULE: Slot[] = [
  // Monday
  { dayOfWeek: "Monday", startTime: "06:00", endTime: "06:50", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Monday", startTime: "10:00", endTime: "11:00", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Monday", startTime: "12:00", endTime: "12:50", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Monday", startTime: "16:30", endTime: "17:30", className: "Boxing Academy - Teens Boxing", instructorName: "Nick Radionov" },
  { dayOfWeek: "Monday", startTime: "17:30", endTime: "18:30", className: "Boxing Academy - Level 1 Technical Boxing", instructorName: "Nick Radionov" },
  { dayOfWeek: "Monday", startTime: "18:30", endTime: "19:30", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Monday", startTime: "19:30", endTime: "20:30", className: "Boxing Academy - Level 2 Technical Sparring", instructorName: "Nick Radionov" },
  // Tuesday
  { dayOfWeek: "Tuesday", startTime: "06:00", endTime: "07:00", className: "FIIT Lift", instructorName: "Sarah Green" },
  { dayOfWeek: "Tuesday", startTime: "12:00", endTime: "13:00", className: "FIIT Lift", instructorName: "Jason Battiste" },
  { dayOfWeek: "Tuesday", startTime: "17:00", endTime: "18:00", className: "Little Warriors Program (Kids)", instructorName: "Nick Radionov" },
  { dayOfWeek: "Tuesday", startTime: "18:30", endTime: "19:30", className: "FIIT Iron Engine Full Body", instructorName: "Jaye Pan" },
  // Wednesday
  { dayOfWeek: "Wednesday", startTime: "06:00", endTime: "06:50", className: "FIIT Hybrid", instructorName: "Sarah Green" },
  { dayOfWeek: "Wednesday", startTime: "10:00", endTime: "11:00", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Wednesday", startTime: "12:00", endTime: "13:00", className: "Kickboxing Heavy Bag", instructorName: "Jason Battiste" },
  { dayOfWeek: "Wednesday", startTime: "18:30", endTime: "19:30", className: "FIIT Boxing Bag Work", instructorName: "Jason Battiste" },
  { dayOfWeek: "Wednesday", startTime: "19:45", endTime: "20:45", className: "Boxing Academy - Level 1 Intro to Sparring", instructorName: "Nick Radionov" },
  // Thursday
  { dayOfWeek: "Thursday", startTime: "06:00", endTime: "06:50", className: "FIIT Caveman Circuit", instructorName: "Sarah Green" },
  { dayOfWeek: "Thursday", startTime: "12:00", endTime: "13:00", className: "FIIT Lift", instructorName: "Sarah Green" },
  { dayOfWeek: "Thursday", startTime: "16:30", endTime: "17:30", className: "Boxing Academy - Teens Boxing", instructorName: "Nick Radionov" },
  { dayOfWeek: "Thursday", startTime: "17:30", endTime: "18:30", className: "FIIT ft. Boxing Academy - Boxing Fundamentals", instructorName: "Nick Radionov" },
  { dayOfWeek: "Thursday", startTime: "18:30", endTime: "19:30", className: "Boxing Academy - Level 1 Technical Boxing", instructorName: "Nick Radionov" },
  // Friday
  { dayOfWeek: "Friday", startTime: "06:00", endTime: "06:50", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Friday", startTime: "12:00", endTime: "12:45", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  // Saturday
  { dayOfWeek: "Saturday", startTime: "08:00", endTime: "09:00", className: "FIIT Glute Lab", instructorName: "Jaye Pan" },
  { dayOfWeek: "Saturday", startTime: "09:00", endTime: "10:00", className: "FIIT Boxing Pad Work", instructorName: "Jason Battiste" },
  { dayOfWeek: "Saturday", startTime: "10:30", endTime: "11:30", className: "FIIT Hybrid", instructorName: "Jason Battiste" },
  { dayOfWeek: "Saturday", startTime: "12:00", endTime: "13:00", className: "Boxing Academy - Level 1 Technical Boxing", instructorName: "Nick Radionov" },
  { dayOfWeek: "Saturday", startTime: "13:00", endTime: "14:00", className: "Boxing Academy - Level 2 Technical Sparring", instructorName: "Nick Radionov" },
  // Sunday
  { dayOfWeek: "Sunday", startTime: "08:00", endTime: "09:00", className: "FIIT Core & Control & Abs", instructorName: "Jaye Pan" },
  { dayOfWeek: "Sunday", startTime: "09:00", endTime: "10:00", className: "Kickboxing", instructorName: "Jason Battiste" },
  { dayOfWeek: "Sunday", startTime: "10:30", endTime: "11:30", className: "FIIT Caveman Circuit", instructorName: "Jason Battiste" },
];

export default function ScheduleWidget() {
  const [selectedDay, setSelectedDay] = useState<number>(todayIndex());
  const live = useQuery(anyApi.websiteContent.listActiveWebsiteSchedule, {});

  // `live === undefined` while Convex is hydrating. Treat as "use fallback
  // immediately" so the homepage never flashes empty; real data arrives
  // and replaces it within a few hundred ms.
  const liveArray = Array.isArray(live) ? (live as Slot[]) : [];
  const hasLiveData = liveArray.length > 0;
  const slots: Slot[] = hasLiveData ? liveArray : FALLBACK_SCHEDULE;
  const usingFallback = !hasLiveData;

  const currentDay = DAYS[selectedDay];
  const daySlots = slots
    .filter((s) => normalizeDay(s.dayOfWeek) === currentDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <section className={styles.wrapper} aria-labelledby="schedule-heading">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Class Schedule</div>
            <h2 id="schedule-heading" className={styles.title}>
              FIIT Co
              <br />
              Schedule.
            </h2>
          </div>
          <a
            href={MINDBODY_SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            Book Via MindBody
          </a>
        </div>

        <div className={styles.dayTabs} role="tablist" aria-label="Schedule day selector">
          {DAYS.map((day, i) => (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={i === selectedDay}
              className={`${styles.dayTab} ${
                i === selectedDay ? styles.dayTabActive : ""
              }`}
              onClick={() => setSelectedDay(i)}
            >
              {day.slice(0, 3).toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.slots}>
          {daySlots.length === 0 ? (
            <div className={styles.empty}>
              No classes scheduled for {currentDay}.
            </div>
          ) : (
            daySlots.map((slot, i) => (
              <div key={`${slot.startTime}-${i}`} className={styles.slot}>
                <div className={styles.slotTime}>
                  {formatTimeShort(slot.startTime)}
                  <span className={styles.slotTimeAmPm}>
                    {ampmFor(slot.startTime)}
                  </span>
                </div>
                <div className={styles.slotInfo}>
                  <div className={styles.slotClass}>
                    {slot.className.toUpperCase()}
                  </div>
                  <div className={styles.slotInstructor}>
                    with {slot.instructorName} ·{" "}
                    {formatRange(slot.startTime, slot.endTime)}
                  </div>
                </div>
                <a
                  href={MINDBODY_SCHEDULE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reserveBtn}
                >
                  Reserve
                </a>
              </div>
            ))
          )}
        </div>

        {usingFallback && (
          <div className={styles.fallbackNote}>
            Sample schedule shown · live bookings via MindBody above
          </div>
        )}
      </div>
    </section>
  );
}

// ─── helpers ──────────────────────────────────────────────────────────────

function todayIndex(): number {
  // JS Date.getDay(): 0 = Sunday. Our DAYS array starts Monday.
  const js = new Date().getDay();
  return js === 0 ? 6 : js - 1;
}

function formatTimeShort(time: string): string {
  // "06:00" → "6:00"  ·  "14:30" → "2:30"  ·  "00:00" → "12:00"
  const [h, m] = time.split(":");
  let hour = parseInt(h, 10);
  if (hour === 0) hour = 12;
  else if (hour > 12) hour -= 12;
  return `${hour}:${m}`;
}

function ampmFor(time: string): string {
  const [h] = time.split(":");
  return parseInt(h, 10) < 12 ? "AM" : "PM";
}

function formatRange(start: string, end: string): string {
  return `${formatTimeShort(start)}-${formatTimeShort(end)}${ampmFor(end)}`;
}
