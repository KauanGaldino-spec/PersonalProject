import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { createDemoOrder } from "../api/mealApi";

/* ------------------------------------------------------------------ */
/* Demo checkout helpers. This flow records an order with the backend  */
/* but never collects or stores payment-card data.                    */
/* ------------------------------------------------------------------ */
const EMPTY_CHECKOUT_FORM = {
  name: "",
  address: "",
};

function isCheckoutFormValid(form) {
  return (
    form.name.trim().length > 1 &&
    form.address.trim().length > 3
  );
}

function CartPanel() {
  const {
    items,
    removeFromCart,
    setQuantity,
    cartTotal,
    clearCart,
    addOrder,
    orders,
    isOpen,
    setIsOpen,
  } = useCart();

  const [view, setView] = useState("cart"); // 'cart' | 'checkout' | 'success'
  const [form, setForm] = useState(EMPTY_CHECKOUT_FORM);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderMessage, setOrderMessage] = useState("");

  if (!isOpen) return null;

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setView("cart");
      setForm(EMPTY_CHECKOUT_FORM);
      setOrderMessage("");
    }, 200);
  };

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!isCheckoutFormValid(form)) return;
    setIsProcessing(true);
    setOrderMessage("");

    try {
      const response = await createDemoOrder({
        customerName: form.name.trim(),
        address: form.address.trim(),
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          unitPrice: Number(item.price),
          quantity: item.quantity,
        })),
      });
      setOrderTotal(response.total);
      addOrder(response);
      clearCart();
      setView("success");
    } catch (error) {
      setOrderMessage(error.message || "Could not place the demo order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={isProcessing ? undefined : close}
      />

      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            {view === "cart" && "Your cart"}
            {view === "checkout" && "Checkout"}
            {view === "success" && "Order confirmed"}
          </h2>
          {!isProcessing && (
            <button
              type="button"
              onClick={close}
              aria-label="Close cart"
              className="text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {view === "cart" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="text-sm text-gray-400 mt-8 text-center">
                  Your cart is empty.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          ${(Number(item.price) || 0).toFixed(2)} × {item.quantity}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <span aria-hidden="true">−</span>
                        </button>
                        <span className="text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <span aria-hidden="true">✕</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {orders.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">
                  Recent demo orders
                </p>
                <ul className="space-y-2">
                  {orders.slice(0, 3).map((order) => (
                    <li
                      key={order.orderId}
                      className="flex items-center justify-between gap-3 text-xs text-gray-600"
                    >
                      <span className="truncate">{order.orderId}</span>
                      <span>${Number(order.total).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-base font-semibold text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setView("checkout")}
                  className="w-full py-2.5 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  Checkout
                </button>
              </div>
            )}
          </>
        )}

        {view === "checkout" && (
          <form
            onSubmit={placeOrder}
            className="flex-1 overflow-y-auto px-5 py-4 flex flex-col"
          >
            <div className="space-y-4 flex-1">
              <div className="rounded-lg bg-orange-50 px-3 py-2 text-xs text-orange-700">
                Demo order only — no payment is processed and no restaurant
                fulfillment is triggered.
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Your name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="Jane Diner"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Delivery address
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={updateField("address")}
                  placeholder="123 Market St, Apt 4"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-base font-semibold text-gray-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setView("cart")}
                disabled={isProcessing}
                className="w-full mb-2 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                Back to cart
              </button>
              <button
                type="submit"
                disabled={!isCheckoutFormValid(form) || isProcessing}
                className="w-full py-2.5 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Saving demo order…" : "Place demo order"}
              </button>
            </div>
          </form>
        )}

        {view === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl mb-2">
              ✓
            </div>
            <p className="text-base font-semibold text-gray-900">
              Thanks — your demo order is confirmed!
            </p>
            <p className="text-sm text-gray-400">
              Order ID: {orders[0]?.orderId || "TH-DEMO"}
            </p>
            <p className="text-sm text-gray-400">
              ${orderTotal.toFixed(2)} — no payment was charged
            </p>
            <p className="text-xs text-orange-700 bg-orange-50 rounded-lg px-3 py-2 w-full">
              Demo order only — no payment was processed.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-4 px-5 py-2 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const { cartCount, setIsOpen } = useCart();

  return (
    <nav className="w-full bg-white px-6 py-3 flex items-center justify-between gap-6 border-b border-gray-100">
      <div className="flex items-center gap-2 shrink-0">
        <img
          src="/logo.svg"
          alt="TasteHouse logo"
          className="w-9 h-9 rounded-full object-cover bg-orange-500"
        />
        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
          TasteHouse
        </span>
      </div>

      <div className="flex-1 max-w-2xl">
        <div className="flex items-center bg-gray-100 rounded-full pl-4 pr-1 py-1">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for dishes, cuisines, restaurants..."
            className="flex-1 bg-transparent border-none outline-none px-3 py-1.5 text-sm text-gray-700 placeholder:text-gray-400"
          />
          <button
            type="button"
            aria-label="Search"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors shrink-0"
          >
            <Search className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <button
          type="button"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span className="text-xs">Favorites</span>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-semibold leading-none">
              {cartCount}
            </span>
          )}
          <span className="text-xs">Cart</span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Account</span>
        </button>
      </div>

      <CartPanel />
    </nav>
  );
}
