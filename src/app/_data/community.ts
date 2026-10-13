/**
 * Community collaborators - local businesses FIIT Co. partners with in the
 * Leslieville neighbourhood.
 *
 * This is the single source of truth for /community. Swap the placeholder
 * entries with Arden's real collaborator list when it arrives - the page
 * and nav link need no further changes.
 *
 * When updating:
 *   - `confirmed: true`  → known partner, shown normally
 *   - `confirmed: false` → placeholder card with a subtle "Coming soon" tag
 *   - Leave `href` as `null` if a business doesn't have a website (rare)
 */

export type Collaborator = {
  id: string;
  name: string;
  category: string;
  description: string;
  /** External URL; null means no website listed. */
  href: string | null;
  /** Street address or cross-streets - shown small under the name. */
  location?: string;
  /**
   * When false, the card renders with a muted "Coming soon" tag so we can
   * ship the page before Arden's full collaborator list is finalized.
   */
  confirmed: boolean;
};

export const COLLABORATORS: Collaborator[] = [
  // ─── Confirmed neighbours already referenced elsewhere on the site ───────
  {
    id: "vatican-gift-shop",
    name: "The Vatican Gift Shop",
    category: "Neighbour",
    description:
      "The storefront below the studio. Independent gift shop at the corner of Gerrard and Jones - impossible to miss on your way up to class.",
    href: null,
    location: "1047 Gerrard St E (ground floor)",
    confirmed: true,
  },
  {
    id: "better-bowls",
    name: "Better Bowls",
    category: "Nutrition",
    description:
      "Run by Caitlyn Bertone - nutrient-dense bowls and prepared meals built around real ingredients. Feeds a lot of FIIT Co. members on training days.",
    href: null,
    location: "Leslieville · Toronto",
    confirmed: true,
  },

  // ─── Placeholders - replace these with Arden's real list ─────────────────
  {
    id: "placeholder-coffee",
    name: "Local Coffee Roaster",
    category: "Coffee",
    description:
      "Neighbourhood coffee stop - post-training espresso, pre-training cold brew. [placeholder - Arden to confirm partner name.]",
    href: null,
    confirmed: false,
  },
  {
    id: "placeholder-wellness",
    name: "Recovery & Wellness Partner",
    category: "Wellness",
    description:
      "Massage, physio, or recovery studio member discount partner. [placeholder - Arden to confirm.]",
    href: null,
    confirmed: false,
  },
  {
    id: "placeholder-retail",
    name: "Apparel & Gear",
    category: "Retail",
    description:
      "Training apparel or boxing gear neighbour that FIIT Co. members cross-shop. [placeholder - Arden to confirm.]",
    href: null,
    confirmed: false,
  },
  {
    id: "placeholder-food",
    name: "Post-Training Spot",
    category: "Food",
    description:
      "Restaurant or market where the FIIT crew refuels after class. [placeholder - Arden to confirm.]",
    href: null,
    confirmed: false,
  },
];
