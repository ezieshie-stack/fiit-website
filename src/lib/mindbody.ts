/**
 * Centralised MindBody deep-link URLs for FIIT Co.
 *
 * Two distinct destinations, deliberately split:
 *
 *   SCHEDULE_URL → MindBody class schedule (tabID=7, mainclass).
 *     Use for any CTA whose intent is "let me see and book a specific
 *     class on a specific day": "Book a Class", "Book Via MindBody",
 *     "Reserve" buttons in the weekly schedule widget, etc.
 *
 *   SHOP_URL → MindBody shop / pricing tabs (tabID=3, main_shop).
 *     Use for any CTA whose intent is "let me pick a series, pack, or
 *     membership before I book": "Book Free Class", "Get Started",
 *     "Book" on pricing cards, the footer "First Class Free" prompt,
 *     and the Boxing Academy pack tiles.
 *
 * Routing all CTAs through these two constants means we can swap the
 * upstream MindBody URL once (e.g., if the studio ID changes or
 * MindBody publishes a new entrypoint) without hunting through 6+
 * components.
 */

// FIIT Co.'s MindBody studio ID. Without this, first-time visitors hit
// MindBody's generic "find your studio" search page instead of landing
// directly in FIIT Co.'s class schedule / shop. Returning visitors used
// to skip the search because MindBody cached the studio in a cookie —
// which is why this bug was invisible to anyone who'd booked before.
const STUDIO_ID = "414792";

export const MINDBODY_SCHEDULE_URL =
  `https://clients.mindbodyonline.com/classic/mainclass?studioid=${STUDIO_ID}&fl=true`;

export const MINDBODY_SHOP_URL =
  `https://clients.mindbodyonline.com/asp/main_shop.asp?studioid=${STUDIO_ID}&fl=true&tabID=3`;
