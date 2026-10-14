"use client";

/**
 * Live-data wrapper for the About page's detailed trainer list.
 *
 * Renders the alternating left/right bio rows, reading from Convex
 * (trainers table, edited via ops tool) and falling back to the static
 * roster if Convex is unreachable.
 *
 * Mirrors the previous hardcoded `.map()` that lived inside about/page.tsx
 * — moved into a client component so the homepage + About page both pull
 * from the same live data source.
 */

import Image from "next/image";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "@/app/site.module.css";
import { FALLBACK_TRAINERS, type Trainer } from "@/app/_data/trainers";

type LiveTrainer = {
  _id: string;
  slug: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  fullBio: string[];
  tags: string[];
  photoUrl?: string;
  displayOrder: number;
  active: boolean;
};

function toTrainer(live: LiveTrainer): Trainer {
  return {
    id: live.slug,
    name: live.name,
    role: live.role,
    bio: live.bio,
    img: live.photoUrl ?? null,
    href: `/about#trainer-${live.slug}`,
    tags: live.tags,
    fullBio: live.fullBio,
    category: (live.category === "academy" ? "academy" : "fiit") as
      | "fiit"
      | "academy",
  };
}

function renderTrainerRow(t: Trainer, i: number) {
  const paragraphs =
    t.fullBio && t.fullBio.length > 0 ? t.fullBio : t.bio ? [t.bio] : [];
  // Alternate left/right layout so the page has rhythm, restart within
  // each section (FIIT trainers / Academy) for a clean visual cadence.
  const reversed = i % 2 === 1;
  return (
    <article
      key={t.id}
      id={`trainer-${t.id}`}
      className={`${styles.trainerRow} ${
        reversed ? styles.trainerRowReversed : ""
      }`}
    >
      <div className={styles.trainerPortrait}>
        {t.img ? (
          <Image
            src={t.img}
            alt={t.name}
            fill
            sizes="(max-width: 860px) 100vw, 40vw"
            style={{ objectFit: "cover" }}
            unoptimized={t.img.startsWith("http")}
          />
        ) : (
          <div className={styles.trainerPortraitFallback}>
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
      </div>
      <div className={styles.trainerContent}>
        <div className={styles.trainerRoleLabel}>{t.role}</div>
        <h3 className={styles.trainerNameBig}>{t.name}</h3>
        {t.tags && t.tags.length > 0 && (
          <div className={styles.trainerTagRow}>
            {t.tags.map((tag) => (
              <span key={tag} className={styles.trainerTagChip}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.trainerParagraphs}>
          {paragraphs.map((para, idx) => (
            <p key={idx} className={styles.body}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function LiveTrainerList() {
  const live = useQuery(anyApi.websiteContent.listActiveTrainers) as
    | LiveTrainer[]
    | undefined;

  const hasLive = Array.isArray(live) && live.length > 0;
  const roster: Trainer[] = hasLive
    ? live!.map(toTrainer)
    : FALLBACK_TRAINERS;

  const fiitTrainers = roster.filter((t) => (t.category ?? "fiit") === "fiit");
  const academyTrainers = roster.filter((t) => t.category === "academy");

  return (
    <>
      {/* FIIT Co. trainers */}
      {fiitTrainers.length > 0 && (
        <div className={styles.trainerList}>
          {fiitTrainers.map(renderTrainerRow)}
        </div>
      )}

      {/* FIIT Boxing Academy — separate program, its own header + coach */}
      {academyTrainers.length > 0 && (
        <>
          <div style={{ marginTop: "5rem", marginBottom: "2rem" }}>
            <div className={styles.label}>FIIT Boxing Academy</div>
            <h3
              className={styles.headlineMd}
              style={{ marginTop: "1rem" }}
            >
              Academy Head Coach.
            </h3>
          </div>
          <div className={styles.trainerList}>
            {academyTrainers.map(renderTrainerRow)}
          </div>
        </>
      )}
    </>
  );
}
