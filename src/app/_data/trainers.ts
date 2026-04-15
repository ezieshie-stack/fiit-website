/*
 * Shared trainer roster.
 *
 * Single source of truth — the homepage's <TeamShowcase> and the About
 * page's detail section both read from here so adding a new coach means
 * editing one file.
 *
 * `bio` is the short one-liner shown on hover in TeamShowcase. `fullBio`
 * is the multi-paragraph version rendered on the About page. If you only
 * have a one-liner, leave fullBio empty — the About page will fall back
 * to `bio` gracefully.
 */
import type { TeamMember } from "@/components/ui/team-showcase";

export type Trainer = TeamMember & {
  /** Multi-paragraph detail bio for the About page. */
  fullBio?: string[];
  /** Highlights / credentials shown as chips on the About page. */
  tags?: string[];
};

export const TRAINERS: Trainer[] = [
  {
    id: "jason",
    name: "Jason Battiste",
    role: "Owner & Founder",
    bio: "Former Canadian Super Middleweight Kickboxing Champion with 37+ years in combat training. Lives by: \"Don't stop when you're tired. Stop when you're done.\"",
    img: "/trainers/jason.webp",
    href: "/about#trainer-jason",
    tags: ["Boxing", "Kickboxing", "Founder"],
    fullBio: [
      "Jason Battiste is the founder of FIIT Co. and the reason the studio exists. A former Canadian Super Middleweight Kickboxing Champion with 37+ years of combat experience, he's spent the better part of four decades learning how to coach the sport he loves — and translating that knowledge into a room where everyone from first-timers to working fighters can thrive.",
      "He opened FIIT Co. in Leslieville because he wanted a space that felt like a real gym: raw, honest, and unapologetically centred on technique. No pretense, no attitude, no scripted hype. Just real work.",
      "His mantra, printed on the wall and repeated in every class: don't stop when you're tired — stop when you're done.",
    ],
  },
  {
    id: "sarah",
    name: "Sarah Green",
    role: "Trainer · Kickboxing & Yoga",
    bio: "Certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years' experience. Avid runner and coffee drinker.",
    img: "/trainers/sarah.webp",
    href: "/about#trainer-sarah",
    tags: ["Kickboxing", "Yoga", "TRX"],
    fullBio: [
      "Sarah is a certified group fitness, kickboxing, TRX and yoga instructor with nearly 20 years of experience on both sides of the mic. She's the kind of coach who can take a brand-new member's fear of the heavy bag and turn it into their favourite class of the week.",
      "Outside of the studio, she's an avid runner, a serial coffee drinker, and a constant presence in the Leslieville community. Her classes blend conditioning and technique with a patient, welcoming tone that makes them a favourite for beginners and regulars alike.",
    ],
  },
  {
    id: "nick",
    name: "Nick Radionov",
    role: "Boxing Academy Coach",
    bio: "Former Ukrainian National Olympic team member. Boxing Ontario Level 3 coach with 200+ bouts. Two-time World Kickboxing & European Savate Champion.",
    img: "/trainers/nick.jpeg",
    href: "/about#trainer-nick",
    tags: ["Academy", "Competition", "Olympic"],
    fullBio: [
      "Nick Radionov is a former member of the Ukrainian National Olympic Boxing team and a Boxing Ontario Level 3 coach with over 200 amateur and professional bouts to his name. He's a two-time World Kickboxing Champion and a European Savate Champion — few coaches in Toronto carry that kind of competitive résumé.",
      "At FIIT Co. he leads the Boxing Academy, the program built for members who want to take their training from fitness-focused to competition-ready. His coaching is technical, demanding, and relentlessly precise. If you want to learn how fighters actually train, Nick is the person you want in your corner.",
    ],
  },
  {
    id: "tyrone",
    name: "Tyrone Warner",
    role: "Yoga Instructor",
    bio: "Toronto-based instructor blending Hatha, Vinyasa and Yin traditions. Mindfulness-led, accessible practice for fighters and first-timers alike.",
    img: "/trainers/tyrone.png",
    href: "/about#trainer-tyrone",
    tags: ["Yoga", "Mobility", "Recovery"],
    fullBio: [
      "Tyrone is a Toronto-based yoga instructor who blends Hatha, Vinyasa and Yin traditions into a mindfulness-led practice. His classes sit at the intersection of strength, mobility and recovery — the perfect counterweight to the hard work our members put in on the heavy bag.",
      "He teaches with an inclusive, accessible tone that welcomes first-timers as easily as it deepens a fighter's recovery routine. If you train hard at FIIT and you're not stretching, his class is the missing piece.",
    ],
  },
  {
    id: "jaye",
    name: "Jaye Pan",
    role: "Strength & Performance",
    bio: "Strength & Conditioning coach with a background in kinesiology, varsity athletics, and rehab-focused training. Bridges performance and rehabilitation.",
    img: null,
    href: "/about#trainer-jaye",
    tags: ["Strength", "Performance", "Rehab"],
    fullBio: [
      "Jaye is a Strength & Conditioning coach whose background sits where most coaches don't: at the intersection of kinesiology, varsity athletics, and rehabilitation-focused training. He builds programs for athletes returning from injury as fluently as he does for members chasing a new personal best.",
      "His approach is methodical and athlete-first. Expect clear programming, real progression, and a coach who understands that \"stronger\" and \"healthier\" are the same goal, not competing ones.",
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
    fullBio: [
      "Matt's full bio is on the way — check back soon for the details.",
    ],
  },
];
