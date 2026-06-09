import { useCart } from "../context/CartContext";
import { SITE_TITLE } from "../config";

export function Header({ onMenuClick, onCartClick }) {
  const { cartCount } = useCart();

  return (
    <header>
      <div className="header-all">
        <div className="header-text">
          <h1>{SITE_TITLE}</h1>
        </div>
        <div className="header-menu">
          <button
            className="header-cart-btn"
            onClick={onCartClick}
            aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="header-cart-badge">{cartCount}</span>}
          </button>
          <button
            className="hamburger"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&icon_names=menu" />
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}