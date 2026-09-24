import { ArrowRight } from "lucide-react";
import { useCuisines } from "../hooks/useMenuData";

export default function CategorySection({
  cuisines: controlledCuisines,
  onViewAll = () => {},
  onSelect = () => {},
}) {
  const { data, loading, error } = useCuisines();
  const cuisines = controlledCuisines || data;
  return (
    <section className="w-full py-6 px-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-semibold text-gray-900">
          Explore by Cuisine
        </h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          View All
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 pl-2 pr-1 scrollbar-hide snap-x snap-mandatory">
        {loading && (
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-48 w-48 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        )}
        {!loading && error && (
          <p className="text-sm text-gray-500">
            Live cuisines are unavailable; showing the demo menu.
          </p>
        )}
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.name}
            onClick={() => onSelect(cuisine)}
            className="flex-shrink-0 w-48 rounded-2xl p-4 text-left snap-start transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: cuisine.backgroundColor || cuisine.bg }}
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-white/50">
              <img
                src={cuisine.image}
                alt={cuisine.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {cuisine.name}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{cuisine.count}</p>
          </button>
        ))}
      </div>
    </section>
  );
}