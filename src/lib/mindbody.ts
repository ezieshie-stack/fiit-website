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

// FIIT Co.'s MindBody studio ID. Still used for the SHOP flow where
// first-time visitors would otherwise hit MindBody's generic "find your
// studio" search page. The SCHEDULE flow (classic/mainclass) now lands
// on the Classes tab directly via tabID=7, which handles studio
// resolution on MindBody's side without the explicit studioid param.
const STUDIO_ID = "414792";

export const MINDBODY_SCHEDULE_URL =
  "https://clients.mindbodyonline.com/classic/mainclass?fl=true&tabID=7";

export const MINDBODY_SHOP_URL =
  `https://clients.mindbodyonline.com/asp/main_shop.asp?studioid=${STUDIO_ID}&fl=true&tabID=3`;
