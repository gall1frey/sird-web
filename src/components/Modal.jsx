// ─────────────────────────────────────────────────────────────
//  components/Modal.jsx
//  Full-screen overlay showing item details + image carousel.
//  Close by clicking the backdrop, the ✕ button, or pressing Escape.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { getImages, formatPrice } from "../utils/formatters";

// ── Carousel nav button (prev / next) ────────────────────────
function NavButton({ side, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      style={{
        position: "absolute",
        top: "50%", transform: "translateY(-50%)",
        [side === "left" ? "left" : "right"]: 12,
        width: 36, height: 36,
        borderRadius: "50%", border: "none",
        background: "rgba(255,255,255,0.88)",
        cursor: "pointer",
        fontSize: "1.3rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#333",
      }}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}

// ── Dot indicators ───────────────────────────────────────────
function Dots({ count, current, onSelect }) {
  return (
    <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Image ${i + 1}`}
          style={{
            width: 7, height: 7,
            borderRadius: "50%", border: "none",
            cursor: "pointer", padding: 0,
            background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
          }}
        />
      ))}
    </div>
  );
}

// ── Badge ────────────────────────────────────────────────────
function Badge({ inStock }) {
  return (
    <span style={{
      fontSize: "0.75rem", fontWeight: 600,
      padding: "3px 10px", borderRadius: 99,
      background: inStock ? "#e6f2eb" : "#fdecea",
      color:      inStock ? "#1f6b3e" : "#b92b2b",
    }}>
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
}

// ── Main Modal ───────────────────────────────────────────────
/**
 * @param {{ item: object, onClose: ()=>void }} props
 */
export function Modal({ item, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = getImages(item);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  return (
    // Backdrop — click outside modal to close
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(10,8,6,0.72)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, padding: "1rem",
      }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 20,
        width: "100%", maxWidth: 680,
        maxHeight: "90vh", overflowY: "auto",
        position: "relative",
        boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            width: 32, height: 32, borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: "#666",
          }}
        >
          ✕
        </button>

        {/* ── Gallery ─────────────────────────────────────── */}
        {images.length > 0 ? (
          <div style={{
            position: "relative", aspectRatio: "16/9",
            overflow: "hidden", borderRadius: "20px 20px 0 0",
            background: "#f0ede8",
          }}>
            <img
              src={images[imgIdx]}
              alt={`${item.Name} — image ${imgIdx + 1} of ${images.length}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* Featured badge */}
            {item.Flag && (
              <span style={{
                position: "absolute", top: 14, left: 14,
                background: "#c8913a", color: "#fff",
                fontSize: 11, fontWeight: 600,
                padding: "4px 10px", borderRadius: 99,
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>
                Featured
              </span>
            )}

            {/* Carousel controls (only shown when there are multiple images) */}
            {images.length > 1 && (
              <>
                <NavButton side="left"  onClick={prev} />
                <NavButton side="right" onClick={next} />
                <Dots count={images.length} current={imgIdx} onSelect={setImgIdx} />
              </>
            )}
          </div>
        ) : (
          <div style={{
            height: 180, background: "#f0ede8",
            borderRadius: "20px 20px 0 0",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "3rem",
          }}>
            📦
          </div>
        )}

        {/* ── Item details ─────────────────────────────────── */}
        <div style={{ padding: "1.5rem" }}>
          {/* Name + Price */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem",
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem", fontWeight: 700,
              lineHeight: 1.2, color: "#1a1410",
            }}>
              {item.Name}
            </h2>
            {item.Price != null && (
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem", fontWeight: 700,
                color: "#2a5c3f", whiteSpace: "nowrap",
              }}>
                {formatPrice(item.Price)}
              </div>
            )}
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <Badge inStock={item.InStock} />
            {item.CategoryName && (
              <span style={{
                fontSize: "0.75rem", fontWeight: 600,
                padding: "3px 10px", borderRadius: 99,
                background: "#f0ede8", color: "#7a6a56",
              }}>
                {item.CategoryName}
              </span>
            )}
          </div>

          {/* Description */}
          {item.Description && (
            <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#3d3428", marginBottom: "1rem" }}>
              {item.Description}
            </p>
          )}

          {/* Serial number */}
          {item.Sno && (
            <p style={{ fontSize: "0.78rem", color: "#a09080", fontFamily: "monospace" }}>
              Serial: {item.Sno}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}