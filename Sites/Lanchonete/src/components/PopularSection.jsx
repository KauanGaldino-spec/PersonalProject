import { ArrowRight, Star, Plus } from "lucide-react";
import { useDishes } from "../hooks/useMenuData";

const formatPrice = (price) => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : Number(price);
  return `$${Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : "0.00"}`;
};

export default function PopularSection({
  dishes: controlledDishes,
  onViewAll = () => {},
  onAdd = () => {},
}) {
  const { data, loading, error } = useDishes();
  const dishes = controlledDishes || data;

  return (
    <section className="w-full py-6 px-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-xl font-semibold text-gray-900">
          Popular Dishes
        </h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          View All
          <ArrowRight size={15} />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-72 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-sm text-gray-500">
          Live dishes are unavailable; showing the demo menu.
        </p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2 pl-2 pr-1 scrollbar-hide snap-x snap-mandatory">
          {dishes.map((dish) => (
            <div
              key={dish.id || dish.name}
              className="flex-shrink-0 w-44 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden snap-start"
            >
              <div className="relative w-full aspect-square">
                <img
                  src={dish.image || "/logo.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span
                  className="absolute top-2 left-2 text-[10px] font-semibold text-white px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: dish.badge.color }}
                >
                  {dish.badge.label}
                </span>
              </div>

              <div className="p-3">
                <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem]">
                  {dish.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{dish.subtitle}</p>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      {formatPrice(dish.price)}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs text-gray-500">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {dish.rating}
                    </span>
                  </div>
                  <button
                    onClick={() => onAdd(dish)}
                    className="w-7 h-7 flex items-center justify-center rounded-full text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: "#E8542B" }}
                    aria-label={`Add ${dish.name}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
