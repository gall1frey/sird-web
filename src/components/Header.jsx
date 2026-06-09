// ─────────────────────────────────────────────────────────────
//  components/Header.jsx
//  Dark top bar: site title, item counts, search input.
// ─────────────────────────────────────────────────────────────

import { SITE_TITLE } from "../config";

const SearchIcon = () => (
  <svg
    width={15} height={15} viewBox="0 0 24 24"
    fill="none" stroke="#a09080" strokeWidth={2}
    style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
  >
    <circle cx={11} cy={11} r={8} />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

/**
 * @param {{ items: object[], search: string, onSearch: (v:string)=>void }} props
 */
export function Header({ items, search, onSearch }) {
  const totalInStock  = items.filter((i) => i.InStock).length;
  const featuredCount = items.filter((i) => i.Flag).length;

  return (
    <header style={{
      background: "#1a1410",
      color: "#f5f1ec",
      padding: "1.5rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      {/* Left: title + counts */}
      <div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.75rem",
          fontWeight: 700,
          letterSpacing: "-0.01em",
        }}>
          {SITE_TITLE}
        </h1>
        <p style={{ fontSize: "0.8rem", color: "#a09080", marginTop: 2 }}>
          {items.length} items · {totalInStock} in stock · {featuredCount} featured
        </p>
      </div>

      {/* Right: search */}
      <div style={{ position: "relative", minWidth: 220 }}>
        <SearchIcon />
        <input
          type="search"
          placeholder="Search by name, description, serial…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            fontFamily: "inherit",
            fontSize: "0.875rem",
            color: "#f5f1ec",
            outline: "none",
            width: "100%",
          }}
        />
      </div>
    </header>
  );
}