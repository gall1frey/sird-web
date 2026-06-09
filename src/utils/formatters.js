// ─────────────────────────────────────────────────────────────
//  utils/formatters.js
//  Small pure functions used across multiple components.
// ─────────────────────────────────────────────────────────────

import { CURRENCY } from "../config";

/**
 * Split an ImagesPath string into an array of trimmed URLs.
 * Returns [] if the field is empty or missing.
 *
 * Example:
 *   "https://a.com/1.jpg, https://a.com/2.jpg"
 *   → ["https://a.com/1.jpg", "https://a.com/2.jpg"]
 */
export function getImages(item) {
  if (!item?.ImagesPath) return [];
  return item.ImagesPath.split(",").map((url) => url.trim()).filter(Boolean);
}

/**
 * Format a numeric price using the currency set in config.js.
 * Returns null if the value is null/empty (so the caller can
 * choose to render nothing).
 *
 * Example (CURRENCY = "INR"):  4999 → "₹4,999"
 * Example (CURRENCY = "USD"):  4999 → "$4,999"
 */
export function formatPrice(value) {
  if (value == null) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(value);
}