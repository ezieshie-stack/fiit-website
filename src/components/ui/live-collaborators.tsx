"use client";

/**
 * Live-data wrapper for the Community page collaborator grid. Reads
 * `collaborators` from Convex (edited via ops tool's Website Community
 * admin) and falls back to the hardcoded list in _data/community.ts if
 * Convex is unreachable.
 *
 * Renders the card grid + "Coming Soon" tag for unconfirmed entries,
 * preserving the visual layout that was previously inline in
 * /community/page.tsx.
 */

import Link from "next/link";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "@/app/site.module.css";
import { COLLABORATORS, type Collaborator } from "@/app/_data/community";

type LiveCollaborator = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  href?: string;
  location?: string;
  photoUrl?: string;
  confirmed: boolean;
  displayOrder: number;
  active: boolean;
};

function toCollaborator(live: LiveCollaborator): Collaborator {
  return {
    id: live.slug,
    name: live.name,
    category: live.category,
    description: live.description,
    href: live.href ?? null,
    location: live.location,
    confirmed: live.confirmed,
  };
}

export default function LiveCollaborators() {
  const live = useQuery(anyApi.websiteContent.listActiveCollaborators) as
    | LiveCollaborator[]
    | undefined;

  const hasLive = Array.isArray(live) && live.length > 0;
  const roster: Collaborator[] = hasLive
    ? live!.map(toCollaborator)
    : COLLABORATORS;

  return (
    <div className={styles.programsGrid}>
      {roster.map((c) => (
        <div key={c.id} className={styles.programCard}>
          <div className={styles.programHeader}>
            <div className={styles.programTag}>{c.category}</div>
            {!c.confirmed && (
              <span
                style={{
                  fontSize: "0.62rem",
                  fontFamily: "var(--font-chakra)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.42)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  padding: "0.25rem 0.55rem",
                }}
              >
                Coming Soon
              </span>
            )}
          </div>

          <h3 className={styles.programTitle}>{c.name}</h3>

          {c.location && (
            <div
              style={{
                fontFamily: "var(--font-chakra)",
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.48)",
                marginBottom: "1.25rem",
              }}
            >
              {c.location}
            </div>
          )}

          <p className={styles.programWho} style={{ marginBottom: "1.5rem" }}>
            {c.description}
          </p>

          {c.href && (
            <Link
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontFamily: "var(--font-oswald)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#D92B2B",
                borderBottom: "1px solid #D92B2B",
                paddingBottom: "2px",
              }}
            >
              Visit Site →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
