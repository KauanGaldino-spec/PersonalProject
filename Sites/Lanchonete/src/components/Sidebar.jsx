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

export default function Sidebar({ active, onNavigate }) {
  // Works standalone (internal state) or controlled from a parent/router
  // by passing `active` + `onNavigate`.
  const [internalActive, setInternalActive] = useState("home");
  const current = active ?? internalActive;
  const setActive = onNavigate ?? setInternalActive;

  return (
    <aside className="w-40 shrink-0 border-r border-gray-100 py-6 px-3">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = current === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
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
    </aside>
  );
}