import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);

    const addItem = (item) => {
        // item: { id, variationId, name, priceCents }
        setCartItems(prev => {
            const existing = prev.find(i => i.variationId === item.variationId);
            if (existing) {
                return prev.map(i => i.variationId === item.variationId ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeItem = (variationId) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.variationId === variationId);
            if (!existing) return prev;
            if (existing.qty <= 1) return prev.filter(i => i.variationId !== variationId);
            return prev.map(i => i.variationId === variationId ? { ...i, qty: i.qty - 1 } : i);
        });
    };

    const clearCart = () => setCartItems([]);

    const openCheckout = () => { setCartOpen(false); setCheckoutOpen(true); };

    const cartTotal = cartItems.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
    const itemCount  = cartItems.reduce((sum, i) => sum + i.qty, 0);

    return (
        <CartContext.Provider value={{
            cartItems, cartTotal, itemCount,
            addItem, removeItem, clearCart,
            cartOpen, setCartOpen,
            checkoutOpen, setCheckoutOpen, openCheckout,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
