import Link from "next/link";
import styles from "../site.module.css";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
} from "@/components/ui/map";

// FIIT Co. — 1047 Gerrard St E, Toronto, ON M4M 1Z7
// Coordinates geocoded from OpenStreetMap Nominatim against the full address.
const LAT = 43.6689575;
const LNG = -79.3362194;
// Google Maps deep link — uses the full address as the destination so mobile
// devices open the native Maps app with the right pin + directions flow.
const GMAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("FIIT Co., 1047 Gerrard St E, Toronto, ON M4M 1Z7");
const MINDBODY_URL =
  "https://www.mindbodyonline.com/explore/deals/fiit-co/intro-offer-10377";

// Simple inline SVG icons — no external dependency, keeps bundle small
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
function YtIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2c-.24-.9-.93-1.6-1.83-1.83C18.17 5 12 5 12 5s-6.17 0-7.77.37C3.33 5.6 2.64 6.3 2.4 7.2 2.03 8.8 2.03 12 2.03 12s0 3.2.37 4.8c.24.9.93 1.6 1.83 1.83C5.83 19 12 19 12 19s6.17 0 7.77-.37c.9-.23 1.6-.93 1.83-1.83.37-1.6.37-4.8.37-4.8s0-3.2-.37-4.8zM10 15.06V8.94L15.33 12 10 15.06z" />
    </svg>
  );
}
function TtIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M19.5 8.9a6.9 6.9 0 0 1-4.06-1.3v6.9a5.6 5.6 0 1 1-4.83-5.55v2.82a2.83 2.83 0 1 0 1.97 2.7V2.5h2.86a4.04 4.04 0 0 0 4.06 4v2.4z" />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();
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
                center={[LNG, LAT]}
                zoom={15}
                interactive={false}
                attributionControl={false}
              >
                <MapMarker longitude={LNG} latitude={LAT}>
                  <MarkerContent>
                    <span className={styles.preFooterMapPin} aria-hidden="true" />
                  </MarkerContent>
                  <MarkerTooltip>FIIT Co., 1047 Gerrard St E</MarkerTooltip>
                </MapMarker>
              </Map>
              <a
                className={styles.preFooterMapOverlay}
                href={GMAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to FIIT Co. on Google Maps"
              >
                <span>Get Directions →</span>
              </a>
            </div>
            <div className={styles.preFooterAddress}>
              <div>1047 Gerrard St E</div>
              <div>Toronto, ON M4M 1Z7</div>
              <a href="tel:+14165659300" className={styles.preFooterLink}>
                (416) 565-9300
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
            <a
              href="mailto:info@fiitco.ca"
              className={styles.preFooterEmail}
            >
              info@fiitco.ca
            </a>
            <div className={styles.preFooterHours}>
              <div className={styles.preFooterHoursRow}>
                <span>Mon – Fri</span>
                <span>6:00 AM – 8:30 PM</span>
              </div>
              <div className={styles.preFooterHoursRow}>
                <span>Sat – Sun</span>
                <span>8:00 AM – 8:30 PM</span>
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
              <a
                href="https://www.instagram.com/fiitco/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.preFooterSocial}
                aria-label="Follow FIIT Co. on Instagram"
              >
                <IgIcon />
              </a>
              <a
                href="https://www.facebook.com/fiitco/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.preFooterSocial}
                aria-label="Follow FIIT Co. on Facebook"
              >
                <FbIcon />
              </a>
              <a
                href="https://www.tiktok.com/@fiitco"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.preFooterSocial}
                aria-label="Follow FIIT Co. on TikTok"
              >
                <TtIcon />
              </a>
              <a
                href="https://www.youtube.com/@fiitco"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.preFooterSocial}
                aria-label="Follow FIIT Co. on YouTube"
              >
                <YtIcon />
              </a>
            </div>
            <a
              href={MINDBODY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.preFooterCta}
            >
              First Class Free →
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLegal}>
          <div className={styles.footerCopyright}>
            © {year} FIIT Co. All rights reserved.
          </div>
          <nav className={styles.footerLegalLinks} aria-label="Legal">
            <Link href="/privacy-policy" className={styles.footerLegalLink}>
              Privacy Policy
            </Link>
            <span className={styles.footerLegalDivider} aria-hidden="true">·</span>
            <Link href="/terms" className={styles.footerLegalLink}>
              Terms of Use
            </Link>
            <span className={styles.footerLegalDivider} aria-hidden="true">·</span>
            <Link href="/accessibility" className={styles.footerLegalLink}>
              Accessibility
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
