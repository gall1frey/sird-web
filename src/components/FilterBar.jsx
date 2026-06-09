// ─────────────────────────────────────────────────────────────
//  components/FilterBar.jsx
//  Pill buttons for filtering by category and stock status.
// ─────────────────────────────────────────────────────────────

const STOCK_OPTIONS = ["All", "In Stock", "Out of Stock"];

function Pill({ label, active, onClick, activeColor = "#1a1410" }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 14px",
        borderRadius: 99,
        fontSize: "0.8rem",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "all 0.15s",
        fontWeight: active ? 600 : 400,
        background: active ? activeColor : "transparent",
        color: active ? "#fff" : "#5a4a3a",
        border: active ? `1px solid ${activeColor}` : "1px solid rgba(0,0,0,0.15)",
      }}
    >
      {label}
    </button>
  );
}

/**
 * @param {{
 *   categories:   string[],
 *   catFilter:    string,
 *   onCatFilter:  (v:string)=>void,
 *   stockFilter:  string,
 *   onStockFilter:(v:string)=>void,
 * }} props
 */
export function FilterBar({ categories, catFilter, onCatFilter, stockFilter, onStockFilter }) {
  return (
    <div style={{
      background: "#fff",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      padding: "0.75rem 2rem",
      display: "flex",
      gap: "0.5rem",
      flexWrap: "wrap",
      alignItems: "center",
    }}>
      {/* Category pills */}
      <span style={{ fontSize: "0.78rem", color: "#a09080", marginRight: 4, fontWeight: 500 }}>
        Category
      </span>
      {categories.map((cat) => (
        <Pill
          key={cat}
          label={cat}
          active={catFilter === cat}
          onClick={() => onCatFilter(cat)}
          activeColor="#1a1410"
        />
      ))}

      {/* Divider */}
      <div style={{ width: 1, height: 20, background: "rgba(0,0,0,0.1)", margin: "0 4px" }} />

      {/* Stock pills */}
      {STOCK_OPTIONS.map((s) => (
        <Pill
          key={s}
          label={s}
          active={stockFilter === s}
          onClick={() => onStockFilter(s)}
          activeColor="#2a5c3f"
        />
      ))}
    </div>
  );
}