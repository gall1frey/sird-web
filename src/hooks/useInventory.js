// ─────────────────────────────────────────────────────────────
//  hooks/useInventory.js
//  Fetches the Google Sheet CSV and returns parsed items
//  along with loading / error state.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { SHEET_CSV_URL } from "../config";
import { parseCSV } from "../utils/parseCSV";

/**
 * @returns {{ items: object[], loading: boolean, error: string|null }}
 */
export function useInventory() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Guard: URL not yet configured
    if (!SHEET_CSV_URL || SHEET_CSV_URL === "YOUR_GOOGLE_SHEET_CSV_URL_HERE") {
      setError(
        "No Google Sheet URL configured. " +
        "Open src/config.js and paste your CSV URL into SHEET_CSV_URL."
      );
      setLoading(false);
      return;
    }

    fetch(SHEET_CSV_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status} — make sure the sheet is published publicly as CSV.`
          );
        }
        return response.text();
      })
      .then((text) => {
        setItems(parseCSV(text));
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load inventory: " + err.message);
        setLoading(false);
      });
  }, []); // runs once on mount

  return { items, loading, error };
}