// Minimal cn helper — joins class names and filters falsy values.
// The reapollo map component was authored against shadcn's cn() which wraps
// clsx + tailwind-merge. This site is CSS-Modules, not Tailwind, so there's
// nothing to "merge"; we just need a resilient joiner.
type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean | null | undefined>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      for (const [key, enabled] of Object.entries(value)) {
        if (enabled) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}
