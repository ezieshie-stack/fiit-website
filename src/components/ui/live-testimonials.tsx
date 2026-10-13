"use client";

/**
 * LiveTestimonials
 *
 * Wraps <TestimonialsSection/> and feeds it testimonials from Convex.
 * Falls back to the static `fallback` array when Convex has no entries.
 */

import { useQuery } from "convex/react";
import { anyApi } from "convex/server";
import TestimonialsSection, {
  type Testimonial,
} from "./testimonials-section";

type ConvexTestimonial = {
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
  badgeText?: string;
  title?: string;
  subtitle?: string;
  fallback: Testimonial[];
};

export default function LiveTestimonials({ badgeText, title, subtitle, fallback }: Props) {
  const live = useQuery(anyApi.websiteContent.listActiveTestimonials) as
    | ConvexTestimonial[]
    | undefined;

  const testimonials: Testimonial[] =
    live && live.length > 0
      ? live
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((t) => ({
            name: `${t.firstName} ${t.lastInitial}.`,
            role: t.role,
            rating: t.rating,
            text: t.text,
          }))
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
