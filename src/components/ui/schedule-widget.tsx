"use client";

/**
 * ScheduleWidget
 *
 * Home-page "FIIT CO SCHEDULE." section. Reads the live weekly schedule
 * from the staff portal's Convex deployment via the public
 * `getWeeklySchedule` query and lets visitors toggle through the days of
 * the current week.
 *
 * Data flow:
 *   - If Convex returns slots for the week shown, those render.
 *   - If Convex is still loading OR has no visible slots for the current
 *     week, a hardcoded SAMPLE schedule renders so the section is never
 *     empty on fresh page loads. A small disclaimer appears below the
 *     grid when sample data is on screen.
 *
 * Booking is always handled off-site on MindBody — the "RESERVE" button
 * on each class and the top-right "Book Via MindBody" CTA both deep-link
 * to the booking funnel.
 */

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../../app/site.module.css";
import { MINDBODY_SHOP_URL } from "@/lib/mindbody";

const DAY_SHORT = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type ConvexSlot = {
  _id: string;
  date: string;          // "YYYY-MM-DD"
  dayOfWeek: string;     // "Mon" | "Tue" | ...
  startTime: string;     // "HH:MM"
  endTime: string;
  className: string;
  categoryName?: string;
  instructorName: string;
  status: string;        // "Scheduled" | "Cancelled" | ...
};

type DisplaySlot = {
  key: string;
  startTime: string;
  endTime: string;
  className: string;
  instructorName: string;
};

/**
 * Sample fallback — mirrors the four classes already on the live site so
 * nothing changes visually when Convex is empty / unreachable. Each entry
 * is attached to Tue by default (the day shown in the live screenshot).
 */
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
    { key: `${day}-1`, startTime: "06:00", endTime: "07:00", className: "FIIT LIFT",                         instructorName: "Sarah Green" },
    { key: `${day}-2`, startTime: "12:00", endTime: "13:00", className: "FIIT LIFT",                         instructorName: "Jason Battiste" },
    { key: `${day}-3`, startTime: "17:00", endTime: "18:00", className: "LITTLE WARRIORS PROGRAM (KIDS)",    instructorName: "Nick Radionov" },
    { key: `${day}-4`, startTime: "18:30", endTime: "19:30", className: "FIIT IRON ENGINE FULL BODY",        instructorName: "Jaye Pan" },
  ];
}

function todayIndex(): DayIndex {
  // Mon = 0, Sun = 6. JS Date.getDay(): Sun = 0, Sat = 6.
  const js = new Date().getDay();
  return (((js + 6) % 7) as DayIndex);
}

function dayIsoForIndex(index: DayIndex): string {
  const now = new Date();
  const todayIsoDay = (((now.getDay() + 6) % 7) as DayIndex);
  const diff = index - todayIsoDay;
  const target = new Date(now);
  target.setDate(now.getDate() + diff);
  return target.toISOString().split("T")[0];
}

function to12Hour(time: string): { time: string; period: string } {
  const [hStr, m] = time.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const timeStr = m === "00" ? `${hour12}:00` : `${hour12}:${m}`;
  return { time: timeStr, period };
}

export default function ScheduleWidget() {
  const [selected, setSelected] = useState<DayIndex>(todayIndex);
  const slots = useQuery(anyApi.queries.getWeeklySchedule) as ConvexSlot[] | undefined;

  const liveSlotsByDay = useMemo(() => {
    if (!slots) return null;
    const map: Record<DayIndex, DisplaySlot[]> = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    for (const s of slots) {
      if (s.status === "Cancelled") continue;
      const d = new Date(s.date + "T00:00:00");
      const idx = ((d.getDay() + 6) % 7) as DayIndex;
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
  }, [slots]);

  const hasLiveData =
    liveSlotsByDay !== null &&
    Object.values(liveSlotsByDay).some((arr) => arr.length > 0);

  const todaySlots: DisplaySlot[] = hasLiveData
    ? liveSlotsByDay![selected]
    : SAMPLE_SCHEDULE[selected];

  const showSampleDisclaimer = !hasLiveData;

  return (
    <section
      className={styles.sectionDark}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className={styles.container}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <div className={styles.label} style={{ marginBottom: "1.25rem" }}>
              Class Schedule
            </div>
            <h2 className={styles.headlineLg} style={{ lineHeight: 0.95 }}>
              FIIT Co<br />Schedule.
            </h2>
          </div>
          <a
            href={MINDBODY_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnRed}
          >
            Book Via MindBody
          </a>
        </div>

        {/* Day tabs */}
        <div
          role="tablist"
          aria-label="Day of the week"
          style={{
            display: "flex",
            gap: "0.5rem",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
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
                style={{
                  minWidth: 72,
                  padding: "0.75rem 1.25rem",
                  fontFamily: "var(--font-oswald)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.14em",
                  textAlign: "center",
                  textTransform: "uppercase",
                  border: `1px solid ${active ? "#D92B2B" : "rgba(255,255,255,0.18)"}`,
                  background: active ? "#D92B2B" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.78)",
                  cursor: "pointer",
                  transition: "border-color 0.15s, background 0.15s, color 0.15s",
                }}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Rows */}
        {todaySlots.length === 0 ? (
          <div
            style={{
              padding: "3rem 1rem",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-oswald)",
                fontWeight: 700,
                fontSize: "1.2rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}
            >
              Rest day.
            </p>
            <p className={styles.bodySm}>No classes scheduled.</p>
          </div>
        ) : (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {todaySlots.map((slot) => {
              const start = to12Hour(slot.startTime);
              const end = to12Hour(slot.endTime);
              return (
                <li
                  key={slot.key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(120px, 180px) 1fr auto",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.5rem 1rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Time */}
                  <div
                    style={{
                      fontFamily: "var(--font-oswald)",
                      fontWeight: 700,
                      fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                      lineHeight: 1,
                      color: "#fff",
                    }}
                  >
                    {start.time}
                    <span
                      style={{
                        fontSize: "0.5em",
                        marginLeft: "0.35em",
                        color: "#D92B2B",
                      }}
                    >
                      {start.period}
                    </span>
                  </div>

                  {/* Name + instructor */}
                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 700,
                        fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        marginBottom: "0.35rem",
                        lineHeight: 1.15,
                      }}
                    >
                      {slot.className}
                    </p>
                    <p className={styles.bodySm} style={{ margin: 0 }}>
                      with {slot.instructorName} · {start.time}{start.period === "AM" ? "AM" : "PM"}
                      {" – "}
                      {end.time}{end.period === "AM" ? "AM" : "PM"}
                    </p>
                  </div>

                  {/* Reserve */}
                  <a
                    href={MINDBODY_SHOP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnOutline}
                    style={{ padding: "0.75rem 1.6rem", fontSize: "0.78rem" }}
                  >
                    Reserve
                  </a>
                </li>
              );
            })}
          </ul>
        )}

        {showSampleDisclaimer && (
          <p
            className={styles.bodySm}
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              color: "rgba(255,255,255,0.42)",
            }}
          >
            Sample schedule shown · live bookings via MindBody above.
          </p>
        )}
      </div>
    </section>
  );
}
