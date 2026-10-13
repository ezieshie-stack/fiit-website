"use client";

/**
 * LiveTeamShowcase
 *
 * Wraps <TeamShowcase/> and feeds it trainers from Convex when available.
 * Falls back to the static `fallback` array so SSR/SEO always render real
 * content even if Convex is slow or empty.
 *
 * `category` filters Convex trainers — "fiit" for the main homepage team,
 * "academy" for the Boxing Academy head coach card.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import TeamShowcase, { type TeamMember } from "./team-showcase";

type ConvexTrainer = {
  _id: string;
  slug: string;
  name: string;
  role: string;
  category: string;
  bio: string;
  photoUrl?: string | null;
  displayOrder: number;
  active: boolean;
};

type Props = {
  badge?: string;
  title?: string;
  category: "fiit" | "academy";
  fallback: TeamMember[];
};

export default function LiveTeamShowcase({ badge, title, category, fallback }: Props) {
  const live = useQuery(anyApi.websiteContent.listActiveTrainers) as
    | ConvexTrainer[]
    | undefined;

  const members: TeamMember[] =
    live && live.length > 0
      ? live
          .filter((t) => t.category === category)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((t) => ({
            id: t.slug,
            name: t.name,
            role: t.role,
            bio: t.bio,
            img: t.photoUrl ?? null,
            href: `/about#${t.slug}`,
          }))
      : fallback;

  if (members.length === 0) return null;

  return <TeamShowcase badge={badge} title={title} members={members} />;
}
