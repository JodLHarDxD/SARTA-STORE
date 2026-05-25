/**
 * SARTA — Shared Utility Functions
 * Pure helpers: formatting, transforms, slugs.
 */

/** Format a number as USD with no cents (e.g. $1,890) */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Slugify a product name for URL-safe paths */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Pad a number with leading zeros (e.g. 3 → "03") */
export function padNumber(n: number, digits = 2): string {
  return String(n).padStart(digits, "0");
}
