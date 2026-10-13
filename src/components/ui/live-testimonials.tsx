"use client";

/**
 * Live-data wrapper for the homepage "Members Talk" testimonials.
 * Reads from Convex (edited via ops tool's Website Testimonials admin)
 * with a static fallback to the hardcoded list in page.tsx.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import TestimonialsSection, {
  type Testimonial,
} from "./testimonials-section";

type LiveTestimonial = {
  _id: string;
  firstName: string;
  lastInitial: string;
  role?: string;
  rating: number;
  text: string;
  displayOrder: number;
  active: boolean;
};

type Props = {
  badgeText: string;
  title: string;
  subtitle: string;
  fallback: Testimonial[];
};

function toTestimonial(live: LiveTestimonial): Testimonial {
  return {
    name: `${live.firstName} ${live.lastInitial}.`,
    role: live.role ?? "",
    rating: live.rating,
    text: live.text,
  };
}

export default function LiveTestimonials({ badgeText, title, subtitle, fallback }: Props) {
  const live = useQuery(anyApi.websiteContent.listActiveTestimonials) as
    | LiveTestimonial[]
    | undefined;

  const hasLive = Array.isArray(live) && live.length > 0;
  const testimonials: Testimonial[] = hasLive
    ? live!.map(toTestimonial)
    : fallback;

  return (
    <TestimonialsSection
      badgeText={badgeText}
      title={title}
      subtitle={subtitle}
      testimonials={testimonials}
    />
  );
}
