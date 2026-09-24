import { createContext, useContext, useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/* Cart context — holds real line items (not just a count), shared     */
/* between the navbar, product cards, and the cart/checkout panel.     */
/* ------------------------------------------------------------------ */
const CartContext = createContext(null);
const CART_STORAGE_KEY = "tastehouse-cart-v1";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((item) => item.id && item.name && item.price != null)
      : [];
  } catch {
    return [];
  }
}

function loadOrders() {
  try {
    const raw = localStorage.getItem("tastehouse-orders-v1");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [orders, setOrders] = useState(loadOrders);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage can be unavailable in private/incognito modes.
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("tastehouse-orders-v1", JSON.stringify(orders));
    } catch {
      // Storage can be unavailable in private/incognito modes.
    }
  }, [orders]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const setQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev].slice(0, 20));
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce(
    (sum, item) => sum + item.quantity * Number(item.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        addOrder,
        orders,
        cartCount,
        cartTotal,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a <CartProvider>");
  return ctx;
}
