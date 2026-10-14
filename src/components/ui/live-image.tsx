"use client";

/**
 * LiveImage — renders an image for a named slot, reading the URL + alt
 * text from Convex (edited via ops tool's Website Images admin). Falls
 * back to the fallbackSrc/fallbackAlt props if Convex is unreachable or
 * the slot doesn't exist yet, so the page never renders broken.
 *
 * Usage:
 *   <LiveImage
 *     slot="home-hero"
 *     fallbackSrc="/hero/home.webp"
 *     fallbackAlt="FIIT Co. boxing studio training floor…"
 *     fill
 *     priority
 *     sizes="100vw"
 *     style={{ objectFit: "cover" }}
 *   />
 *
 * All additional props are forwarded to Next.js <Image/>. We pass
 * `unoptimized` automatically for absolute URLs (Convex storage, etc.)
 * since Next's image optimizer doesn't process external hosts without
 * config.
 */

import Image, { type ImageProps } from "next/image";
import { useQuery } from "convex/react";
import { anyApi } from "convex/server";

type LiveImageRecord = {
  _id: string;
  slot: string;
  imageUrl?: string;
  altText: string;
  active: boolean;
};

type Props = Omit<ImageProps, "src" | "alt"> & {
  slot: string;
  fallbackSrc: string;
  fallbackAlt: string;
};

export default function LiveImage({ slot, fallbackSrc, fallbackAlt, ...imageProps }: Props) {
  const live = useQuery(anyApi.websiteContent.getWebsiteImageBySlot, { slot }) as
    | LiveImageRecord
    | null
    | undefined;

  // Loading (undefined) or missing (null) → use the hardcoded fallback.
  // This also covers the moment after seed when Convex hasn't populated yet.
  const src = live?.imageUrl ?? fallbackSrc;
  const alt = live?.altText ?? fallbackAlt;

  const isAbsolute = src.startsWith("http://") || src.startsWith("https://");

  return <Image {...imageProps} src={src} alt={alt} unoptimized={isAbsolute} />;
}
