// ─────────────────────────────────────────────────────────────
//  Catalogue.jsx  —  root component
//
//  Responsibilities (only):
//    1. Fetch data via useInventory hook
//    2. Hold filter / search / selection state
//    3. Derive filtered + grouped items
//    4. Render layout: Header → FilterBar → grid sections → Modal
//
//  All visual details live in the components/ folder.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { useInventory }  from "./hooks/useInventory";

// ── Loading screen ───────────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#f5f1ec", gap: "1rem",
    }}>
      <div style={{
        width: 36, height: 36,
        border: "3px solid #d0c8bc", borderTopColor: "#2a5c3f",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#a09080", fontSize: "0.9rem" }}>
        Loading inventory…
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Error screen ─────────────────────────────────────────────
function ErrorScreen({ message }) {
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#f5f1ec", padding: "2rem", textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.4rem", fontStyle: "italic",
        color: "#1a1410", marginBottom: "0.5rem",
      }}>
        Could not load inventory
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#a09080", fontSize: "0.875rem", maxWidth: 480 }}>
        {message}
      </p>
    </div>
  );
}

// ── Empty state ──────────────────────────────────────────────
function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem", color: "#a09080" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
        Nothing found
      </div>
      <p style={{ fontSize: "0.9rem" }}>Try a different search or filter.</p>
    </div>
  );
}

// ── Global styles (injected once) ────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #f5f1ec; color: #1a1410; min-height: 100vh; }
    input[type=search]::-webkit-search-cancel-button { display: none; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #d0c8bc; border-radius: 3px; }
    button:focus-visible { outline: 2px solid #2a5c3f; outline-offset: 2px; }
  `}</style>
);

// ── Root component ───────────────────────────────────────────
export default function Catalogue() {
  const { items, loading, error } = useInventory();

  const [search,      setSearch]      = useState("");
  const [catFilter,   setCatFilter]   = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [selected,    setSelected]    = useState(null);

  // Early returns for loading / error states
  if (loading) return <><GlobalStyles /><LoadingScreen /></>;
  if (error)   return <><GlobalStyles /><ErrorScreen message={error} /></>;

  // ── Derived data ─────────────────────────────────────────
  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.CategoryName).filter(Boolean))).sort(),
  ];

  const filtered = items.filter((item) => {
    const matchCategory = catFilter === "All" || item.CategoryName === catFilter;
    const matchStock    =
      stockFilter === "All"          ? true :
      stockFilter === "In Stock"     ? item.InStock :
      /* Out of Stock */               !item.InStock;
    const q = search.toLowerCase();
    const matchSearch   = !q
      || item.Name?.toLowerCase().includes(q)
      || item.Description?.toLowerCase().includes(q)
      || String(item.Sno ?? "").toLowerCase().includes(q);

    return matchCategory && matchStock && matchSearch;
  });

  // Group filtered items by category, preserving sort order
  const grouped = filtered.reduce((acc, item) => {
    const cat = item.CategoryName || "Uncategorised";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // ── Render ───────────────────────────────────────────────
  return (
    <>
      <GlobalStyles />

      <Header
        items={items}
        search={search}
        onSearch={setSearch}
      />

      <FilterBar
        categories={categories}
        catFilter={catFilter}
        onCatFilter={setCatFilter}
        stockFilter={stockFilter}
        onStockFilter={setStockFilter}
      />

      <main style={{ padding: "1.5rem 2rem 4rem" }}>
        {Object.keys(grouped).length === 0 ? (
          <EmptyState />
        ) : (
          Object.keys(grouped).sort().map((cat) => (
            <section key={cat} style={{ marginBottom: "2.5rem" }}>
              {/* Category heading */}
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.15rem", fontWeight: 600, fontStyle: "italic",
                color: "#7a6a56",
                marginBottom: "1rem", paddingBottom: "0.5rem",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                {cat}
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontStyle: "normal", fontSize: "0.72rem",
                  background: "#f0ede8", color: "#a09080",
                  padding: "2px 8px", borderRadius: 99,
                }}>
                  {grouped[cat].length}
                </span>
              </h2>

              {/* Item grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1rem",
              }}>
                {grouped[cat].map((item, i) => (
                  <Card
                    key={item.Sno || item.Name + i}
                    item={item}
                    onClick={() => setSelected(item)}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Item detail modal */}
      {selected && (
        <Modal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}