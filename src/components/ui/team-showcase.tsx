"use client";

/*
 * TeamShowcase
 *
 * Visual adaptation of the makviesainte/team-showcase component from 21st.dev
 * (https://21st.dev/community/components/makviesainte/team-showcase/default),
 * reimplemented in CSS Modules for the FIIT Co. dark brand.
 *
 * Interaction:
 * - Hovering any photo OR any name row lights that trainer up across both
 *   the photo grid and the name list (photo un-grayscales + vibrance-boosts,
 *   name turns white, pill marker widens + turns red, socials slide in,
 *   bio expands).
 * - Everyone else dims. This is the core "interlocked" effect from the
 *   original 21st.dev component.
 * - When a member has `href`, both the photo card AND the name row become
 *   clickable links (used on the homepage to route to /about#trainer-id
 *   for the full bio section).
 *
 * Data model deliberately extends the original:
 * - `img` can be a Next-style asset path ("/trainers/jason.webp") OR null.
 *   Null renders an initials fallback so we never ship a broken image.
 * - `bio` is optional and reveals on hover (original only had role).
 * - `social` supports Instagram + Twitter + LinkedIn + Behance.
 * - `href` is optional — when set, the whole card becomes a Next <Link>.
 *
 * Must be a client component because of the hover state machine.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaTwitter, FaBehance } from "react-icons/fa";
import styles from "./team-showcase.module.css";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  /** Next/Image source path. If null/undefined, renders initials fallback. */
  img?: string | null;
  /** Optional route — makes the whole card clickable. Usually "/about#trainer-id". */
  href?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    behance?: string;
  };
};

type TeamShowcaseProps = {
  badge?: string;
  title?: string;
  members: TeamMember[];
};

function initialsFor(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

// Size preset cycles per column: col1 uses sizeA, col2 uses sizeB (the
// largest), col3 uses sizeC. Matches the varying-sizes look in the original.
const SIZE_BY_COL = [styles.sizeA, styles.sizeB, styles.sizeC];
const COL_CLASSNAMES = [styles.col1, styles.col2, styles.col3];

export default function TeamShowcase({
  badge = "The Team",
  title = "Coaches Who Coach For Real.",
  members,
}: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Round-robin distribute members into 3 columns so any count (3/4/6/9)
  // stays balanced. cols[0][i], cols[1][i], cols[2][i] walk in order.
  const cols: TeamMember[][] = [[], [], []];
  members.forEach((m, i) => cols[i % 3].push(m));

  return (
    <section id="team" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>{badge}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.shell}>
        {/* ── Left: 3-column staggered photo grid ── */}
        <div className={styles.photoGrid}>
          {cols.map((colMembers, colIdx) => (
            <div
              key={colIdx}
              className={`${styles.col} ${COL_CLASSNAMES[colIdx]}`}
            >
              {colMembers.map((member) => (
                <PhotoCard
                  key={member.id}
                  member={member}
                  sizeClass={SIZE_BY_COL[colIdx]}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ── Right: name list ── */}
        <div className={styles.list}>
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function PhotoCard({
  member,
  sizeClass,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  sizeClass: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  const cardClass = [
    styles.photoCard,
    sizeClass,
    isActive ? styles.photoCardActive : "",
    isDimmed ? styles.photoCardDimmed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const inner = member.img ? (
    <Image
      src={member.img}
      alt={member.name}
      width={200}
      height={240}
      className={styles.photoImg}
      sizes="(max-width: 860px) 140px, 180px"
    />
  ) : (
    <div className={styles.fallback}>{initialsFor(member.name)}</div>
  );

  // Shared handlers so both the <Link> and <div> variants feel identical.
  const sharedProps = {
    className: cardClass,
    onMouseEnter: () => onHover(member.id),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(member.id),
    onBlur: () => onHover(null),
  };

  if (member.href) {
    return (
      <Link
        href={member.href}
        aria-label={`${member.name}, ${member.role} — read bio`}
        {...sharedProps}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${member.name}, ${member.role}`}
      tabIndex={0}
      {...sharedProps}
    >
      {inner}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  const hasSocial =
    !!member.social?.instagram ||
    !!member.social?.linkedin ||
    !!member.social?.twitter ||
    !!member.social?.behance;

  const rowClass = `${styles.row} ${isDimmed ? styles.rowDimmed : ""}`;
  const rowHoverProps = {
    onMouseEnter: () => onHover(member.id),
    onMouseLeave: () => onHover(null),
  };

  // When the member has a href, the whole name row (name + role + bio)
  // becomes a Next link. Social icons stop propagation so clicking them
  // still opens the social profile instead of following the row link.
  const rowInner = (
    <>
      <div className={styles.nameLine}>
        <span
          className={`${styles.pill} ${isActive ? styles.pillActive : ""}`}
          aria-hidden="true"
        />
        <span className={`${styles.name} ${isActive ? styles.nameActive : ""}`}>
          {member.name}
        </span>

        {hasSocial && (
          <div
            className={`${styles.socials} ${
              isActive ? styles.socialsActive : ""
            }`}
          >
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={`${member.name} on Instagram`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaInstagram size={12} />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={`${member.name} on LinkedIn`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaLinkedinIn size={12} />
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={`${member.name} on X / Twitter`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaTwitter size={12} />
              </a>
            )}
            {member.social?.behance && (
              <a
                href={member.social.behance}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={`${member.name} on Behance`}
                onClick={(e) => e.stopPropagation()}
              >
                <FaBehance size={12} />
              </a>
            )}
          </div>
        )}
      </div>

      <p className={styles.role}>{member.role}</p>

      {member.bio && (
        <p className={`${styles.bio} ${isActive ? styles.bioActive : ""}`}>
          {member.bio}
        </p>
      )}
    </>
  );

  if (member.href) {
    return (
      <Link href={member.href} className={rowClass} {...rowHoverProps}>
        {rowInner}
      </Link>
    );
  }

  return (
    <div className={rowClass} {...rowHoverProps}>
      {rowInner}
    </div>
  );
}
