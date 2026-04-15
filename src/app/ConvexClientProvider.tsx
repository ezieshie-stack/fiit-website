"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Points at the FIIT Co Class Management Tool Convex deployment.
// Referral + guest pass submissions from the website land in the same DB the
// front desk reads from, so staff see them in real time.
const CONVEX_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL ?? "https://dutiful-ferret-681.convex.cloud";

const convex = new ConvexReactClient(CONVEX_URL);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
