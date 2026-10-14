/*
 * Trainer roster — now sourced live from the Fiitco-Operation Convex
 * deployment (edited via the ops tool's Website Trainers admin page).
 *
 * This file used to hold the hardcoded roster. It's been repurposed as:
 *   - The type definition (Trainer, used by TeamShowcase + about page)
 *   - A static FALLBACK used only if Convex is unreachable at render time
 *
 * The homepage and About page use the `useTrainers()` hook below to read
 * live from Convex. If the query is still loading (undefined) or returned
 * nothing (empty), they fall back to FALLBACK_TRAINERS so the UI never
 * shows a blank team section.
 */

import type { TeamMember } from "@/components/ui/team-showcase";

export type Trainer = TeamMember & {
  /** Multi-paragraph detail bio for the About page. */
  fullBio?: string[];
  /** Highlights / credentials shown as chips on the About page. */
  tags?: string[];
  /**
   * Program the coach belongs to. Drives the two-section team split on the
   * homepage and About page — FIIT Co. group trainers appear together,
   * then the Boxing Academy coach(es).
   */
  category?: "fiit" | "academy";
};

// ── Static fallback roster ─────────────────────────────────────────────
// Used only when Convex is unreachable or the `trainers` table is empty.
// Whatever's in Convex WINS. This file is no longer the source of truth —
// Arden edits via the ops tool.
export const FALLBACK_TRAINERS: Trainer[] = [
  {
    id: "jason",
    name: "Jason Battiste",
    role: "Owner & Founder",
    bio: "Former Canadian Super Middleweight Kickboxing Champion with 37+ years in combat training.",
    img: "/trainers/jason.webp",
    href: "/about#trainer-jason",
    tags: ["Boxing", "Kickboxing", "Founder"],
    category: "fiit",
    fullBio: [
      "Jason Battiste is the founder of FIIT Co. and the reason the studio exists. A former Canadian Super Middleweight Kickboxing Champion with 37+ years of combat experience, he's spent the better part of four decades learning how to coach the sport he loves, and translating that knowledge into a room where everyone from first-timers to working fighters can thrive.",
      "He opened FIIT Co. in Leslieville because he wanted a space that felt like a real gym: raw, honest, and unapologetically centred on technique. No pretense, no attitude, no scripted hype. Just real work.",
      "His mantra, printed on the wall and repeated in every class: don't stop when you're tired; stop when you're done.",
    ],
  },
  {
    id: "sarah",
    name: "Sarah Green",
    role: "Trainer · Kickboxing & Yoga",
    bio: "Certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years' experience.",
    img: "/trainers/sarah.webp",
    href: "/about#trainer-sarah",
    tags: ["Kickboxing", "Yoga", "TRX"],
    category: "fiit",
    fullBio: [
      "Sarah is a certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years of experience on both sides of the mic.",
      "Outside of the studio, she's an avid runner, a serial coffee drinker, and a constant presence in the Leslieville community.",
    ],
  },
  {
    id: "jaye",
    name: "Jaye Pan",
    role: "Strength & Performance",
    bio: "Strength & Conditioning coach with a background in kinesiology, varsity athletics, and rehab-focused training.",
    img: null,
    href: "/about#trainer-jaye",
    tags: ["Strength", "Performance", "Rehab"],
    category: "fiit",
    fullBio: [
      "Jaye is a Strength & Conditioning coach whose background sits where most coaches don't: at the intersection of kinesiology, varsity athletics, and rehabilitation-focused training.",
      "His approach is methodical and athlete-first.",
    ],
  },
  {
    id: "matt",
    name: "Matt Makar",
    role: "Trainer",
    bio: "Full bio coming soon.",
    img: null,
    href: "/about#trainer-matt",
    tags: ["Training"],
    category: "fiit",
    fullBio: ["Matt's full bio is on the way. Check back soon for the details."],
  },
  {
    id: "nick",
    name: "Nick Radionov",
    role: "Boxing Academy Head Coach",
    category: "academy",
    bio: "Former Ukrainian National Olympic team member. Boxing Ontario Level 3 coach with 200+ bouts.",
    img: "/trainers/nick.jpeg",
    href: "/about#trainer-nick",
    tags: ["Academy", "Competition", "Olympic"],
    fullBio: [
      "Nick Radionov is a former member of the Ukrainian National Olympic Boxing team and a Boxing Ontario Level 3 coach with over 200 amateur and professional bouts to his name.",
      "At FIIT Co. he leads the Boxing Academy, the program built for members who want to take their training from fitness-focused to competition-ready.",
    ],
  },
];

// Legacy export for any code still importing TRAINERS directly. Points at
// the fallback roster. New code should use useTrainers() from
// _hooks/useTrainers instead.
export const TRAINERS: Trainer[] = FALLBACK_TRAINERS;

export const FIIT_TRAINERS: Trainer[] = FALLBACK_TRAINERS.filter(
  (t) => (t.category ?? "fiit") === "fiit"
);

export const ACADEMY_TRAINERS: Trainer[] = FALLBACK_TRAINERS.filter(
  (t) => t.category === "academy"
);
