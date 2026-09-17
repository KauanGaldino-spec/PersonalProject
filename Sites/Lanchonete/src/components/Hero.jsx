import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

/* ------------------------------------------------------------------ */
/* Inline burger illustration — pure SVG, no network request, so it     */
/* always renders regardless of sandbox/CORS restrictions. Swap this    */
/* out for your client's real product photo when you have it.          */
/* ------------------------------------------------------------------ */
function BurgerIllustration({ className }) {
  return (
    <svg viewBox="0 0 260 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M40 118c0-33 40-55 90-55s90 22 90 55H40z" fill="#E8A33D" />
      <circle cx="95" cy="82" r="4" fill="#FCE7C8" />
      <circle cx="120" cy="74" r="4" fill="#FCE7C8" />
      <circle cx="145" cy="80" r="4" fill="#FCE7C8" />
      <circle cx="168" cy="88" r="4" fill="#FCE7C8" />
      <circle cx="108" cy="94" r="4" fill="#FCE7C8" />
      <circle cx="155" cy="98" r="4" fill="#FCE7C8" />

      <path
        d="M32 122c10-10 20 4 30-4s16 10 28 2 18 8 30 0 20 8 30 0 18 8 28 0 20-10 30 0H32z"
        fill="#8FC93A"
      />

      <path d="M42 138l176 0-14 20H56z" fill="#F5C243" />

      <rect x="38" y="152" width="184" height="26" rx="13" fill="#7A4A2B" />

      <rect x="46" y="182" width="168" height="14" rx="7" fill="#E14E3C" />

      <path d="M44 198h172c0 18-14 30-86 30s-86-12-86-30z" fill="#D98A32" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const slideCount = 4;
  const [slide, setSlide] = useState(1);

  const prevSlide = () => setSlide((s) => (s - 1 + slideCount) % slideCount);
  const nextSlide = () => setSlide((s) => (s + 1) % slideCount);

  return (
    <section className="relative flex-1 overflow-hidden bg-gradient-to-br from-orange-50 via-orange-50 to-amber-100 rounded-2xl px-10 py-12 min-h-[340px]">
      <div className="relative z-10 max-w-md">
        <p className="text-xs font-semibold tracking-wide text-orange-500 mb-3">
          GOOD FOOD, GOOD MOOD
        </p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
          Delicious Food
          <br />
          <span className="text-orange-500">Delivered Fast.</span>
        </h1>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">
          Discover the best restaurants, cuisines and exclusive offers near
          you.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition-colors"
          >
            Order Now
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
              →
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
          >
            Explore Menu
            <span className="w-5 h-5 rounded-full bg-current flex items-center justify-center">
              <span className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["A", "B", "C"].map((letter) => (
              <span
                key={letter}
                className="w-7 h-7 rounded-full bg-orange-200 border-2 border-white flex items-center justify-center text-[10px] font-medium text-orange-800"
              >
                {letter}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">
            <span className="font-semibold text-gray-800">50K+</span> Happy
            Customers
          </span>
        </div>
      </div>

      <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-72 h-72">
        <BurgerIllustration className="w-full h-full drop-shadow-2xl" />

        <div className="absolute bottom-4 -left-16 bg-white rounded-xl shadow-lg px-4 py-3 w-44">
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