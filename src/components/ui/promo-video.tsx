"use client";

/**
 * Single promo video embed — scroll-into-view autoplay, silent loop.
 *
 * Behaviour:
 *   1. Video auto-plays (muted) when 50%+ of the section is visible.
 *   2. Pauses when scrolled past (saves bandwidth, stops the looping render).
 *   3. Loops while in view.
 *   4. No mute/unmute control — source is treated as silent.
 *
 * Rendered by <PromoSlot/> once per promo-video record in a named slot.
 * The `id` prop must be unique per instance so YouTube's IFrame API can
 * mount a separate player for each.
 */

import { useEffect, useRef, useState, useId } from "react";
import styles from "./promo-video.module.css";

// Minimal ambient types for the YouTube IFrame Player API.
type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        config: Record<string, unknown>
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Props = {
  /** YouTube video ID (extracted from any youtu.be / youtube.com URL). */
  youtubeId: string;
  /** Heading above the video. Leave undefined to hide the header. Supports \n. */
  headline?: string;
  /** Short tagline under the heading. */
  subheadline?: string;
};

export default function PromoVideo({ youtubeId, headline, subheadline }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [inView, setInView] = useState(false);

  // Each instance needs a unique DOM id so YouTube can mount separate
  // iframes when multiple promo videos stack on a single page.
  const reactId = useId().replace(/:/g, "-");
  const mountId = `fiit-promo-yt-${reactId}`;

  // ── Load the YouTube IFrame API + mount the player ───────────────────
  useEffect(() => {
    let cancelled = false;

    const createPlayer = () => {
      if (cancelled || !window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player(mountId, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          loop: 1,
          playlist: youtubeId,
          disablekb: 1,
          iv_load_policy: 3,
          fs: 0,
        },
        events: {
          onReady: () => { if (!cancelled) setPlayerReady(true); },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existing) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        createPlayer();
      };
    }

    return () => {
      cancelled = true;
      try { playerRef.current?.destroy(); } catch {}
      playerRef.current = null;
    };
  }, [mountId, youtubeId]);

  // ── Scroll-based play/pause ──────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playerReady || !playerRef.current) return;
    try {
      if (inView) playerRef.current.playVideo();
      else playerRef.current.pauseVideo();
    } catch {}
  }, [inView, playerReady]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        {headline && (
          <>
            <div className={styles.label}>Watch</div>
            <h2 className={styles.headline}>
              {headline.split("\n").map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </>
        )}
        {subheadline && <p className={styles.sub}>{subheadline}</p>}

        <div className={styles.videoFrame}>
          <div id={mountId} className={styles.videoIframe} />
        </div>
      </div>
    </section>
  );
}
