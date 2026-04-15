"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../site.module.css";

export default function GuestPassModal({ onClose }: { onClose: () => void }) {
  const create = useMutation(anyApi.guestPasses.create);
  const [memberFirstName, setMemberFirstName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [friendConsent, setFriendConsent] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendConsent || !privacyConsent) {
      setError("Please confirm both checkboxes before submitting.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await create({ memberFirstName, memberPhone, guestFirstName, guestPhone });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.label}>Member Perk</div>
        <h2 className={styles.modalTitle}>Bring a Friend</h2>
        <p className={styles.modalSubtitle}>
          Every active member gets two free guest passes per month. Fill this out, and your
          friend can walk in and train on us.
        </p>

        {success ? (
          <div className={styles.formSuccess}>
            <div className={styles.formSuccessIcon}>✓</div>
            <h3 className={styles.headlineSm}>You're all set.</h3>
            <p className={styles.body}>
              We'll text your friend shortly with how to book. Pass is valid for 30 days.
            </p>
            <button type="button" className={styles.btnRed} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.formSection}>
              <div className={styles.label}>Your Details</div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>First name</label>
                <input
                  className={styles.formInput}
                  value={memberFirstName}
                  onChange={(e) => setMemberFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={memberPhone}
                  onChange={(e) => setMemberPhone(e.target.value)}
                  placeholder="416 555 0100"
                  required
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.label}>Your Friend</div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Friend's first name</label>
                <input
                  className={styles.formInput}
                  value={guestFirstName}
                  onChange={(e) => setGuestFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Friend's phone</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="416 555 0100"
                  required
                />
              </div>
            </div>

            <div className={styles.consentBlock}>
              <label className={styles.consentRow}>
                <input
                  type="checkbox"
                  className={styles.consentCheckbox}
                  checked={friendConsent}
                  onChange={(e) => setFriendConsent(e.target.checked)}
                />
                <span className={styles.consentText}>
                  I have my friend&apos;s permission to share their first name and phone
                  number with FIIT Co. so the studio can text them about their guest pass.
                </span>
              </label>
              <label className={styles.consentRow}>
                <input
                  type="checkbox"
                  className={styles.consentCheckbox}
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                />
                <span className={styles.consentText}>
                  I agree to the{" "}
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>{" "}
                  and understand my submission is stored in a private database hosted in
                  the United States.
                </span>
              </label>
            </div>

            {error && <div className={styles.formError}>{error}</div>}

            <button type="submit" className={styles.btnRed} disabled={submitting}>
              {submitting ? "Sending…" : "Send Guest Pass"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
