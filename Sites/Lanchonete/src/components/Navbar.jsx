import { useState } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Plus,
  Minus,
  Trash2,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";

/* ------------------------------------------------------------------ */
/* Payment helpers — formatting + light validation only. This never    */
/* talks to a real processor; wire onPlaceOrder up to Stripe or your   */
/* own backend for real charges (never handle raw card numbers on     */
/* your own server — use a processor's hosted fields / tokenization). */
/* ------------------------------------------------------------------ */
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isPaymentFormValid(form) {
  const cardDigits = form.cardNumber.replace(/\s/g, "");
  const expiryValid = /^\d{2}\/\d{2}$/.test(form.expiry);
  return (
    form.name.trim().length > 1 &&
    form.address.trim().length > 3 &&
    cardDigits.length === 16 &&
    expiryValid &&
    /^\d{3,4}$/.test(form.cvv)
  );
}

const EMPTY_PAYMENT_FORM = {
  name: "",
  address: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

/* ------------------------------------------------------------------ */
/* Cart panel — slides in from the right. Three views: cart review,    */
/* checkout form, order confirmation.                                 */
/* ------------------------------------------------------------------ */
function CartPanel() {
  const {
    items,
    removeFromCart,
    setQuantity,
    cartTotal,
    clearCart,
    isOpen,
    setIsOpen,
  } = useCart();

  const [view, setView] = useState("cart"); // 'cart' | 'checkout' | 'success'
  const [form, setForm] = useState(EMPTY_PAYMENT_FORM);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  if (!isOpen) return null;

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setView("cart");
      setForm(EMPTY_PAYMENT_FORM);
    }, 200);
  };

  const updateField = (field) => (e) => {
    const raw = e.target.value;
    const value =
      field === "cardNumber"
        ? formatCardNumber(raw)
        : field === "expiry"
        ? formatExpiry(raw)
        : field === "cvv"
        ? raw.replace(/\D/g, "").slice(0, 4)
        : raw;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (!isPaymentFormValid(form)) return;
    setIsProcessing(true);
    // Simulated network delay — replace with a real call to your
    // payment processor / backend order endpoint.
    setTimeout(() => {
      setOrderTotal(cartTotal);
      clearCart();
      setIsProcessing(false);
      setView("success");
    }, 1200);
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
            {view === "success" && "Order placed"}
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
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1.5 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          aria-label={`Decrease ${item.name} quantity`}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-sm w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          aria-label={`Increase ${item.name} quantity`}
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

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
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Name on card
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

              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Card number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.cardNumber}
                  onChange={updateField("cardNumber")}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">
                    Expiry
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.expiry}
                    onChange={updateField("expiry")}
                    placeholder="MM/YY"
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">
                    CVV
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cvv}
                    onChange={updateField("cvv")}
                    placeholder="123"
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                  />
                </div>
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
                disabled={!isPaymentFormValid(form) || isProcessing}
                className="w-full py-2.5 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing…" : `Pay $${cartTotal.toFixed(2)}`}
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
              Thanks — your order is on its way!
            </p>
            <p className="text-sm text-gray-400">
              ${orderTotal.toFixed(2)} charged
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
          src="/logo.png"
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