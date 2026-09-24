import { Truck, RefreshCw, ShieldCheck, Headphones } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Feature strip — 4 trust / benefit cards under the hero.             */
/* ------------------------------------------------------------------ */
const FEATURES = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "On orders over $20",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    desc: "7-day return policy",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% secure checkout",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "We're here to help",
  },
];

export default function FeatureStrip() {
  return (
    <section className="py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-center gap-4 bg-gray-50/80 rounded-2xl p-4 border border-gray-100/60"
          >
            <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {title}
              </p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}