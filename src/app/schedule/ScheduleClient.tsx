"use client";

/**
 * Weekly class schedule for customers. Reads directly from the staff portal's
 * Convex deployment via the public (unauthenticated) `getWeeklySchedule`
 * query. Staff edits land here within seconds.
 *
 * Each slot deep-links to the MindBody booking funnel — fiitco.ca does not
 * take payments or reservations itself.
 */

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";

const MINDBODY_URL =
  "https://clients.mindbodyonline.com/asp/main_shop.asp?fl=true&tabID=3";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DAY_FULL = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
} as const;

type Slot = {
  _id: string;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  className: string;
  categoryName: string;
  instructorName: string;
  status: string;
};

function getWeekDates(anchor: Date): string[] {
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() - ((anchor.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDayNumber(iso: string): string {
  return String(parseIsoDate(iso).getDate());
}

function formatRange(dates: string[]): string {
  const first = parseIsoDate(dates[0]);
  const last = parseIsoDate(dates[dates.length - 1]);
  const sameMonth = first.getMonth() === last.getMonth();
  const sameYear = first.getFullYear() === last.getFullYear();
  const firstFmt = first.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  });
  const lastFmt = last.toLocaleDateString("en-CA", {
    month: sameMonth ? undefined : "short",
    day: "numeric",
    year: "numeric",
  });
  return `${firstFmt} – ${lastFmt}`;
}

function to12Hour(time: string): string {
  const [hStr, m] = time.split(":");
  const h = Number(hStr);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === "00" ? `${hour12}${period}` : `${hour12}:${m}${period}`;
}

function minutesSinceEpoch(dateIso: string, time: string): number {
  const [y, mo, d] = dateIso.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  return new Date(y, mo - 1, d, h, mi).getTime();
}

export default function SchedulePage() {
  const [anchor, setAnchor] = useState<Date>(() => new Date());
  const weekDates = useMemo(() => getWeekDates(anchor), [anchor]);

  const slots = useQuery(anyApi.queries.getWeeklySchedule) as Slot[] | undefined;

  const now = Date.now();
  const slotsByDate = useMemo(() => {
    const map: Record<string, Slot[]> = {};
    if (!slots) return map;
    for (const s of slots) {
      if (s.status === "Cancelled") continue;
      if (minutesSinceEpoch(s.date, s.endTime) <= now) continue;
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    }
    for (const key of Object.keys(map)) {
      map[key].sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [slots, now]);

  const loading = slots === undefined;
  const totalThisWeek = weekDates.reduce((n, d) => n + (slotsByDate[d]?.length ?? 0), 0);

  return (
    <>
      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          style={{
            padding: "7rem 0 5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className={styles.container}>
            <p
              style={{
                fontFamily: "var(--font-oswald)",
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D92B2B",
                marginBottom: "1.25rem",
              }}
            >
              Weekly Schedule
            </p>
            <h1
              style={{
                fontFamily: "var(--font-oswald)",
                fontWeight: 700,
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                textTransform: "uppercase",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                marginBottom: "1.75rem",
                maxWidth: "16ch",
              }}
            >
              Pick your <span className={styles.accent}>round.</span>
            </h1>
            <p className={styles.bodyLg} style={{ maxWidth: "60ch", marginBottom: "2.5rem" }}>
              Classes are updated by the FIIT Co. team. Tap any slot to reserve
              through MindBody — booking, payments and intro offers live there.
            </p>

            {/* Week nav */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className={styles.btnOutline}
                  style={{ padding: "0.65rem 1.25rem", fontSize: "0.75rem" }}
                  onClick={() => setAnchor(new Date(anchor.getTime() - 7 * 24 * 60 * 60 * 1000))}
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className={styles.btnOutline}
                  style={{ padding: "0.65rem 1.25rem", fontSize: "0.75rem" }}
                  onClick={() => setAnchor(new Date())}
                >
                  This week
                </button>
                <button
                  type="button"
                  className={styles.btnOutline}
                  style={{ padding: "0.65rem 1.25rem", fontSize: "0.75rem" }}
                  onClick={() => setAnchor(new Date(anchor.getTime() + 7 * 24 * 60 * 60 * 1000))}
                >
                  Next →
                </button>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.82)",
                }}
              >
                {formatRange(weekDates)}
              </p>
            </div>
          </div>
        </section>

        {/* ── Grid ──────────────────────────────────────────────────── */}
        <section style={{ padding: "4rem 0 6rem" }}>
          <div className={styles.container}>
            {loading ? (
              <p className={styles.body}>Loading classes…</p>
            ) : totalThisWeek === 0 ? (
              <div
                style={{
                  padding: "4rem 2rem",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  No classes posted for this week yet.
                </p>
                <p className={styles.body}>
                  Our team updates the schedule week-to-week. Try next week, or
                  book through MindBody to see live availability.
                </p>
                <a
                  href={MINDBODY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnRed}
                  style={{ marginTop: "1.75rem" }}
                >
                  Open MindBody
                </a>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: "1rem",
                }}
              >
                {weekDates.map((date, i) => {
                  const dayLabel = DAY_LABELS[i];
                  const todaySlots = slotsByDate[date] ?? [];
                  return (
                    <article
                      key={date}
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 12,
                        padding: "1.25rem 1.1rem",
                        background: "rgba(255,255,255,0.015)",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 200,
                      }}
                    >
                      <header
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          marginBottom: "1rem",
                          paddingBottom: "0.75rem",
                          borderBottom: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "var(--font-oswald)",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {DAY_FULL[dayLabel]}
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-oswald)",
                            fontWeight: 700,
                            fontSize: "1.65rem",
                            color: "rgba(255,255,255,0.72)",
                            lineHeight: 1,
                          }}
                        >
                          {formatDayNumber(date)}
                        </p>
                      </header>

                      {todaySlots.length === 0 ? (
                        <p
                          className={styles.bodySm}
                          style={{ color: "rgba(255,255,255,0.32)" }}
                        >
                          Rest day.
                        </p>
                      ) : (
                        <ul
                          style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.9rem",
                          }}
                        >
                          {todaySlots.map((slot) => (
                            <li key={slot._id}>
                              <a
                                href={MINDBODY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: "block",
                                  padding: "0.8rem 0.9rem",
                                  borderRadius: 8,
                                  border: "1px solid rgba(255,255,255,0.07)",
                                  background: "rgba(255,255,255,0.02)",
                                  textDecoration: "none",
                                  color: "inherit",
                                  transition: "border-color 0.15s, background 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLElement).style.borderColor =
                                    "#D92B2B";
                                  (e.currentTarget as HTMLElement).style.background =
                                    "rgba(217,43,43,0.06)";
                                }}
                                onMouseLeave={(e) => {
                                  (e.currentTarget as HTMLElement).style.borderColor =
                                    "rgba(255,255,255,0.07)";
                                  (e.currentTarget as HTMLElement).style.background =
                                    "rgba(255,255,255,0.02)";
                                }}
                              >
                                <p
                                  style={{
                                    fontFamily: "var(--font-chakra)",
                                    fontWeight: 700,
                                    fontSize: "0.78rem",
                                    letterSpacing: "0.08em",
                                    color: "#D92B2B",
                                    textTransform: "uppercase",
                                    marginBottom: "0.3rem",
                                  }}
                                >
                                  {to12Hour(slot.startTime)} – {to12Hour(slot.endTime)}
                                </p>
                                <p
                                  style={{
                                    fontFamily: "var(--font-oswald)",
                                    fontWeight: 700,
                                    fontSize: "1.05rem",
                                    textTransform: "uppercase",
                                    lineHeight: 1.1,
                                    marginBottom: "0.25rem",
                                  }}
                                >
                                  {slot.className}
                                </p>
                                <p
                                  className={styles.bodySm}
                                  style={{ margin: 0, fontSize: "0.78rem" }}
                                >
                                  with {slot.instructorName}
                                </p>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  );
                })}
              </div>
            )}

            <p
              className={styles.bodySm}
              style={{
                textAlign: "center",
                marginTop: "3rem",
                maxWidth: "48ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Reservations and intro offers are handled by MindBody. First class
              is free — <a href="/intro-offer" style={{ color: "#D92B2B", textDecoration: "underline" }}>grab the intro offer</a>.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
