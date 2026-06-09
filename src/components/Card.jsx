// ─────────────────────────────────────────────────────────────
//  components/Card.jsx
//  Single inventory item card shown in the grid.
//  Clicking it opens the Modal.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import { getImages, formatPrice } from "../utils/formatters";


/**
 * @param {{ item: object, onClick: ()=>void }} props
 */
export function Card({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const images = getImages(item);
  const firstImage = images[0];

  return (
    <div
      // role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-outer"
    >
      <div className="card-img">
        {firstImage ? (
        <img
          src={firstImage}
          alt={item.Name}
          loading="lazy"
          style={{ width: "100%", display: "block", background: "#f0ede8" }}
        />
        ) : (
        <div style={{ width: "100%", aspectRatio: "4/3", background: "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
          📦
        </div>
        )}
      </div>
      <div className="card-info">
        <span className="card-serial-num">{item.Sno}</span>
        <span className="card-serial-price">{formatPrice(item.Price)}</span>
      </div>
    </div>
  );
}