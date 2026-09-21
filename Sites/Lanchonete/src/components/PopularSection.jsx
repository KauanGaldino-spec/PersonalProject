import { ArrowRight, Star, Plus } from "lucide-react";

const DISHES = [
  {
    name: "Grilled Chicken with Veggies",
    subtitle: "Bestseller",
    price: "$12.99",
    rating: 4.8,
    badge: { label: "Bestseller", color: "#2FA84F" },
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Margherita Pizza",
    subtitle: "Classic Delight",
    price: "$10.99",
    rating: 4.7,
    badge: { label: "15% OFF", color: "#E8542B" },
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Paneer Butter Masala",
    subtitle: "with Naan",
    price: "$11.49",
    rating: 4.9,
    badge: { label: "Bestseller", color: "#2FA84F" },
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sushi Platter",
    subtitle: "12 Pieces",
    price: "$13.99",
    rating: 4.6,
    badge: { label: "10% OFF", color: "#E8542B" },
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Chocolate Lava Cake",
    subtitle: "with Ice Cream",
    price: "$6.99",
    rating: 4.8,
    badge: { label: "30% OFF", color: "#E8542B" },
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=400&auto=format&fit=crop",
  },
];

export default function PopularSection({
  dishes = DISHES,
  onViewAll = () => {},
  onAdd = () => {},
}) {
  return (
    <section className="w-full py-6 pl-68 pr-1">
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

      <div className="flex gap-4 overflow-x-auto pb-2 pl-2 pr-1 scrollbar-hide snap-x snap-mandatory">
        {dishes.map((dish) => (
          <div
            key={dish.name}
            className="flex-shrink-0 w-44 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden snap-start"
          >
            <div className="relative w-full aspect-square">
              <img
                src={dish.image}
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
                    {dish.price}
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
    </section>
  );
}