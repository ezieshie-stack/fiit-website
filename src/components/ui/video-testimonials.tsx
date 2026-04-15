"use client";

/*
 * VideoTestimonials
 *
 * Rebuilds the "We know we make your experience great. But don't take
 * our word for it." section from the old Squarespace FIIT site. 5-up
 * grid of portrait video cards, each opening a modal lightbox when
 * clicked.
 *
 * Data model is intentionally flexible:
 *  - `videoId` (YouTube) or `videoSrc` (direct MP4/webm URL) → drives
 *    the modal embed. If both are null, the card renders in
 *    "Coming Soon" mode (still clickable? no — disabled until content
 *    lands) so the layout is in place even before Arden sends assets.
 *  - `poster` → portrait thumbnail. Falls back to initials.
 *
 * Modal:
 *  - Closes on overlay click, close button, or Escape key.
 *  - Focus-traps nothing fancy — just the close button gets focused on
 *    open so keyboard users can dismiss immediately.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./video-testimonials.module.css";

export type VideoTestimonial = {
  id: string;
  name: string;
  /** Portrait thumbnail (~3:4 ratio). Falls back to initials. */
  poster?: string | null;
  /** YouTube video ID for modal embed (e.g. "dQw4w9WgXcQ"). */
  videoId?: string | null;
  /** Direct video file URL as an alternative to YouTube. */
  videoSrc?: string | null;
};

type VideoTestimonialsProps = {
  badge?: string;
  title?: string;
  subtitle?: string;
  testimonials: VideoTestimonial[];
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

export default function VideoTestimonials({
  badge = "Video Testimonials",
  title = "We Know We Make Your Experience Great. But Don't Take Our Word For It.",
  subtitle = "Our members love the supportive community and transformative results at FIIT Co. Watch their stories and discover how we've helped them achieve their training goals and improve their overall well-being.",
  testimonials,
}: VideoTestimonialsProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = testimonials.find((t) => t.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    // Lock background scroll while modal is open.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  return (
    <section id="video-testimonials" className={styles.section}>
      <div className={styles.header}>
        <div className={styles.badge}>{badge}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.grid}>
        {testimonials.map((t) => {
          const hasVideo = !!t.videoId || !!t.videoSrc;
          return (
            <button
              key={t.id}
              type="button"
              className={styles.card}
              disabled={!hasVideo}
              aria-label={
                hasVideo
                  ? `Play ${t.name}'s video testimonial`
                  : `${t.name}'s video testimonial — coming soon`
              }
              onClick={() => hasVideo && setOpenId(t.id)}
            >
              <div className={styles.thumb}>
                {t.poster ? (
                  <Image
                    src={t.poster}
                    alt={`${t.name} at FIIT Co.`}
                    fill
                    sizes="(max-width: 500px) 50vw, (max-width: 860px) 50vw, (max-width: 1100px) 33vw, 20vw"
                  />
                ) : (
                  <div className={styles.thumbFallback}>{initialsFor(t.name)}</div>
                )}
                <div className={styles.scrim} aria-hidden="true" />
                {hasVideo ? (
                  <div className={styles.play} aria-hidden="true">
                    <div className={styles.playIcon} />
                  </div>
                ) : (
                  <div className={styles.comingSoon}>Coming Soon</div>
                )}
              </div>
              <div className={styles.chip}>Video Testimonial</div>
              <span className={styles.name}>{t.name}</span>
            </button>
          );
        })}
      </div>

      {open && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} video testimonial`}
          onClick={close}
        >
          <div
            className={styles.modalInner}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.modalClose}
              onClick={close}
              aria-label="Close video"
            >
              Close ✕
            </button>
            {open.videoId ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${open.videoId}?autoplay=1&rel=0`}
                title={`${open.name} video testimonial`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : open.videoSrc ? (
              <video src={open.videoSrc} controls autoPlay playsInline />
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
