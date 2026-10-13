"use client";

/**
 * LiveFAQ
 *
 * "You've Got Questions / We've Got Answers" section on the home page.
 * Pulls Q&A entries from Convex (via the staff /website-faq page);
 * falls back to the static `fallback` array when Convex has no entries.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../../app/site.module.css";

export type FaqItem = {
  q: string;
  a: string;
};

type ConvexFaqEntry = {
  _id: string;
  question: string;
  answer: string;
  displayOrder: number;
  active: boolean;
};

type Props = {
  badge?: string;
  title?: React.ReactNode;
  fallback: FaqItem[];
};

export default function LiveFAQ({ badge, title, fallback }: Props) {
  const live = useQuery(anyApi.websiteContent.listActiveFaqEntries) as
    | ConvexFaqEntry[]
    | undefined;

  const items: FaqItem[] =
    live && live.length > 0
      ? live
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((e) => ({ q: e.question, a: e.answer }))
      : fallback;

  return (
    <section className={styles.sectionDark}>
      <div className={styles.container}>
        {badge && <div className={styles.label}>{badge}</div>}
        {title && (
          <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
            {title}
          </h2>
        )}
        <div className={styles.faqList}>
          {items.map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQ}>
                <span className={styles.faqNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {faq.q}
              </summary>
              <p className={styles.faqA}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
