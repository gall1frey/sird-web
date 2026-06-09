// ─────────────────────────────────────────────────────────────
//  components/CartDrawer.jsx
//  Slide-in drawer listing cart items: image, serial, price.
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { getImages, formatPrice } from "../utils/formatters";

function CartRow({ entry }) {
    const { addToCart, removeFromCart } = useCart();
    const { item, qty } = entry;
    const image = getImages(item)[0];

    return (
        <div className="cart-row">
            <div className="cart-row-img">
                {image
                    ? <img src={image} alt={item.Name} />
                    : <div className="cart-row-img-placeholder">📦</div>
                }
            </div>
            <div className="cart-row-info">
                <span className="cart-row-name">{item.Name}</span>
                <span className="cart-row-serial">#{item.Sno}</span>
                <span className="cart-row-price">{formatPrice(item.Price)}</span>
            </div>
            <div className="cart-row-qty">
                <button className="cart-qty-btn" onClick={() => removeFromCart(item)} aria-label="Decrease">−</button>
                <span className="cart-qty-num">{qty}</span>
                <button className="cart-qty-btn" onClick={() => addToCart(item)} aria-label="Increase">+</button>
            </div>
        </div>
    );
}

/**
 * @param {{ open: boolean, onClose: () => void }} props
 */
export function CartDrawer({ open, onClose }) {
    const { cartItems, cartCount } = useCart();

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const total = cartItems.reduce(
        (sum, { item, qty }) => sum + (item.Price ?? 0) * qty, 0
    );

    return (
        <>
            <div
                className={`sidebar-backdrop${open ? " sidebar-backdrop-visible" : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <div className={`cart-drawer${open ? " cart-drawer-open" : ""}`} role="dialog" aria-label="Cart">
                <div className="cart-drawer-header">
                    <span className="cart-drawer-title">Cart {cartCount > 0 && <span className="cart-drawer-count">{cartCount}</span>}</span>
                    <button className="sidebar-close" onClick={onClose} aria-label="Close cart">✕</button>
                </div>

                {cartItems.length === 0 ? (
                    <p className="cart-empty">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="cart-list">
                            {cartItems.map(entry => (
                                <CartRow key={entry.item.Sno || entry.item.Name} entry={entry} />
                            ))}
                        </div>
                        <div className="cart-footer">
                            <span className="cart-footer-label">Total</span>
                            <span className="cart-footer-total">{formatPrice(total)}</span>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}