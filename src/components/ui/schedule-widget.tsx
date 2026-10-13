"use client";

/**
 * ScheduleWidget — "FIIT Co Schedule." homepage section.
 *
 * Markup and CSS recovered from the live production bundle so the new
 * git-sourced build keeps pixel parity with what customers already see
 * on fiitco.ca. Data source was the one thing missing from the ghost
 * deployment: here it reads the live weekly schedule from the staff
 * portal's Convex deployment via the public `getWeeklySchedule` query,
 * so admins can edit it from staff.fiitco.ca/website-schedule and see
 * the result on fiitco.ca within seconds.
 *
 * Falls back to the four sample classes already live when Convex returns
 * no visible slots for the selected day — section is never empty on a
 * fresh page load, and a small disclaimer appears below the grid when
 * sample data is on screen.
 */

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "./schedule-widget.module.css";
import { MINDBODY_SHOP_URL } from "@/lib/mindbody";

const DAY_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type ConvexSlot = {
  _id: string;
  date: string;          // "YYYY-MM-DD"
  dayOfWeek: string;
  startTime: string;     // "HH:MM" 24h
  endTime: string;
  className: string;
  instructorName: string;
  capacity?: number;
  status: string;
};

type DisplaySlot = {
  key: string;
  startTime: string;
  endTime: string;
  className: string;
  instructorName: string;
};

const SAMPLE_SCHEDULE: Record<DayIndex, DisplaySlot[]> = {
  0: sample("Mon"),
  1: sample("Tue"),
  2: sample("Wed"),
  3: sample("Thu"),
  4: sample("Fri"),
  5: sample("Sat"),
  6: sample("Sun"),
};

function sample(day: string): DisplaySlot[] {
  return [
    { key: `${day}-1`, startTime: "06:00", endTime: "07:00", className: "FIIT LIFT",                      instructorName: "Sarah Green" },
    { key: `${day}-2`, startTime: "12:00", endTime: "13:00", className: "FIIT LIFT",                      instructorName: "Jason Battiste" },
    { key: `${day}-3`, startTime: "17:00", endTime: "18:00", className: "LITTLE WARRIORS PROGRAM (KIDS)", instructorName: "Nick Radionov" },
    { key: `${day}-4`, startTime: "18:30", endTime: "19:30", className: "FIIT IRON ENGINE FULL BODY",     instructorName: "Jaye Pan" },
  ];
}

function todayIndex(): DayIndex {
  // Mon = 0, Sun = 6. JS Date.getDay(): Sun = 0, Sat = 6.
  const js = new Date().getDay();
  return (((js + 6) % 7) as DayIndex);
}

/** Split "HH:MM" (24h) into display "H:MM" and "AM"/"PM". */
function splitTime(time: string): { body: string; ampm: "AM" | "PM" } {
  const [hStr, m] = time.split(":");
  const h = Number(hStr);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const body = m === "00" ? `${hour12}:00` : `${hour12}:${m}`;
  return { body, ampm };
}

/** Full range for the instructor line: "6:00-7:00AM". */
function formatRangeShort(start: string, end: string): string {
  const s = splitTime(start);
  const e = splitTime(end);
  // Ghost format shows one AM/PM at the end if both sides share it,
  // otherwise both appear. Keep it simple: match the shared case
  // (which is what every sample slot has) and fall through to both
  // when they differ.
  if (s.ampm === e.ampm) {
    return `${s.body}-${e.body}${e.ampm}`;
  }
  return `${s.body}${s.ampm}-${e.body}${e.ampm}`;
}

export default function ScheduleWidget() {
  const [selected, setSelected] = useState<DayIndex>(todayIndex);
  const liveSlots = useQuery(anyApi.queries.getWeeklySchedule) as
    | ConvexSlot[]
    | undefined;

  const liveSlotsByDay = useMemo(() => {
    if (!liveSlots) return null;
    const map: Record<DayIndex, DisplaySlot[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    for (const s of liveSlots) {
      if (s.status === "Cancelled") continue;
      const d = new Date(s.date + "T00:00:00");
      const idx = (((d.getDay() + 6) % 7) as DayIndex);
      map[idx].push({
        key: s._id,
        startTime: s.startTime,
        endTime: s.endTime,
        className: s.className,
        instructorName: s.instructorName,
      });
    }
    for (const k of Object.keys(map) as unknown as DayIndex[]) {
      map[k].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [liveSlots]);

  const hasLiveData =
    liveSlotsByDay !== null &&
    Object.values(liveSlotsByDay).some((arr) => arr.length > 0);

  const todaySlots: DisplaySlot[] = hasLiveData
    ? liveSlotsByDay![selected]
    : SAMPLE_SCHEDULE[selected];

  const showSampleDisclaimer = !hasLiveData;

  return (
    <section aria-labelledby="schedule-heading" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.eyebrow}>Class Schedule</div>
            <h2 id="schedule-heading" className={styles.title}>
              FIIT Co<br />
              Schedule.
            </h2>
          </div>
          <a
            href={MINDBODY_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            Book Via MindBody
          </a>
        </div>

        <div
          className={styles.dayTabs}
          role="tablist"
          aria-label="Schedule day selector"
        >
          {DAY_SHORT.map((d, i) => {
            const idx = i as DayIndex;
            const active = idx === selected;
            return (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(idx)}
                className={`${styles.dayTab} ${active ? styles.dayTabActive : ""}`}
              >
                {d}
              </button>
            );
          })}
        </div>

        {todaySlots.length === 0 ? (
          <div className={styles.empty}>Rest day.</div>
        ) : (
          <div className={styles.slots}>
            {todaySlots.map((slot) => {
              const start = splitTime(slot.startTime);
              return (
                <div key={slot.key} className={styles.slot}>
                  <div className={styles.slotTime}>
                    {start.body}
                    <span className={styles.slotTimeAmPm}>{start.ampm}</span>
                  </div>
                  <div className={styles.slotInfo}>
                    <div className={styles.slotClass}>{slot.className}</div>
                    <div className={styles.slotInstructor}>
                      with {slot.instructorName} ·{" "}
                      {formatRangeShort(slot.startTime, slot.endTime)}
                    </div>
                  </div>
                  <a
                    href={MINDBODY_SHOP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.reserveBtn}
                  >
                    Reserve
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {showSampleDisclaimer && (
          <div className={styles.fallbackNote}>
            Sample schedule shown · live bookings via MindBody above
          </div>
        )}
      </div>
    </section>
  );
}
