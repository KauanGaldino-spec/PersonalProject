import { useEffect, useState } from "react";
import { getCuisines, getDishes } from "../api/mealApi";

export const FALLBACK_CUISINES = [
  {
    id: "italian",
    name: "Italian",
    count: "120+ Dishes",
    backgroundColor: "#FBEDE4",
    image:
      "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "chinese",
    name: "Chinese",
    count: "150+ Dishes",
    backgroundColor: "#E9F2E9",
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "indian",
    name: "Indian",
    count: "180+ Dishes",
    backgroundColor: "#FCEFE0",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "mexican",
    name: "Mexican",
    count: "90+ Dishes",
    backgroundColor: "#FBEAE9",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "japanese",
    name: "Japanese",
    count: "110+ Dishes",
    backgroundColor: "#F0EDF9",
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop",
  },
];

export const FALLBACK_DISHES = [
  {
    id: "fallback-grilled-chicken",
    name: "Grilled Chicken with Veggies",
    subtitle: "Bestseller",
    price: 12.99,
    rating: 4.8,
    badge: { label: "Bestseller", color: "#2FA84F" },
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fallback-margherita",
    name: "Margherita Pizza",
    subtitle: "Classic Delight",
    price: 10.99,
    rating: 4.7,
    badge: { label: "15% OFF", color: "#E8542B" },
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fallback-paneer",
    name: "Paneer Butter Masala",
    subtitle: "with Naan",
    price: 11.49,
    rating: 4.9,
    badge: { label: "Bestseller", color: "#2FA84F" },
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fallback-sushi",
    name: "Sushi Platter",
    subtitle: "12 Pieces",
    price: 13.99,
    rating: 4.6,
    badge: { label: "10% OFF", color: "#E8542B" },
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "fallback-lava-cake",
    name: "Chocolate Lava Cake",
    subtitle: "with Ice Cream",
    price: 6.99,
    rating: 4.8,
    badge: { label: "30% OFF", color: "#E8542B" },
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=400&auto=format&fit=crop",
  },
];

export function useCuisines() {
  const [state, setState] = useState({
    data: FALLBACK_CUISINES,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    getCuisines()
      .then((cuisines) => {
        if (!active || !cuisines.length) return;
        setState({ data: cuisines, loading: false, error: null });
      })
      .catch((error) => {
        if (active) {
          setState({ data: FALLBACK_CUISINES, loading: false, error });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return state;
}

export function useDishes({ cuisine = "", q = "" } = {}) {
  const [state, setState] = useState({
    data: FALLBACK_DISHES,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    getDishes({ cuisine, q })
      .then((dishes) => {
        if (!active) return;
        setState({
          data: dishes.length ? dishes : FALLBACK_DISHES,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (active) {
          setState({ data: FALLBACK_DISHES, loading: false, error });
        }
      });
    return () => {
      active = false;
    };
  }, [cuisine, q]);

  return state;
}
