// ─────────────────────────────────────────────────────────────
//  components/Card.jsx
//  Single inventory item card shown in the grid.
//  Clicking it opens the Modal.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { getImages, formatPrice } from "../utils/formatters";

const badge = (inStock) => ({
  fontSize: "0.7rem",
  fontWeight: 600,
  padding: "3px 10px",
  borderRadius: 99,
  background: inStock ? "#e6f2eb" : "#fdecea",
  color:      inStock ? "#1f6b3e" : "#b92b2b",
});

/**
 * @param {{ item: object, onClick: ()=>void }} props
 */
export function Card({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const images = getImages(item);
  const firstImage = images[0];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "transform 0.18s, box-shadow 0.18s",
        transform:  hovered ? "translateY(-3px)" : "none",
        boxShadow:  hovered ? "0 8px 32px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Featured badge */}
      {item.Flag && (
        <span style={{
          position: "absolute", top: 10, left: 10, zIndex: 2,
          background: "#c8913a", color: "#fff",
          fontSize: 10, fontWeight: 700,
          padding: "3px 8px", borderRadius: 99,
          letterSpacing: "0.07em", textTransform: "uppercase",
        }}>
          Featured
        </span>
      )}

      {/* Image or placeholder */}
      {firstImage ? (
        <img
          src={firstImage}
          alt={item.Name}
          loading="lazy"
          style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", background: "#f0ede8" }}
        />
      ) : (
        <div style={{ width: "100%", aspectRatio: "4/3", background: "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
          📦
        </div>
      )}

      {/* Text */}
      <div style={{ padding: "0.875rem 1rem" }}>
        <div style={{ fontWeight: 600, fontSize: "0.92rem", marginBottom: 4, lineHeight: 1.3, color: "#1a1410" }}>
          {item.Name}
        </div>

        {item.Price != null && (
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, color: "#2a5c3f", marginBottom: 6 }}>
            {formatPrice(item.Price)}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={badge(item.InStock)}>
            {item.InStock ? "In Stock" : "Out of Stock"}
          </span>
          {item.Sno && (
            <span style={{ fontSize: "0.68rem", color: "#b0a090", fontFamily: "monospace" }}>
              {item.Sno}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}