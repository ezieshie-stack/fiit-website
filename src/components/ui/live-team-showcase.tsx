"use client";

/**
 * Live-data wrapper for TeamShowcase. Reads trainers from Convex and
 * falls back to the static roster in _data/trainers.ts if Convex is
 * unreachable or returns an empty list.
 *
 * Data source: Fiitco-Operation Convex deployment, `trainers` table,
 * edited by Arden's team via the ops tool's Website Trainers admin page.
 *
 * Filtering: pass `category="fiit"` or `category="academy"` to slice the
 * roster into the two sections used on the homepage (FIIT group trainers
 * vs the Boxing Academy coach).
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import TeamShowcase from "./team-showcase";
import {
  FALLBACK_TRAINERS,
  type Trainer,
} from "@/app/_data/trainers";

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

/**
 * Normalize a live Convex trainer record into the TeamMember/Trainer shape
 * that TeamShowcase expects. Convex field names → website-component names.
 */
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

type Props = {
  badge: string;
  title: string;
  category?: "fiit" | "academy";
};

export default function LiveTeamShowcase({ badge, title, category }: Props) {
  const live = useQuery(anyApi.websiteContent.listActiveTrainers) as
    | LiveTrainer[]
    | undefined;

  // Source of truth decision:
  //   - undefined (loading) or empty  → fall back to static roster
  //   - populated                      → use live data
  // Either way the user never sees an empty team section.
  const hasLive = Array.isArray(live) && live.length > 0;
  const roster: Trainer[] = hasLive
    ? live!.map(toTrainer)
    : FALLBACK_TRAINERS;

  const members = category
    ? roster.filter((t) => (t.category ?? "fiit") === category)
    : roster;

  // If the category filter leaves zero results (e.g. no Academy coach yet),
  // hide the section entirely rather than show an awkward empty showcase.
  if (members.length === 0) return null;

  return <TeamShowcase badge={badge} title={title} members={members} />;
}
