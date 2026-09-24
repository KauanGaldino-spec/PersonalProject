import { useState } from "react";
import {
  Home,
  UtensilsCrossed,
  LayoutGrid,
  Tag,
  CalendarCheck,
  Package,
  Star,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: Home },
  { id: "menu", label: "Menu", icon: UtensilsCrossed },
  { id: "categories", label: "Categories", icon: LayoutGrid },
  { id: "offers", label: "Offers", icon: Tag },
  { id: "reservations", label: "Reservations", icon: CalendarCheck },
  { id: "orders", label: "Orders", icon: Package },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "support", label: "Support", icon: HelpCircle },
];

export default function Sidebar({
  active,
  onNavigate,
  promo = {
    discount: "20% OFF",
    message: "on your first order",
    ctaLabel: "Order Now",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
  },
  onOrderNow = () => {},
}) {
  // Works standalone (internal state) or controlled from a parent/router
  // by passing `active` + `onNavigate`.
  const [internalActive, setInternalActive] = useState("home");
  const current = active ?? internalActive;
  const setActive = onNavigate ?? setInternalActive;

  return (
    <aside className="w-40 shrink-0 border-r border-gray-100 py-6 px-3 flex flex-col h-full">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = current === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-orange-500 text-white font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      <div
        className="relative w-full rounded-2xl overflow-hidden p-4 pb-20 text-white mt-auto"
        style={{
          background: "linear-gradient(160deg, #F5883C 0%, #E8542B 100%)",
        }}
      >
        <p className="text-sm font-bold leading-tight">
          Get {promo.discount}
          <br />
          {promo.message}
        </p>

        <button
          onClick={onOrderNow}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold bg-white/95 text-orange-600 px-3 py-1.5 rounded-full hover:bg-white transition-colors"
        >
          {promo.ctaLabel}
          <ArrowRight size={12} />
        </button>

        <img
          src={promo.image}
          alt="Promo dish"
          className="absolute bottom-0 left-0 w-full h-20 object-cover object-top"
        />
      </div>
    </aside>
  );
}