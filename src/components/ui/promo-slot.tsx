"use client";

/**
 * PromoSlot
 *
 * Renders zero or more promotional YouTube embeds attached to a named
 * `slot` (e.g. "home:after-testimonials"). Managed from the staff portal
 * at /website-promo-videos. Empty slots render nothing — the home page
 * calls the component unconditionally; staff can light up or dim a slot
 * without a code change.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import styles from "../../app/site.module.css";

type ConvexPromoVideo = {
  _id: string;
  title: string;
  youtubeId: string;
  pageSlot: string;
  headline?: string;
  subheadline?: string;
  displayOrder: number;
  active: boolean;
};

type Props = {
  slot: string;
};

export default function PromoSlot({ slot }: Props) {
  const videos = useQuery(anyApi.websiteContent.listActivePromoVideosForSlot, { slot }) as
    | ConvexPromoVideo[]
    | undefined;

  if (!videos || videos.length === 0) return null;

  const ordered = [...videos].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className={styles.sectionDark}>
      <div className={styles.container}>
        {ordered.map((v) => (
          <div key={v._id} style={{ marginBottom: "4rem" }}>
            {v.headline && (
              <h2 className={styles.headlineMd} style={{ marginBottom: "0.75rem" }}>
                {v.headline}
              </h2>
            )}
            {v.subheadline && (
              <p className={styles.body} style={{ maxWidth: "60ch", marginBottom: "2rem" }}>
                {v.subheadline}
              </p>
            )}
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${v.youtubeId}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
