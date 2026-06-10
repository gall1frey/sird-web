// ─────────────────────────────────────────────────────────────
//  components/Modal.jsx
//  Full-screen overlay showing item details + image carousel.
//  Close by clicking the backdrop, the ✕ button, or pressing Escape.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { getImages, formatPrice } from "../utils/formatters";
import { useCart } from "../context/CartContext";
import { WHATSAPP_NUMBER, OUT_OF_STOCK_MESSAGE } from "../config";

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

/** Renders OUT_OF_STOCK_MESSAGE, replacing {{whatsapp}} with a live WhatsApp link. */
function OutOfStockDescription() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
  const parts = OUT_OF_STOCK_MESSAGE.split("{{whatsapp}}");
  return (
    <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#3d3428", marginBottom: "0.6rem" }}>
      {parts[0]}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1f6b3e", fontWeight: 600, textDecoration: "underline" }}
      >
        here
      </a>
      {parts[1]}
    </p>
  );
}

export function Modal({ item, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = getImages(item);
  const { addToCart, cartItems } = useCart();

  const isOutOfStock = item.InStock === false || item.InStock === "FALSE" || item.InStock === false;
  const cartEntry = cartItems.find(e => (e.item.Sno || e.item.Name) === (item.Sno || item.Name));
  const qtyInCart = cartEntry?.qty ?? 0;

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  return (
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
        width: "100%", maxWidth: 500,
        height: "90vh",
        position: "relative",
        boxShadow: "0 24px 80px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
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

        {images.length > 0 ? (
          <div style={{
            position: "relative",
            borderRadius: "20px 20px 0 0",
            background: "#f0ede8",
            overflow: "hidden",
            flex: "1 1 0",
            minHeight: 0,
          }}>
            <img
              src={images[imgIdx]}
              alt={`${item.Name} — image ${imgIdx + 1} of ${images.length}`}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
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

        <div style={{ padding: "0.75rem 1.25rem 1rem", flexShrink: 0 }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem",
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.25rem", fontWeight: 500,
              lineHeight: 1.2, color: "#1a1410", margin: 0,
            }}>
              {item.Name}
            </h2>
            {item.Price != null && (
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem", fontWeight: 500,
                color: "#705934", whiteSpace: "nowrap",
              }}>
                {formatPrice(item.Price)}
              </div>
            )}
          </div>

          {/* Description — custom message for out-of-stock, normal otherwise */}
          {isOutOfStock
            ? <OutOfStockDescription />
            : item.Description && (
                <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#3d3428", marginBottom: "0.6rem" }}>
                  {item.Description}
                </p>
              )
          }

          {item.Sno && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a07848" }}>Serial</span>
              <span style={{ width: 1, height: "0.85em", background: "rgba(112,89,52,0.3)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "monospace", fontSize: "0.95rem", fontWeight: 700, color: "#705934", letterSpacing: "0.06em" }}>{item.Sno}</span>
            </div>
          )}

          {/* ── Add to Cart ── */}
          <button
            className="modal-add-to-cart"
            onClick={() => addToCart(item)}
            disabled={isOutOfStock}
          >
            {isOutOfStock
              ? "Out of Stock"
              : qtyInCart > 0
                ? `Add Another  ·  ${qtyInCart} in cart`
                : "Add to Cart"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
