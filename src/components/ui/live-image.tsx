"use client";

/**
 * LiveImage
 *
 * Image component that pulls its src/alt from Convex `websiteImages` for a
 * named slot, with a static fallback. Used for the hero background and
 * other CMS-editable imagery across the site.
 *
 * Convex overrides are only visible to staff editing in /website-images on
 * the ops portal; customer-facing views see the override once Arden saves
 * it (within a couple of seconds via the Convex subscription).
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import Image, { type ImageProps } from "next/image";

type ConvexWebsiteImage = {
  _id: string;
  slot: string;
  imageUrl?: string | null;
  altText: string;
  active: boolean;
};

type Props = Omit<ImageProps, "src" | "alt"> & {
  slot: string;
  fallbackSrc: string;
  fallbackAlt: string;
};

export default function LiveImage({ slot, fallbackSrc, fallbackAlt, ...rest }: Props) {
  const live = useQuery(anyApi.websiteContent.getWebsiteImageBySlot, { slot }) as
    | ConvexWebsiteImage
    | null
    | undefined;

  const src = live?.imageUrl ?? fallbackSrc;
  const alt = live?.altText || fallbackAlt;

  return <Image src={src} alt={alt} {...rest} />;
}
