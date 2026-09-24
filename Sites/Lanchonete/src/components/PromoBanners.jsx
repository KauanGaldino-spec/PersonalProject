import { ArrowRight, Check, Tag } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Promo banners — two full-width promo cards below Popular Dishes.    */
/* ------------------------------------------------------------------ */
export default function PromoBanners() {
  return (
    <section className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left — green "Flat 30% OFF" banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 p-6 sm:p-8 flex flex-col justify-between min-h-[240px]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
              <Check className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold tracking-wide text-green-700">
              LIMITED TIME OFFER
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            Flat 30% OFF
            <br />
            On Your First Order!
          </h3>
          <p className="text-sm text-gray-600 mt-3 max-w-xs">
            Use code TASTY30 at checkout and enjoy delicious rewards.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
            Order Now
            <ArrowRight size={14} />
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop"
          alt="Grilled chicken salad bowl"
          className="absolute right-0 bottom-0 w-3/5 h-full object-cover object-center opacity-90"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #ecfdf5 0%, transparent 55%)",
          }}
        />
      </div>

      {/* Right — orange "Family Combo Meals" banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-6 sm:p-8 flex flex-col justify-between min-h-[240px]">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
              <Tag className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold tracking-wide text-orange-700">
              WEEKEND SPECIAL
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            Family Combo
            <br />
            Meals
          </h3>
          <p className="text-sm text-gray-600 mt-3 max-w-xs">
            Feed your family with our special combo deals.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
            Order Now
            <ArrowRight size={14} />
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop"
          alt="Burger, fries and drink combo"
          className="absolute right-0 bottom-0 w-2/3 h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #fff7ed 0%, transparent 50%)",
          }}
        />
      </div>
    </section>
  );
}