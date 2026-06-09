import { useState } from "react";
import { getImages, formatPrice } from "../utils/formatters";

export function Card({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const images = getImages(item);
  const firstImage = images[0];

  return (
    <div
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`card-outer${item.InStock === false || item.InStock === "FALSE" ? " card-out-of-stock" : ""}`}
    >
      <div className="card-img">
        {firstImage ? (
          <img
            src={firstImage}
            alt={item.Name}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#f0ede8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
            📦
          </div>
        )}
      </div>
      <div className="card-info">
        <span className="card-serial-num">#{item.Sno}</span>
        <span className="card-serial-price">{formatPrice(item.Price)}</span>
      </div>
    </div>
  );
}