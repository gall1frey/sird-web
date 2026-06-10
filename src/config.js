// ─────────────────────────────────────────────────────────────
//  config.js
//  Secrets (SHEET_CSV_URL, WHATSAPP_NUMBER) are injected at
//  build time from GitHub Secrets via Vite env vars.
//  Set them in: repo Settings → Secrets → Actions
//    VITE_SHEET_CSV_URL   — Google Sheet CSV publish URL
//    VITE_WHATSAPP_NUMBER — WhatsApp number in international
//                          format, no spaces or +, e.g. 919876543210
// ─────────────────────────────────────────────────────────────

export const SHEET_CSV_URL = import.meta.env.VITE_SHEET_CSV_URL;

// Set via VITE_WHATSAPP_NUMBER in GitHub Secrets, or hardcode below for local dev.
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "0000000000";

// Shown in the modal for any out-of-stock item, replacing the normal description.
// Use the placeholder {{whatsapp}} where you want the clickable "here" link to appear.
export const OUT_OF_STOCK_MESSAGE =
  "We're sorry this is out of stock right now, but contact us {{whatsapp}} to know when it'll be back!";

export const SITE_TITLE = "Sirdeshpande's";

export const CURRENCY = "INR";

export const SECTION_ORDER = [{
                                title: "Welcome to Sirdeshpande's",
                                text: "Write a couple lines to start off"
                            },{
                                title: "Catalogue",
                            },{
                                title: "Contact",
                                text: "Insert Contact text here"
                            },{
                                title: "About Us",
                                text: "Insert About Us text here"
                            }];
// TODO: Testimonials
export const PAGE_ORDER = ["Cotton","Maheshwari","Linen","Chanderi","Ajrak"];
