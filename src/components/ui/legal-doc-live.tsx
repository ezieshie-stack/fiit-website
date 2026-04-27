"use client";

/**
 * LegalDocLive
 *
 * Renders a legal document body — privacy policy, terms, accessibility,
 * etc. — fetched live from the staff portal's Convex backend. Falls back
 * to a static React tree if no override exists in the database, so the
 * customer site keeps working even before Arden has touched anything.
 *
 * Usage:
 *   <LegalDocLive
 *     slug="privacy-policy"
 *     staticTitle="Privacy Policy."
 *     staticEffectiveDate="April 13, 2026"
 *     staticBody={<>...original hardcoded JSX body...</>}
 *   />
 *
 * Behaviour:
 *   - While the Convex query is loading, renders the static fallback so
 *     SEO crawlers (and humans on slow networks) see real content.
 *   - When the query resolves, if a row exists with a non-empty body,
 *     renders the editable title / effective date / TipTap content.
 *   - If the row is missing or its body is just an empty paragraph,
 *     falls back to the static version.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import TipTapRenderer from "./tiptap-renderer";

type LegalDoc = {
  _id: string;
  slug: string;
  title: string;
  bodyJson: string;
  effectiveDate?: string;
  lastEditedAt: string;
  lastEditedBy: string;
};

type Props = {
  slug: string;
  staticTitle: string;
  staticEffectiveDate?: string;
  staticBody: React.ReactNode;
};

/** Heuristic check: does this TipTap JSON contain any actual text? An
 *  editor that's been "saved blank" emits a doc with one empty
 *  paragraph; that's not a real override and we should fall back. */
function isEffectivelyEmpty(json: string | undefined): boolean {
  if (!json) return true;
  try {
    const parsed = JSON.parse(json);
    const visit = (node: unknown): string => {
      if (typeof node !== "object" || node === null) return "";
      const n = node as { type?: string; text?: string; content?: unknown[] };
      if (n.type === "text" && typeof n.text === "string") return n.text;
      if (Array.isArray(n.content)) {
        return n.content.map(visit).join("");
      }
      return "";
    };
    return visit(parsed).trim() === "";
  } catch {
    return true;
  }
}

export default function LegalDocLive({
  slug,
  staticTitle,
  staticEffectiveDate,
  staticBody,
}: Props) {
  const live = useQuery(anyApi.websiteContent.getLegalDocBySlug, { slug }) as
    | LegalDoc
    | null
    | undefined;

  // While loading OR when no override exists OR override is empty,
  // render the static fallback. This keeps SSR/SEO correct and the page
  // never renders blank if Convex is unreachable.
  const useOverride =
    live !== undefined &&
    live !== null &&
    !isEffectivelyEmpty(live.bodyJson);

  if (!useOverride) {
    return (
      <LegalLayout
        title={staticTitle}
        effectiveDate={staticEffectiveDate}
        body={staticBody}
      />
    );
  }

  return (
    <LegalLayout
      title={live.title || staticTitle}
      effectiveDate={live.effectiveDate}
      body={<TipTapRenderer json={live.bodyJson} />}
      lastEditedAt={live.lastEditedAt}
    />
  );
}

// ──────────────────────────────────────────────────────────────────────────

import styles from "@/app/site.module.css";
import SiteFooter from "@/app/_components/SiteFooter";

function LegalLayout({
  title,
  effectiveDate,
  body,
  lastEditedAt,
}: {
  title: string;
  effectiveDate?: string;
  body: React.ReactNode;
  lastEditedAt?: string;
}) {
  const showLastUpdated =
    lastEditedAt &&
    (() => {
      try {
        return new Date(lastEditedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        return null;
      }
    })();

  return (
    <>
      <header className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.label}>Legal</div>
          <h1 className={styles.headlineLg}>{title}</h1>
          {(effectiveDate || showLastUpdated) && (
            <p
              className={styles.bodyLg}
              style={{ marginTop: "1.5rem", color: "rgba(255,255,255,0.6)" }}
            >
              {effectiveDate ? `Effective: ${effectiveDate}` : ""}
              {effectiveDate && showLastUpdated ? " · " : ""}
              {showLastUpdated ? `Last updated: ${showLastUpdated}` : ""}
            </p>
          )}
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.container} style={{ maxWidth: "820px" }}>
          <div className={styles.legalBody}>{body}</div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
