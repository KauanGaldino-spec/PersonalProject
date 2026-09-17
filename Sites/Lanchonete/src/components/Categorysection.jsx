import { ArrowRight } from "lucide-react";

const CUISINES = [
  {
    name: "Italian",
    count: "120+ Dishes",
    bg: "#FBEDE4",
    image:
      "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Chinese",
    count: "150+ Dishes",
    bg: "#E9F2E9",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Indian",
    count: "180+ Dishes",
    bg: "#FCEFE0",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mexican",
    count: "90+ Dishes",
    bg: "#FBEAE9",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Japanese",
    count: "110+ Dishes",
    bg: "#F0EDF9",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop",
  },
];

export default function CategorySection({
  cuisines = CUISINES,
  onViewAll = () => {},
  onSelect = () => {},
}) {
  return (
    <section className="w-full py-6">
      <div className="flex items-center justify-between mb-4 px-1">
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

      <div className="flex gap-4 overflow-x-auto pb-2 px-1 scrollbar-hide snap-x snap-mandatory">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.name}
            onClick={() => onSelect(cuisine)}
            className="flex-shrink-0 w-40 rounded-2xl p-4 text-left snap-start transition-transform hover:-translate-y-0.5"
            style={{ backgroundColor: cuisine.bg }}
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