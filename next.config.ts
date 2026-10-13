import type { NextConfig } from "next";

/**
 * Redirects for legacy URLs from the previous Squarespace version of
 * fiitco.ca. Google has indexed roughly 15 paths that no longer exist on
 * the new Next.js site. Each entry below 308-redirects to the closest
 * current equivalent so we recover any backlink juice and members
 * following old bookmarks land on real content.
 *
 * Categories:
 *   - Pricing / classes / memberships → /programs
 *   - Trainers / team / coaches → /about
 *   - Schedule → /programs (the schedule widget lives there)
 *   - Booking / signup / login / shop / gift cards → Mindbody
 *   - Contact / location → /studio
 *   - Testimonials / FAQ → /community
 *
 * If a URL surfaces in Search Console that's not covered here, add a
 * matching entry. To check: Search Console > Pages > "Not found (404)".
 */

const MINDBODY_URL =
  "https://clients.mindbodyonline.com/asp/main_shop.asp?fl=true&tabID=3";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Programs / classes / pricing ────────────────────────────────
      { source: "/classes",            destination: "/programs", permanent: true },
      { source: "/class",              destination: "/programs", permanent: true },
      { source: "/group-classes",      destination: "/programs", permanent: true },
      { source: "/pricing",            destination: "/programs", permanent: true },
      { source: "/prices",             destination: "/programs", permanent: true },
      { source: "/membership",         destination: "/programs", permanent: true },
      { source: "/memberships",        destination: "/programs", permanent: true },
      { source: "/personal-training",  destination: "/programs", permanent: true },
      { source: "/private-training",   destination: "/programs", permanent: true },
      { source: "/kids",               destination: "/programs", permanent: true },
      { source: "/kids-program",       destination: "/programs", permanent: true },
      { source: "/teens",              destination: "/programs", permanent: true },
      { source: "/boxing-academy",     destination: "/programs", permanent: true },
      { source: "/academy",            destination: "/programs", permanent: true },

      // ── Schedule (schedule widget lives on Programs) ───────────────
      { source: "/schedule",           destination: "/programs", permanent: true },
      { source: "/timetable",          destination: "/programs", permanent: true },

      // ── Trainers / team / coaches → /about ─────────────────────────
      { source: "/trainers",           destination: "/about", permanent: true },
      { source: "/team",               destination: "/about", permanent: true },
      { source: "/coaches",            destination: "/about", permanent: true },
      { source: "/coach",              destination: "/about", permanent: true },
      { source: "/our-team",           destination: "/about", permanent: true },
      { source: "/our-story",          destination: "/about", permanent: true },

      // ── Studio info / contact ──────────────────────────────────────
      { source: "/contact",            destination: "/studio", permanent: true },
      { source: "/contact-us",         destination: "/studio", permanent: true },
      { source: "/location",           destination: "/studio", permanent: true },
      { source: "/find-us",            destination: "/studio", permanent: true },
      { source: "/visit",              destination: "/studio", permanent: true },
      { source: "/studio-info",        destination: "/studio", permanent: true },

      // ── Testimonials / FAQ → /community ────────────────────────────
      { source: "/testimonials",       destination: "/community", permanent: true },
      { source: "/reviews",            destination: "/community", permanent: true },
      { source: "/faq",                destination: "/community", permanent: true },
      { source: "/faqs",               destination: "/community", permanent: true },

      // ── Transactional flows → Mindbody ─────────────────────────────
      { source: "/book",               destination: MINDBODY_URL, permanent: true },
      { source: "/book-now",           destination: MINDBODY_URL, permanent: true },
      { source: "/book-a-class",       destination: MINDBODY_URL, permanent: true },
      { source: "/reserve",            destination: MINDBODY_URL, permanent: true },
      { source: "/signup",             destination: MINDBODY_URL, permanent: true },
      { source: "/sign-up",            destination: MINDBODY_URL, permanent: true },
      { source: "/join",               destination: MINDBODY_URL, permanent: true },
      { source: "/login",              destination: MINDBODY_URL, permanent: true },
      { source: "/member-login",       destination: MINDBODY_URL, permanent: true },
      { source: "/account",            destination: MINDBODY_URL, permanent: true },
      { source: "/shop",               destination: MINDBODY_URL, permanent: true },
      { source: "/store",              destination: MINDBODY_URL, permanent: true },
      { source: "/gift-card",          destination: MINDBODY_URL, permanent: true },
      { source: "/gift-cards",         destination: MINDBODY_URL, permanent: true },
      { source: "/intro-offer",        destination: "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377", permanent: true },
      { source: "/free-class",         destination: "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377", permanent: true },

      // ── Misc legacy paths ──────────────────────────────────────────
      { source: "/home",               destination: "/", permanent: true },
      { source: "/index",              destination: "/", permanent: true },
      { source: "/index.html",         destination: "/", permanent: true },
      { source: "/news",               destination: "/blog", permanent: true },
      { source: "/articles",           destination: "/blog", permanent: true },
      { source: "/blog-posts",         destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
