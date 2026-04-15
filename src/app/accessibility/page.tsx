import Link from "next/link";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";

export const metadata = {
  title: "Accessibility — FIIT Co.",
  description:
    "FIIT Co.'s commitment to digital and in-studio accessibility. WCAG 2.1 AA targets, known limitations, and how to request assistance or report a barrier.",
  alternates: { canonical: "https://fiitco.ca/accessibility" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "April 13, 2026";

export default function AccessibilityPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Legal</div>
          <h1 className={styles.headlineLg}>Accessibility.</h1>
          <p
            className={styles.bodyLg}
            style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container} style={{ maxWidth: "820px" }}>
          <div className={styles.legalBody}>
            <p className={styles.bodyLg}>
              FIIT Co. is committed to making our studio and website usable by as many
              people as possible, regardless of ability. Training is for everyone, and
              that starts with the door being open — physically and digitally.
            </p>

            {/* 1 */}
            <h2 className={styles.legalH2}>1. Our Standard</h2>
            <p className={styles.body}>
              We aim to meet{" "}
              <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>,
              the international benchmark referenced by Canada&apos;s{" "}
              <em>Accessible Canada Act</em> and Ontario&apos;s{" "}
              <em>Accessibility for Ontarians with Disabilities Act (AODA)</em>. We are
              not perfect yet — accessibility is ongoing work, and we welcome feedback
              from anyone who hits a barrier.
            </p>

            {/* 2 */}
            <h2 className={styles.legalH2}>2. What We&apos;ve Done On This Site</h2>
            <ul className={styles.legalList}>
              <li>
                <strong>Semantic HTML</strong> — headings, landmarks, lists, and buttons
                are marked up so screen readers can navigate the page structure.
              </li>
              <li>
                <strong>Keyboard navigation</strong> — every link, button, form field,
                and modal can be reached and operated with a keyboard alone. Focus
                states are visible.
              </li>
              <li>
                <strong>Colour contrast</strong> — body text and interactive elements
                target a 4.5:1 contrast ratio against their background.
              </li>
              <li>
                <strong>Alt text</strong> — meaningful images carry descriptive{" "}
                <code>alt</code> attributes; decorative images are marked as decorative
                so screen readers skip them.
              </li>
              <li>
                <strong>Form labels</strong> — all inputs in our Guest Pass and
                Refer-A-Friend forms have associated labels, and errors are announced
                in text, not colour alone.
              </li>
              <li>
                <strong>Responsive layout</strong> — content reflows on phones, tablets,
                and desktop without horizontal scrolling, and is readable at 200% zoom.
              </li>
              <li>
                <strong>Reduced motion</strong> — we use animation sparingly and do not
                auto-play video or audio on this site.
              </li>
            </ul>

            {/* 3 */}
            <h2 className={styles.legalH2}>3. Known Limitations</h2>
            <p className={styles.body}>
              We are honest about where we fall short. As of the date above, we are
              aware of the following:
            </p>
            <ul className={styles.legalList}>
              <li>
                Some <strong>older blog images</strong> pulled from our previous
                Squarespace site have short or generic alt text that we are rewriting
                as we migrate content.
              </li>
              <li>
                <strong>Class bookings</strong> are handled by{" "}
                <a
                  className={styles.inlineLink}
                  href="https://company.mindbodyonline.com/legal/accessibility"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mindbody
                </a>
                , which runs on its own platform. When you click &ldquo;Book a
                Class,&rdquo; you leave fiitco.ca, and the Mindbody page&apos;s
                accessibility is governed by them. If you run into a Mindbody barrier,
                email us and we&apos;ll help you book another way.
              </li>
              <li>
                Video testimonials and class previews may not yet have captions or
                transcripts. Captioning is on our backlog.
              </li>
            </ul>

            {/* 4 */}
            <h2 className={styles.legalH2}>4. At The Studio</h2>
            <ul className={styles.legalList}>
              <li>
                Our studio is on the{" "}
                <strong>second floor of 1047 Gerrard St E</strong>, above The Vatican
                Gift Shop. The building entrance has a staircase; there is currently{" "}
                <strong>no elevator</strong>. We know this is a real barrier and we are
                actively planning for a ground-floor, step-free space as part of our
                next location.
              </li>
              <li>
                Washrooms and change areas are located on the training floor.
              </li>
              <li>
                Our staff are trained to adapt classes for a wide range of experience
                levels, injuries, and mobility needs. If you let us know what you need
                ahead of time, we will meet you there.
              </li>
              <li>
                <strong>Service animals</strong> are always welcome.
              </li>
            </ul>

            {/* 5 */}
            <h2 className={styles.legalH2}>5. Assistive Technology We Test With</h2>
            <p className={styles.body}>
              We test against the latest versions of:
            </p>
            <ul className={styles.legalList}>
              <li>VoiceOver (macOS and iOS)</li>
              <li>TalkBack (Android)</li>
              <li>NVDA (Windows) — where available</li>
              <li>Keyboard-only navigation (Tab, Shift-Tab, Enter, Space, Escape)</li>
              <li>Browser zoom up to 200%</li>
            </ul>
            <p className={styles.body}>
              If you use a different tool and it breaks our site, we want to know.
            </p>

            {/* 6 */}
            <h2 className={styles.legalH2}>6. Request Help Or Report A Barrier</h2>
            <p className={styles.body}>
              If any part of this website, our studio, or our booking process is
              difficult for you to use, tell us. We will do our best to provide the
              information or service in a format that works for you — by phone, by
              email, or in person — within a reasonable time, at no cost.
            </p>
            <address className={styles.legalAddress}>
              <strong>FIIT Co.</strong>
              <br />
              Attn: Accessibility / Studio Manager
              <br />
              1047 Gerrard St E
              <br />
              Toronto, ON M4M 1Z7
              <br />
              Canada
              <br />
              <br />
              Email:{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">
                info@fiitco.ca
              </a>
              <br />
              Phone:{" "}
              <a className={styles.inlineLink} href="tel:+14165659300">
                (416) 565-9300
              </a>
            </address>
            <p className={styles.body}>
              Please tell us the page or feature involved, what went wrong, and what
              assistive technology or browser you were using. We aim to respond within{" "}
              <strong>5 business days</strong>.
            </p>

            {/* 7 */}
            <h2 className={styles.legalH2}>7. Formal Complaints</h2>
            <p className={styles.body}>
              If you are not satisfied with our response, you can contact the{" "}
              <a
                className={styles.inlineLink}
                href="https://accessibility.canada.ca/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Accessibility Commissioner of Canada
              </a>{" "}
              or, for Ontario-specific concerns, the province&apos;s AODA contact
              centre at{" "}
              <a
                className={styles.inlineLink}
                href="https://www.ontario.ca/page/accessibility-laws"
                target="_blank"
                rel="noopener noreferrer"
              >
                ontario.ca/accessibility
              </a>
              .
            </p>

            {/* 8 */}
            <h2 className={styles.legalH2}>8. Updates To This Statement</h2>
            <p className={styles.body}>
              We review this statement at least once a year and whenever we ship a
              significant change to the site. The &ldquo;Last updated&rdquo; date at
              the top of the page reflects the most recent review.
            </p>

            <p className={styles.body} style={{ marginTop: "3rem" }}>
              <Link href="/" className={styles.inlineLink}>
                ← Back to home
              </Link>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
