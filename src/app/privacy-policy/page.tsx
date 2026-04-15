import Link from "next/link";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";

export const metadata = {
  title: "Privacy Policy | FIIT Co.",
  description:
    "How FIIT Co. collects, uses, stores, and protects your personal information. PIPEDA-aligned privacy notice for our Leslieville boxing studio.",
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "April 13, 2026";
const LAST_UPDATED = "April 13, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Legal</div>
          <h1 className={styles.headlineLg}>Privacy Policy.</h1>
          <p className={styles.bodyLg} style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)" }}>
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container} style={{ maxWidth: "820px" }}>
          <div className={styles.legalBody}>
            <p className={styles.bodyLg}>
              FIIT Co. (&ldquo;<strong>FIIT Co.</strong>,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;
              or &ldquo;our&rdquo;) respects your privacy. This policy explains what personal
              information we collect on <strong>fiitco.ca</strong>, how we use it, who we share
              it with, how long we keep it, and the rights you have under Canada&apos;s
              <em> Personal Information Protection and Electronic Documents Act</em> (PIPEDA).
            </p>

            <p className={styles.body}>
              If anything here is unclear, or you want to exercise any of the rights below,
              email us at{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">info@fiitco.ca</a>{" "}
              or call{" "}
              <a className={styles.inlineLink} href="tel:+14165659300">(416) 565-9300</a>.
            </p>

            {/* 1 */}
            <h2 className={styles.legalH2}>1. Who We Are</h2>
            <p className={styles.body}>
              FIIT Co. is a boutique boxing and fitness studio located at 1047 Gerrard St E,
              Toronto, ON M4M 1Z7, Canada. We are the &ldquo;data controller&rdquo; of the
              information described in this policy. Our privacy contact is the Studio Manager,
              reachable at{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">info@fiitco.ca</a>.
            </p>

            {/* 2 */}
            <h2 className={styles.legalH2}>2. What We Collect</h2>
            <p className={styles.body}>We only collect what we need to run the studio.</p>

            <h3 className={styles.legalH3}>2.1 Information you give us on this website</h3>
            <ul className={styles.legalList}>
              <li>
                <strong>Guest Pass form.</strong> When an active member invites a friend, we
                collect the member&apos;s first name and phone number, and the friend&apos;s
                first name and phone number.
              </li>
              <li>
                <strong>Refer-A-Friend form.</strong> When a member refers a friend who may
                join on a full membership, we collect the referrer&apos;s first name and phone
                number, and the friend&apos;s first name and phone number.
              </li>
              <li>
                <strong>Contact emails.</strong> If you email us, we keep your email address
                and the content of your message.
              </li>
            </ul>

            <h3 className={styles.legalH3}>2.2 Information collected automatically</h3>
            <ul className={styles.legalList}>
              <li>
                Basic technical data from our hosting provider (IP address, browser type,
                referring page, timestamp) used for security and to keep the site running.
              </li>
              <li>
                We do <strong>not</strong> currently run advertising cookies, tracking pixels,
                or third-party analytics on this site. If that changes, we&apos;ll update this
                policy and ask for consent where required.
              </li>
            </ul>

            <h3 className={styles.legalH3}>2.3 Information NOT collected here</h3>
            <p className={styles.body}>
              We do <strong>not</strong> collect credit card numbers, government IDs, health
              records, or membership payment information on this website. Memberships and
              class bookings are processed by <strong>Mindbody</strong>. See Section 5.
            </p>

            {/* 3 */}
            <h2 className={styles.legalH2}>3. Why We Collect It</h2>
            <ul className={styles.legalList}>
              <li>To send your friend a guest pass or referral invitation.</li>
              <li>To contact you by text or phone about your submission.</li>
              <li>To credit your account if a referred friend joins on a full membership.</li>
              <li>To respond to questions you send us.</li>
              <li>To protect the site against spam and abuse.</li>
            </ul>
            <p className={styles.body}>
              We do not use your information for any other purpose without asking you first,
              and we never sell personal information.
            </p>

            {/* 4 */}
            <h2 className={styles.legalH2}>4. Consent</h2>
            <p className={styles.body}>
              By submitting one of our forms, you consent to the collection and use described
              above. You can withdraw consent at any time by emailing{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">info@fiitco.ca</a>{" "}
              , we&apos;ll delete your record within a reasonable period (see Section 7).
            </p>

            <h3 className={styles.legalH3}>4.1 Submitting a friend&apos;s information</h3>
            <p className={styles.body}>
              If you give us someone else&apos;s first name and phone number (Guest Pass or
              Refer-A-Friend), you must first confirm with that person that they agree to hear
              from FIIT Co. about a guest pass or membership invitation. Both forms include a
              checkbox where you confirm you have your friend&apos;s permission before
              submitting. We rely on that confirmation.
            </p>
            <p className={styles.body}>
              If a friend tells us they didn&apos;t consent, we&apos;ll delete their record
              immediately and stop contacting them.
            </p>

            {/* 5 */}
            <h2 className={styles.legalH2}>5. Who We Share It With</h2>
            <p className={styles.body}>
              We do not sell, rent, or trade personal information. We share it only with the
              service providers that help us run the studio and the site, and only to the
              extent they need it to do their job.
            </p>

            <h3 className={styles.legalH3}>5.1 Mindbody (booking &amp; payments)</h3>
            <p className={styles.body}>
              Class schedules, memberships, intro offers, and personal training bookings are
              handled by <strong>Mindbody, Inc.</strong> When you click a &ldquo;Book&rdquo;
              or &ldquo;Sign Up&rdquo; button on our site, you leave fiitco.ca and are handed
              off to Mindbody&apos;s platform. At that point, Mindbody&apos;s own privacy
              notice governs what they collect (name, email, phone, payment details,
              attendance history). We do not send data from this website&apos;s forms directly
              to Mindbody. Guest Pass and Refer-A-Friend submissions go to our own private
              database, not to Mindbody. If you become a full FIIT Co. member through
              Mindbody, we may match your name and phone across both systems so we can apply
              referral credits and manage your membership.
            </p>
            <p className={styles.body}>
              You can read Mindbody&apos;s privacy policy at{" "}
              <a
                className={styles.inlineLink}
                href="https://company.mindbodyonline.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                company.mindbodyonline.com/legal/privacy-policy
              </a>
              .
            </p>

            <h3 className={styles.legalH3}>5.2 Convex (database)</h3>
            <p className={styles.body}>
              Form submissions are stored in a private database operated by{" "}
              <strong>Convex, Inc.</strong> (United States). Convex acts as our data processor
              under a written agreement and only processes data on our instructions.
            </p>

            <h3 className={styles.legalH3}>5.3 Vercel (hosting)</h3>
            <p className={styles.body}>
              This website is hosted by <strong>Vercel, Inc.</strong> (United States).
              Vercel processes basic request metadata (IP, browser, timestamps) to serve the
              site and defend against abuse.
            </p>

            <h3 className={styles.legalH3}>5.4 Cross-border transfer</h3>
            <p className={styles.body}>
              Convex, Vercel, and Mindbody are U.S.-based companies. When you submit a form
              or visit our site, your personal information may be processed in the United
              States. While there, it is subject to lawful access requests by U.S.
              authorities. By submitting a form, you acknowledge and consent to this
              cross-border transfer.
            </p>

            <h3 className={styles.legalH3}>5.5 Legal disclosure</h3>
            <p className={styles.body}>
              We may disclose personal information if required by Canadian law, a court order,
              or to protect the safety of our members, staff, or the public.
            </p>

            {/* 6 */}
            <h2 className={styles.legalH2}>6. How We Protect It</h2>
            <ul className={styles.legalList}>
              <li>TLS (HTTPS) encrypts the data in transit between your device and our site.</li>
              <li>
                Access to the stored data is restricted to studio staff who need it to run the
                gym (e.g., front desk, manager) and is protected by individual logins with
                role-based permissions.
              </li>
              <li>We do not store or display full phone numbers publicly on the website.</li>
              <li>
                We keep the site and its dependencies patched, and we monitor for suspicious
                activity.
              </li>
              <li>
                No system is perfectly secure. If a breach affects your information, we&apos;ll
                notify you and the Office of the Privacy Commissioner of Canada as required by
                PIPEDA.
              </li>
            </ul>

            {/* 7 */}
            <h2 className={styles.legalH2}>7. How Long We Keep It</h2>
            <ul className={styles.legalList}>
              <li>
                <strong>Guest Pass records:</strong> kept for up to <strong>12 months</strong>{" "}
                after submission, then anonymized or deleted.
              </li>
              <li>
                <strong>Referral records:</strong> kept until the referral is resolved (friend
                joins or declines), plus <strong>24 months</strong> for accounting purposes.
              </li>
              <li>
                <strong>Contact emails:</strong> kept as long as needed to handle your
                request, then archived or deleted.
              </li>
              <li>
                You can ask us to delete your data sooner by emailing{" "}
                <a className={styles.inlineLink} href="mailto:info@fiitco.ca">info@fiitco.ca</a>.
              </li>
            </ul>

            {/* 8 */}
            <h2 className={styles.legalH2}>8. Your Rights Under PIPEDA</h2>
            <p className={styles.body}>As a Canadian resident, you have the right to:</p>
            <ul className={styles.legalList}>
              <li>
                <strong>Know</strong> what personal information we have about you.
              </li>
              <li>
                <strong>Access</strong> a copy of that information.
              </li>
              <li>
                <strong>Correct</strong> information that is wrong or out of date.
              </li>
              <li>
                <strong>Withdraw consent</strong> for any of our uses (this may mean we can no
                longer offer you guest passes or referral credits).
              </li>
              <li>
                <strong>Request deletion</strong> of your data when it is no longer needed.
              </li>
              <li>
                <strong>File a complaint</strong> with us, and, if you&apos;re not satisfied,
                with the{" "}
                <a
                  className={styles.inlineLink}
                  href="https://www.priv.gc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Office of the Privacy Commissioner of Canada
                </a>
                .
              </li>
            </ul>
            <p className={styles.body}>
              To exercise any of these rights, email{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">info@fiitco.ca</a>{" "}
              with your name, phone number, and the request. We&apos;ll respond within 30 days.
              We may ask you to confirm your identity before releasing or changing records.
            </p>

            {/* 9 */}
            <h2 className={styles.legalH2}>9. Children&apos;s Privacy</h2>
            <p className={styles.body}>
              We offer programs for kids ages 7–12 and teens ages 12–17 through FIIT Co. and
              the Boxing Academy. Those programs are booked by a parent or guardian through
              Mindbody. This website does not enroll children directly. We do not knowingly
              collect personal information from children under 13 on this website. If a parent
              or guardian discovers that a child has submitted information here, email us and
              we&apos;ll delete it.
            </p>

            {/* 10 */}
            <h2 className={styles.legalH2}>10. Cookies &amp; Tracking</h2>
            <p className={styles.body}>
              We do not currently use marketing cookies, ad pixels, or third-party analytics
              on this site. The site uses only the small amount of technical data needed to
              serve pages and keep sessions alive. If we add analytics or advertising in the
              future, we will update this policy and, where required, show a cookie banner
              first.
            </p>

            {/* 11 */}
            <h2 className={styles.legalH2}>11. Links To Other Sites</h2>
            <p className={styles.body}>
              Our website links to external services: Mindbody, Instagram, Facebook, Yelp,
              and others. Once you leave fiitco.ca, you are subject to those services&apos;
              own privacy policies. We are not responsible for what happens on sites we
              don&apos;t control.
            </p>

            {/* 12 */}
            <h2 className={styles.legalH2}>12. Changes To This Policy</h2>
            <p className={styles.body}>
              We may update this policy to reflect changes in the law or how we operate the
              studio. We&apos;ll post the new version here and update the &ldquo;Last
              updated&rdquo; date at the top. Material changes will be highlighted on the
              homepage for at least two weeks.
            </p>

            {/* 13 */}
            <h2 className={styles.legalH2}>13. How To Reach Us</h2>
            <address className={styles.legalAddress}>
              <strong>FIIT Co.</strong>
              <br />
              Attn: Privacy / Studio Manager
              <br />
              1047 Gerrard St E<br />
              Toronto, ON M4M 1Z7<br />
              Canada
              <br />
              <br />
              Email:{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">info@fiitco.ca</a>
              <br />
              Phone:{" "}
              <a className={styles.inlineLink} href="tel:+14165659300">(416) 565-9300</a>
            </address>

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
