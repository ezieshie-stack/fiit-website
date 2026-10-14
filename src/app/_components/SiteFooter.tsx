"use client";

/**
 * Site footer — now reads the primary studio location live from Convex
 * (edited via ops tool's Website Locations admin). Falls back to the
 * original hardcoded Leslieville details if Convex is unreachable so the
 * footer never renders blank.
 *
 * Note: converted from a server component to a client component so we can
 * useQuery directly. The perf impact is minimal — the footer already
 * hydrated client-side for the Map widget.
 */

import Link from "next/link";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../site.module.css";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";
import { MINDBODY_SHOP_URL } from "@/lib/mindbody";

// ── Fallback location (used only if Convex is unreachable or empty) ────
const FALLBACK = {
  name: "FIIT Co. Leslieville",
  address1: "1047 Gerrard St E",
  city: "Toronto",
  region: "ON",
  postalCode: "M4M 1Z7",
  phone: "(416) 565-9300",
  email: "info@fiitco.ca",
  latitude: 43.6689575,
  longitude: -79.3362194,
  hoursMonFri: "6:00 AM – 8:30 PM",
  hoursSatSun: "8:00 AM – 8:30 PM",
};

// Inline SVG icons — kept local, no external dependency
function IgIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5H16l.5-3H13.5V8.75c0-.87.24-1.47 1.5-1.47H16.6V4.6c-.3-.04-1.33-.13-2.52-.13-2.5 0-4.2 1.52-4.2 4.3V10.5H7.4v3h2.48V21h3.62z" />
    </svg>
  );
}

type LiveLocation = {
  _id: string;
  name: string;
  address1: string;
  address2?: string;
  city: string;
  region: string;
  postalCode: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  hoursMonFri: string;
  hoursSatSun: string;
};

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const live = useQuery(anyApi.websiteContent.getPrimaryLocation) as
    | LiveLocation
    | null
    | undefined;

  // Use live data if available, otherwise fall back. Either way the user
  // sees a complete footer.
  const loc = live && live._id ? live : FALLBACK;

  const fullAddress = `${loc.name}, ${loc.address1}, ${loc.city}, ${loc.region} ${loc.postalCode}`;
  const gmapsLink =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(fullAddress);

  return (
    <>
      <section className={styles.preFooter} aria-labelledby="prefooter-heading">
        <h2 id="prefooter-heading" className={styles.srOnly}>
          Visit, contact, and follow FIIT Co.
        </h2>
        <div className={styles.preFooterGrid}>
          {/* Column 1 — Our Studio */}
          <div className={styles.preFooterCol}>
            <div className={styles.preFooterLabel}>Our Studio</div>
            <div className={styles.preFooterMap}>
              <Map
                center={[loc.longitude, loc.latitude]}
                zoom={15}
                interactive={false}
                attributionControl={false}
              >
                <MapMarker longitude={loc.longitude} latitude={loc.latitude}>
                  <MarkerContent>
                    <span className={styles.preFooterMapPin} aria-hidden="true" />
                  </MarkerContent>
                  <MarkerTooltip>{loc.name}, {loc.address1}</MarkerTooltip>
                </MapMarker>
              </Map>
              <a
                className={styles.preFooterMapOverlay}
                href={gmapsLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${loc.name} on Google Maps`}
              >
                <span>Get Directions →</span>
              </a>
            </div>
            <div className={styles.preFooterAddress}>
              <div>{loc.address1}</div>
              <div>{loc.city}, {loc.region} {loc.postalCode}</div>
              <a href={`tel:${loc.phone.replace(/[^0-9+]/g, "")}`} className={styles.preFooterLink}>
                {loc.phone}
              </a>
            </div>
          </div>

          {/* Column 2 — Say Hello */}
          <div className={styles.preFooterCol}>
            <div className={styles.preFooterLabel}>Say Hello</div>
            <p className={styles.preFooterText}>
              Questions about membership, personal training, or just want to swing by
              and check the floor? Drop us a line.
            </p>
            <a href={`mailto:${loc.email}`} className={styles.preFooterEmail}>
              {loc.email}
            </a>
            <div className={styles.preFooterHours}>
              <div className={styles.preFooterHoursRow}>
                <span>Mon – Fri</span>
                <span>{loc.hoursMonFri}</span>
              </div>
              <div className={styles.preFooterHoursRow}>
                <span>Sat – Sun</span>
                <span>{loc.hoursSatSun}</span>
              </div>
            </div>
          </div>

          {/* Column 3 — Follow Us */}
          <div className={styles.preFooterCol}>
            <div className={styles.preFooterLabel}>Follow Us</div>
            <p className={styles.preFooterText}>
              See what&apos;s happening on the floor: class highlights, fight nights,
              and the community we train alongside.
            </p>
            <div className={styles.preFooterSocials}>
              <a href="https://www.instagram.com/fiitco/" target="_blank" rel="noopener noreferrer" className={styles.preFooterSocial} aria-label="Follow FIIT Co. on Instagram">
                <IgIcon />
              </a>
              <a href="https://www.facebook.com/fiitco/" target="_blank" rel="noopener noreferrer" className={styles.preFooterSocial} aria-label="Follow FIIT Co. on Facebook">
                <FbIcon />
              </a>
            </div>
            <a href={MINDBODY_SHOP_URL} target="_blank" rel="noopener noreferrer" className={styles.preFooterCta}>
              First Class Free →
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLegal}>
          <div className={styles.footerCopyright}>
            © {year} {loc.name.replace(/ Leslieville$/, "")}. All rights reserved.
          </div>
          <nav className={styles.footerLegalLinks} aria-label="Legal">
            <Link href="/privacy-policy" className={styles.footerLegalLink}>Privacy Policy</Link>
            <span className={styles.footerLegalDivider} aria-hidden="true">·</span>
            <Link href="/terms" className={styles.footerLegalLink}>Terms of Use</Link>
            <span className={styles.footerLegalDivider} aria-hidden="true">·</span>
            <Link href="/accessibility" className={styles.footerLegalLink}>Accessibility</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
