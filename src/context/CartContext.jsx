// ─────────────────────────────────────────────────────────────
//  context/CartContext.jsx
//  Global cart state. Cart is a Map: sno → { item, qty }
// ─────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(new Map());

    const addToCart = (item) => {
        setCart(prev => {
            const next = new Map(prev);
            const key = item.Sno || item.Name;
            if (next.has(key)) {
                next.set(key, { item, qty: next.get(key).qty + 1 });
            } else {
                next.set(key, { item, qty: 1 });
            }
            return next;
        });
    };

    const removeFromCart = (item) => {
        setCart(prev => {
            const next = new Map(prev);
            const key = item.Sno || item.Name;
            const entry = next.get(key);
            if (!entry) return next;
            if (entry.qty <= 1) {
                next.delete(key);
            } else {
                next.set(key, { item, qty: entry.qty - 1 });
            }
            return next;
        });
    };

    const cartItems = Array.from(cart.values());
    const cartCount = cartItems.reduce((sum, e) => sum + e.qty, 0);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}