"use client";

/**
 * Collaborators grid on /community. Pulls partner cards from Convex
 * `listActiveCollaborators`. Cards marked `confirmed: false` render with a
 * "Coming Soon" tag and no link; confirmed cards link to their external
 * site when `href` is set.
 *
 * A short local fallback keeps the section populated if Convex is
 * unreachable or empty, matching the live production content.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../site.module.css";

type Collaborator = {
  _id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  href?: string | null;
  location?: string | null;
  photoUrl?: string | null;
  confirmed: boolean;
  displayOrder: number;
  active: boolean;
};

const FALLBACK: Omit<Collaborator, "_id" | "active">[] = [
  {
    slug: "vatican-gift-shop",
    name: "The Vatican Gift Shop",
    category: "Neighbour",
    description:
      "The independent gift shop on the ground floor at 1047 Gerrard St E — directly below the studio.",
    confirmed: true,
    displayOrder: 1,
  },
  {
    slug: "better-bowls",
    name: "Better Bowls",
    category: "Nutrition",
    description:
      "Caitlyn Bertone's Leslieville spot for nutrient-dense bowls and prepared meals. A lot of our members eat here on training days.",
    confirmed: true,
    displayOrder: 2,
  },
  {
    slug: "local-coffee",
    name: "Local Coffee Roaster",
    category: "Coffee",
    description: "A neighbourhood coffee partner.",
    confirmed: false,
    displayOrder: 3,
  },
  {
    slug: "recovery-wellness",
    name: "Recovery & Wellness Partner",
    category: "Wellness",
    description:
      "A massage / physio / recovery partner offering member discounts.",
    confirmed: false,
    displayOrder: 4,
  },
  {
    slug: "apparel-gear",
    name: "Apparel & Gear",
    category: "Retail",
    description: "A training apparel or boxing gear partner.",
    confirmed: false,
    displayOrder: 5,
  },
  {
    slug: "post-training",
    name: "Post-Training Spot",
    category: "Food",
    description: "A restaurant or market right on the block.",
    confirmed: false,
    displayOrder: 6,
  },
];

export default function CollaboratorsGrid() {
  const live = useQuery(anyApi.websiteContent.listActiveCollaborators) as
    | Collaborator[]
    | undefined;

  const cards =
    live && live.length > 0
      ? [...live].sort((a, b) => a.displayOrder - b.displayOrder)
      : FALLBACK.map((c, i) => ({ ...c, _id: `fallback-${i}`, active: true }));

  return (
    <section className={styles.sectionDark}>
      <div className={styles.container}>
        <div className={styles.label} style={{ marginBottom: "1.25rem" }}>
          Our Collaborators
        </div>
        <h2 className={styles.headlineLg} style={{ marginBottom: "4rem" }}>
          Neighbours<br />On The Block.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {cards.map((c) => {
            const inner = (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-oswald)",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.52)",
                    }}
                  >
                    {c.category}
                  </span>
                  {!c.confirmed && (
                    <span
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.6rem",
                        borderRadius: 2,
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.68)",
                      }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3
                  className={styles.headlineSm}
                  style={{ marginBottom: "0.75rem" }}
                >
                  {c.name}
                </h3>
                <p className={styles.body}>{c.description}</p>
                {c.location && (
                  <p
                    className={styles.bodySm}
                    style={{ marginTop: "1rem", color: "rgba(255,255,255,0.42)" }}
                  >
                    {c.location}
                  </p>
                )}
              </>
            );

            const cardStyle: React.CSSProperties = {
              display: "block",
              padding: "2rem",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 2,
              background: "rgba(255,255,255,0.015)",
              textDecoration: "none",
              color: "inherit",
              opacity: c.confirmed ? 1 : 0.72,
              transition: "border-color 0.15s, background 0.15s",
            };

            if (c.confirmed && c.href) {
              return (
                <a
                  key={c._id}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={cardStyle}
                >
                  {inner}
                </a>
              );
            }
            return (
              <div key={c._id} style={cardStyle}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
