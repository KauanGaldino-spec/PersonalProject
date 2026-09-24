// Shared constants between the Express server and the React client.
// Kept in plain JS so both Node and Vite can import it.

export const API_BASE = "/api";
export const PORT = Number(process.env.PORT) || 3001;
export const MEALDB_BASE =
  process.env.MEALDB_BASE || "https://www.themealdb.com/api.php/v1/1";

// Fixed demo prices for the catalog. TheMealDB has no real prices, so the
// app supplies them. This is a demo menu, not a live restaurant menu.
export const DEMO_PRICES = {
  // Italian
  "52771": 12.99, // Margherita
  "52768": 13.99, // Margherita (alt)
  "52766": 11.99, // Spaghetti Carbonara
  "52770": 10.99, // Lasagna
  "52764": 12.49, // Pizza
  "52765": 14.99, // Pizza
  // Chinese
  "52958": 11.49, // Chicken Chow Mein
  "52957": 10.99, // Chow Mein
  "52948": 12.99, // Kung Pao Chicken
  "52946": 9.99, // Fried Rice
  "52945": 8.99, // Dumplings
  // Indian
  "52977": 11.49, // Butter Chicken
  "52978": 10.99, // Paneer Butter Masala
  "52979": 9.99, // Chicken Tikka Masala
  "52980": 8.49, // Saag Paneer
  "52981": 7.99, // Naan
  // Mexican
  "52945": 8.99, // Tacos
  "52946": 9.99, // Burrito
  "52947": 10.49, // Enchiladas
  "52948": 8.99, // Nachos
  "52949": 7.49, // Guacamole
  // Japanese
  "52957": 13.99, // Sushi
  "52958": 12.49, // Ramen
  "52959": 11.99, // Tempura
  "52960": 9.99, // Sashimi
  "52961": 8.99, // Miso Soup
};

export const DEFAULT_PRICE = 9.99;
export const DEFAULT_RATING = 4.5;

// Background colors matching the existing CategorySection palette.
export const CUISINE_BG = {
  Italian: "#FBEDE4",
  Chinese: "#E9F2E9",
  Indian: "#FCEFE0",
  Mexican: "#FBEAE9",
  Japanese: "#F0EDF9",
};

export const BADGE_LABELS = {
  bestseller: "Bestseller",
  popular: "Popular",
  veg: "Vegetarian",
};