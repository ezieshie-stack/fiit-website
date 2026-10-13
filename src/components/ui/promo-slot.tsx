"use client";

/**
 * Renders all active promo videos placed into a named slot via the ops
 * tool's Website Promo Videos admin.
 *
 * Usage: <PromoSlot name="home:after-testimonials" />
 *
 * Behaviour:
 *   - Queries Convex for active videos in this slot, ordered by displayOrder
 *   - Renders one <PromoVideo/> per record (they stack vertically)
 *   - Zero videos in the slot → renders nothing (no empty layout hole)
 *   - Convex unreachable → also renders nothing gracefully
 *
 * Slot naming convention: "<page>:<position>" — must match the values
 * defined in the ops admin's SLOT_OPTIONS so Arden sees a matching label.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import PromoVideo from "./promo-video";

type LivePromo = {
  _id: string;
  title: string;
  youtubeId: string;
  pageSlot: string;
  headline?: string;
  subheadline?: string;
  displayOrder: number;
  active: boolean;
};

export default function PromoSlot({ name }: { name: string }) {
  const videos = useQuery(anyApi.websiteContent.listActivePromoVideosForSlot, {
    pageSlot: name,
  }) as LivePromo[] | undefined;

  if (!Array.isArray(videos) || videos.length === 0) return null;

  return (
    <>
      {videos.map((v) => (
        <PromoVideo
          key={v._id}
          youtubeId={v.youtubeId}
          headline={v.headline}
          subheadline={v.subheadline}
        />
      ))}
    </>
  );
}
