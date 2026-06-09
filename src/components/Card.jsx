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
    Hello
    </div>
  );
}