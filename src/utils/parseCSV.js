// ─────────────────────────────────────────────────────────────
//  utils/parseCSV.js
//  Turns raw CSV text (from Google Sheets) into an array of
//  item objects, coercing types along the way.
// ─────────────────────────────────────────────────────────────

/**
 * Split one CSV line into fields, respecting quoted values.
 * Handles commas inside quotes and escaped double-quotes ("").
 */
function parseLine(line) {
  const fields = [];
  let current = "";
  let inQuote = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];

    if (ch === '"') {
      // Escaped quote inside a quoted field: "" → "
      if (inQuote && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (ch === "," && !inQuote) {
      fields.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }

  fields.push(current.trim());
  return fields;
}

/**
 * Coerce a raw string value to boolean.
 * Accepts: true / yes / 1 / in stock / available / featured
 */
function toBoolean(raw) {
  return ["true", "yes", "1", "in stock", "available", "featured"].includes(
    String(raw).toLowerCase().trim()
  );
}

/**
 * Parse the full CSV text exported from Google Sheets.
 * Returns an array of item objects with typed fields.
 * Rows with an empty Name are silently skipped.
 *
 * Expected headers (case-sensitive):
 *   Sno | CategoryName | Name | Description | InStock | Price | Flag | ImagesPath
 */
export function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);

  // Need at least a header row + one data row
  if (lines.length < 2) return [];

  const headers = parseLine(lines[0]);

  return lines
    .slice(1)
    .map((line) => {
      const values = parseLine(line);
      const raw = {};
      headers.forEach((header, i) => {
        raw[header] = values[i] ?? "";
      });

      // Parse price as a plain number (strip currency symbols / commas)
      const priceNum = parseFloat(String(raw.Price).replace(/[^\d.]/g, ""));

      return {
        Sno:          raw.Sno,
        CategoryName: raw.CategoryName,
        Name:         raw.Name,
        Description:  raw.Description,
        InStock:      toBoolean(raw.InStock),
        Price:        isNaN(priceNum) ? null : priceNum,
        Flag:         toBoolean(raw.Flag),
        ImagesPath:   raw.ImagesPath,
      };
    })
    .filter((item) => item.Name && item.Name.trim() !== "");
}