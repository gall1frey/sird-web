// ─────────────────────────────────────────────────────────────
//  config.js  —  EDIT THIS FILE TO CONFIGURE YOUR SITE
// ─────────────────────────────────────────────────────────────
//
//  HOW TO GET YOUR SHEET URL
//  1. Open your Google Sheet
//  2. File → Share → Publish to web
//  3. Select your sheet tab
//  4. Change format to "Comma-separated values (.csv)"
//  5. Click Publish → copy the URL → paste it below
//
//  YOUR SHEET MUST HAVE THESE EXACT COLUMN HEADERS (row 1):
//    Sno | CategoryName | Name | Description | InStock | Price | Flag | ImagesPath
//
//  COLUMN NOTES:
//  • InStock    → type TRUE or FALSE
//  • Flag       → type TRUE if featured, FALSE otherwise
//  • Price      → just a number, e.g. 1499  (₹ is added automatically)
//  • ImagesPath → comma-separated image URLs in a single cell
// ─────────────────────────────────────────────────────────────

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQcaqZtxwxYv7PMXeGsdI8US8YHGEWCrKw3pIp91fqA4utoKarAHW27oGcN62JvwDrccvizQ2s-9Xh8/pub?gid=0&single=true&output=csv";

export const SITE_TITLE = "Sirdeshpande's";

export const CURRENCY = "INR";

export const PAGE_ORDER = ["Cotton","Maheshwari","Linen","Chanderi","Ajrak"]