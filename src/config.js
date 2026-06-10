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

export const SITE_TITLE = "Sirdeshpande's";

export const CURRENCY = "INR";

export const SECTION_ORDER = [{
                                title: "Catalogue",
                                text: "abc"
                            },{
                                title: "Welcome to Sirdeshpande's"
                            },{
                                title: "Contact",
                                text: "Insert Contact text here"
                            },{
                                title: "About Us",
                                text: "Insert About Us text here"
                            }];
// TODO: Testimonials
export const PAGE_ORDER = ["Cotton","Maheshwari","Linen","Chanderi","Ajrak"];
