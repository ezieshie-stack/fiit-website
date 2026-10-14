"use client";

/**
 * Live-data wrapper for the homepage FAQ accordion. Reads `faqEntries`
 * from Convex (edited via ops tool's Website FAQ admin) with a static
 * fallback baked into the call site in page.tsx.
 *
 * Renders the <details>/<summary> accordion pattern preserved from the
 * original inline version on the homepage, plus the FAQPage JSON-LD for
 * Google rich-result treatment (generated from live data so search engines
 * see whatever's currently on the page).
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "@/app/site.module.css";

export type FaqItem = { q: string; a: string };

type LiveFaq = {
  _id: string;
  question: string;
  answer: string;
  displayOrder: number;
  active: boolean;
};

type Props = { fallback: FaqItem[] };

function toFaqItem(live: LiveFaq): FaqItem {
  return { q: live.question, a: live.answer };
}

export default function LiveFAQ({ fallback }: Props) {
  const live = useQuery(anyApi.websiteContent.listActiveFaqEntries) as
    | LiveFaq[]
    | undefined;

  const hasLive = Array.isArray(live) && live.length > 0;
  const items: FaqItem[] = hasLive ? live!.map(toFaqItem) : fallback;

  // FAQPage JSON-LD generated from whatever we're currently rendering.
  // Kept inside the client component so structured data always matches
  // what's visible — if Arden hides a question, search engines see it gone.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
    </>
  );
}
