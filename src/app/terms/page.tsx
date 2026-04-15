import Link from "next/link";
import styles from "../site.module.css";
import SiteFooter from "../_components/SiteFooter";

export const metadata = {
  title: "Terms of Use — FIIT Co.",
  description:
    "Terms of use for fiitco.ca. Acceptable use, intellectual property, referral rules, liability, and governing law for FIIT Co.'s website and online forms.",
  alternates: { canonical: "https://fiitco.ca/terms" },
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "April 13, 2026";
const LAST_UPDATED = "April 13, 2026";

export default function TermsPage() {
  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Legal</div>
          <h1 className={styles.headlineLg}>Terms of Use.</h1>
          <p
            className={styles.bodyLg}
            style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)" }}
          >
            Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container} style={{ maxWidth: "820px" }}>
          <div className={styles.legalBody}>
            <p className={styles.bodyLg}>
              These Terms of Use (&ldquo;<strong>Terms</strong>&rdquo;) govern your
              access to and use of <strong>fiitco.ca</strong> and any forms, content, or
              services we offer on this website (together, the &ldquo;
              <strong>Site</strong>&rdquo;). By visiting the Site or submitting a form,
              you agree to these Terms. If you do not agree, please do not use the Site.
            </p>

            <p className={styles.body}>
              These Terms do <strong>not</strong> cover your in-studio membership
              agreement, waiver, or the booking and payment terms you accept through{" "}
              <strong>Mindbody</strong>. Those are separate contracts between you and
              FIIT Co. (or, for booking, between you and Mindbody).
            </p>

            {/* 1 */}
            <h2 className={styles.legalH2}>1. Who We Are</h2>
            <p className={styles.body}>
              &ldquo;<strong>FIIT Co.</strong>,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo;
              and &ldquo;our&rdquo; refer to FIIT Co., a boutique boxing and fitness
              studio operating at 1047 Gerrard St E, Toronto, ON M4M 1Z7, Canada. You
              can reach us at{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">
                info@fiitco.ca
              </a>{" "}
              or{" "}
              <a className={styles.inlineLink} href="tel:+14165659300">
                (416) 565-9300
              </a>
              .
            </p>

            {/* 2 */}
            <h2 className={styles.legalH2}>2. Eligibility</h2>
            <p className={styles.body}>
              You must be at least <strong>18 years old</strong> to submit a form on
              this Site. Children&apos;s and teens&apos; programs are booked by a
              parent or guardian through Mindbody and are not enrolled through
              fiitco.ca.
            </p>

            {/* 3 */}
            <h2 className={styles.legalH2}>3. Informational Purpose</h2>
            <p className={styles.body}>
              Content on the Site — including class descriptions, trainer bios,
              pricing, blog posts, and nutrition notes — is provided for general
              information only. It is <strong>not</strong> medical, nutritional,
              rehabilitation, or professional fitness advice. Always consult a
              qualified healthcare provider before starting any exercise or nutrition
              program.
            </p>

            {/* 4 */}
            <h2 className={styles.legalH2}>4. Guest Pass &amp; Referral Rules</h2>
            <ul className={styles.legalList}>
              <li>
                <strong>Guest passes</strong> are a benefit of active FIIT Co.
                membership. Passes are non-transferable, have no cash value, are valid
                for <strong>30 days</strong> from issue, and may be used by a
                first-time visitor to the studio only.
              </li>
              <li>
                <strong>Refer-A-Friend</strong> rewards apply only when the referred
                friend joins on a <strong>full, paid membership</strong> (not a drop-in
                or intro offer) and remains active beyond any grace period. Credits
                apply to the referring member&apos;s next billing cycle and cannot be
                exchanged for cash.
              </li>
              <li>
                When you submit a friend&apos;s name and phone number, you confirm you
                have their permission. We reserve the right to remove any record if a
                friend tells us they did not consent.
              </li>
              <li>
                FIIT Co. may update, suspend, or end the guest pass and referral
                programs at any time with reasonable notice on this page.
              </li>
            </ul>

            {/* 5 */}
            <h2 className={styles.legalH2}>5. Mindbody &amp; Third-Party Services</h2>
            <p className={styles.body}>
              When you click &ldquo;Book a Class,&rdquo; &ldquo;Sign Up,&rdquo; or any
              similar button, you leave fiitco.ca and are directed to{" "}
              <strong>Mindbody</strong> or another third-party service. Those services
              have their own terms, privacy policies, and accessibility statements. We
              are not responsible for their content, availability, or practices. You
              deal with those services directly.
            </p>

            {/* 6 */}
            <h2 className={styles.legalH2}>6. Acceptable Use</h2>
            <p className={styles.body}>You agree that you will not:</p>
            <ul className={styles.legalList}>
              <li>
                Use the Site for any unlawful purpose, to harass anyone, or to violate
                anyone&apos;s privacy.
              </li>
              <li>
                Submit false, misleading, or stolen information — including a
                friend&apos;s phone number without permission.
              </li>
              <li>
                Scrape, data-mine, reverse-engineer, or attempt to extract our database,
                source code, or infrastructure.
              </li>
              <li>
                Interfere with, overload, or probe the Site for vulnerabilities without
                our written permission.
              </li>
              <li>
                Upload or transmit any virus, malware, or malicious code.
              </li>
              <li>
                Impersonate FIIT Co., a trainer, or another user.
              </li>
            </ul>
            <p className={styles.body}>
              We may block, remove, or report any activity that violates these rules.
            </p>

            {/* 7 */}
            <h2 className={styles.legalH2}>7. Intellectual Property</h2>
            <p className={styles.body}>
              The Site, its design, text, graphics, logos, class names (including{" "}
              &ldquo;FIIT Co.&rdquo; and our class format names), photography, and
              video are owned by FIIT Co. or licensed to us and are protected by
              Canadian and international copyright, trademark, and other laws.
            </p>
            <p className={styles.body}>
              You may view and download pages for your <strong>personal,
              non-commercial</strong> use. You may not copy, reproduce, republish,
              upload, modify, transmit, distribute, or use any content from the Site
              for commercial purposes, or to train any machine-learning model, without
              our prior written consent.
            </p>
            <p className={styles.body}>
              Third-party trademarks (for example, <strong>Mindbody</strong>,{" "}
              <strong>Vercel</strong>, <strong>Convex</strong>) belong to their
              respective owners.
            </p>

            {/* 8 */}
            <h2 className={styles.legalH2}>8. User Submissions</h2>
            <p className={styles.body}>
              If you send us feedback, testimonials, photos, or suggestions, you grant
              FIIT Co. a non-exclusive, royalty-free, worldwide licence to use, display,
              and adapt that content in connection with running and promoting the
              studio. You confirm that you own or have the right to share whatever you
              send. You can ask us to remove user-submitted content at any time by
              emailing{" "}
              <a className={styles.inlineLink} href="mailto:info@fiitco.ca">
                info@fiitco.ca
              </a>
              .
            </p>

            {/* 9 */}
            <h2 className={styles.legalH2}>9. Disclaimers</h2>
            <p className={styles.body}>
              The Site is provided &ldquo;<strong>as is</strong>&rdquo; and &ldquo;as
              available.&rdquo; To the fullest extent permitted by law, FIIT Co. makes
              no warranties of any kind, express or implied, including warranties of
              merchantability, fitness for a particular purpose, non-infringement, or
              uninterrupted availability. We do not guarantee that the Site will be
              error-free, that defects will be corrected, or that the Site or server
              is free of viruses or other harmful components.
            </p>
            <p className={styles.body}>
              Physical training involves inherent risk. You are responsible for knowing
              your own limits and consulting a medical professional before beginning or
              changing an exercise program. Nothing on this Site replaces that advice.
            </p>

            {/* 10 */}
            <h2 className={styles.legalH2}>10. Limitation Of Liability</h2>
            <p className={styles.body}>
              To the maximum extent permitted by law, FIIT Co., its owners, staff,
              trainers, and affiliates are not liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits,
              data, goodwill, or other intangible losses, arising out of or in
              connection with your use of the Site — even if we have been advised of
              the possibility of such damages. Our total liability to you for any claim
              related to the Site will not exceed <strong>one hundred Canadian
              dollars (CAD $100)</strong>.
            </p>
            <p className={styles.body}>
              Nothing in these Terms limits liability that cannot be excluded under
              applicable Canadian consumer protection law.
            </p>

            {/* 11 */}
            <h2 className={styles.legalH2}>11. Indemnity</h2>
            <p className={styles.body}>
              You agree to indemnify and hold FIIT Co. harmless from any claim, loss,
              liability, or expense (including reasonable legal fees) that arises out
              of your breach of these Terms, your misuse of the Site, or your violation
              of another person&apos;s rights — including submitting someone else&apos;s
              contact information without permission.
            </p>

            {/* 12 */}
            <h2 className={styles.legalH2}>12. Links To Other Sites</h2>
            <p className={styles.body}>
              The Site may contain links to external websites — Mindbody, Instagram,
              Facebook, Yelp, and others. We provide those links for convenience and do
              not endorse or take responsibility for the content, privacy practices, or
              accessibility of any site we do not control.
            </p>

            {/* 13 */}
            <h2 className={styles.legalH2}>13. Privacy</h2>
            <p className={styles.body}>
              Your use of the Site is also governed by our{" "}
              <Link className={styles.inlineLink} href="/privacy-policy">
                Privacy Policy
              </Link>
              , which explains what personal information we collect, how we use it, and
              your rights under PIPEDA.
            </p>

            {/* 14 */}
            <h2 className={styles.legalH2}>14. Changes To These Terms</h2>
            <p className={styles.body}>
              We may update these Terms from time to time. When we do, we&apos;ll post
              the new version here and update the &ldquo;Last updated&rdquo; date at
              the top of the page. Material changes will be highlighted on the homepage
              for at least two weeks. Your continued use of the Site after changes take
              effect means you accept the updated Terms.
            </p>

            {/* 15 */}
            <h2 className={styles.legalH2}>15. Governing Law</h2>
            <p className={styles.body}>
              These Terms are governed by the laws of the{" "}
              <strong>Province of Ontario</strong> and the federal laws of Canada that
              apply in Ontario, without regard to conflict-of-laws principles. You
              agree that the courts of Ontario have exclusive jurisdiction over any
              dispute arising from or related to these Terms or the Site.
            </p>

            {/* 16 */}
            <h2 className={styles.legalH2}>16. Contact</h2>
            <address className={styles.legalAddress}>
              <strong>FIIT Co.</strong>
              <br />
              Attn: Legal / Studio Manager
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
