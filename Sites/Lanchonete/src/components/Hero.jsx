import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const slideCount = 4;
  const [slide, setSlide] = useState(1);

  const prevSlide = () => setSlide((s) => (s - 1 + slideCount) % slideCount);
  const nextSlide = () => setSlide((s) => (s + 1) % slideCount);

  return (
    <section className="relative flex-1 overflow-hidden bg-gradient-to-br from-orange-50 via-orange-50 to-amber-100 rounded-2xl px-10 py-10 min-h-[320px]">
      <div className="relative z-10 max-w-md">
        <p className="text-sm font-bold tracking-wide text-orange-500 mb-3">
          GOOD FOOD, GOOD MOOD
        </p>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Delicious Food
          <br />
          <span className="text-orange-500">Delivered Fast.</span>
        </h1>
        <p className="text-base text-gray-600 mb-6 max-w-sm">
          Discover the best restaurants, cuisines and exclusive offers near
          you.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white text-base font-semibold hover:bg-orange-600 transition-colors"
          >
            Order Now
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
              →
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-gray-900 text-gray-900 text-base font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            Explore Menu
            <span className="w-5 h-5 rounded-full bg-current flex items-center justify-center">
              <span className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=100&auto=format&fit=crop",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-9 h-9 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            <span className="font-bold text-gray-900">50K+</span> Happy
            Customers
          </span>
        </div>
      </div>

      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=700&auto=format&fit=crop"
          alt="Spicy Zinger Burger with fries and a drink"
          className="w-full h-full object-cover"
        />
        {/* Fades the photo's edges into the hero's background color.
            Uses a plain gradient overlay (not CSS mask-image) so it
            renders consistently across browsers/renderers. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 55% 50%, transparent 45%, #FDECD5 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #FDECD5 0%, transparent 100%)",
          }}
        />

        <div className="absolute bottom-10 left-0 bg-white rounded-xl shadow-lg px-4 py-3 w-44">
          <p className="text-sm font-semibold text-gray-900">
            Spicy Zinger Burger
          </p>
          <p className="text-xs text-gray-400 mb-1">Crispy chicken burger</p>
          <p className="text-sm font-bold text-orange-500">$8.99</p>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 flex items-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all ${
                i === slide
                  ? "w-4 h-1.5 bg-orange-500"
                  : "w-1.5 h-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Demo menu — a few dishes with "Add to cart" buttons feeding the      */
/* shared CartContext. Delete this once wired into your real menu.     */
/* ------------------------------------------------------------------ */
const DEMO_DISHES = [
  { id: "pizza-margherita", name: "Margherita Pizza", price: 12.5 },
  { id: "sushi-salmon", name: "Salmon Sushi Set", price: 18.0 },
  { id: "burger-classic", name: "Classic Burger", price: 9.75 },
];

export function DemoMenu() {
  const { addToCart } = useCart();
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      {DEMO_DISHES.map((dish) => (
        <div key={dish.id} className="p-4 border border-gray-200 rounded-xl">
          <p className="font-medium text-gray-900 mb-1">{dish.name}</p>
          <p className="text-sm text-gray-400 mb-3">
            ${dish.price.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={() => addToCart(dish)}
            className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm hover:bg-orange-600 transition-colors"
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}