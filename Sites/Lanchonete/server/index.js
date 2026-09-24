import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MEALDB_BASE, DEFAULT_PRICE, DEFAULT_RATING } from "./constants.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "tastehouse-demo", uptime: process.uptime() });
});

// ---------------------------------------------------------------------------
// TheMealDB proxy + normalization
// ---------------------------------------------------------------------------
async function fetchMealDB(query) {
  const url = `${MEALDB_BASE}?${query}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) {
    throw new Error(`TheMealDB responded ${res.status} for ${url}`);
  }
  return res.json();
}

function normalizeMeal(meal, cuisine) {
  const id = String(meal.idMeal);
  const name = (meal.strMeal || "Untitled dish").trim();
  const subtitle = cuisine ? `${cuisine} dish` : meal.strCategory || "Popular";
  const price = DEFAULT_PRICE;
  return {
    id,
    name,
    subtitle,
    price,
    rating: DEFAULT_RATING,
    badge: { label: "Bestseller", color: "#2FA84F" },
    image: meal.strMealThumb || "",
    source: "demo",
  };
}

function normalizeCuisine(category, index) {
  const name = category.strCategory || `Cuisine ${index + 1}`;
  return {
    id: String(index),
    name,
    count: "100+ Dishes",
    image: "",
    backgroundColor: "#FBEDE4",
    source: "demo",
  };
}

// ---------------------------------------------------------------------------
// Catalog endpoints
// ---------------------------------------------------------------------------
app.get("/api/cuisines", async (_req, res) => {
  try {
    const data = await fetchMealDB("list.php?c=list");
    const categories = (data.meals || []).map(normalizeCuisine);
    res.json({ cuisines: categories });
  } catch (err) {
    res.status(502).json({
      error: "Catalog unavailable",
      detail: err.message,
    });
  }
});

app.get("/api/dishes", async (req, res) => {
  const cuisine = req.query.cuisine ? String(req.query.cuisine).trim() : "";
  const q = req.query.q ? String(req.query.q).trim() : "";

  try {
    let meals = [];
    if (cuisine) {
      const data = await fetchMealDB(`filter.php?c=${encodeURIComponent(cuisine)}`);
      meals = data.meals || [];
    } else if (q) {
      const data = await fetchMealDB(`search.php?s=${encodeURIComponent(q)}`);
      meals = data.meals || [];
    } else {
      // Default: popular Italian dishes so the catalog is not empty.
      const data = await fetchMealDB("filter.php?c=Italian");
      meals = data.meals || [];
    }

    const dishes = meals.slice(0, 12).map((meal) => normalizeMeal(meal, cuisine || null));
    res.json({ dishes });
  } catch (err) {
    res.status(502).json({
      error: "Catalog unavailable",
      detail: err.message,
    });
  }
});

app.get("/api/dishes/:id", async (req, res) => {
  try {
    const data = await fetchMealDB(`lookup.php?i=${encodeURIComponent(req.params.id)}`);
    const meal = (data.meals || [])[0];
    if (!meal) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json({ dish: normalizeMeal(meal, meal.strCategory) });
  } catch (err) {
    res.status(502).json({
      error: "Catalog unavailable",
      detail: err.message,
    });
  }
});

// ---------------------------------------------------------------------------
// Order persistence
// ---------------------------------------------------------------------------
function readOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    const raw = fs.readFileSync(ORDERS_FILE, "utf8").trim();
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${ORDERS_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(orders, null, 2));
  fs.renameSync(tmp, ORDERS_FILE);
}

function generateOrderId() {
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  return `TH-${stamp}-${rand}`.toUpperCase();
}

app.post("/api/orders", (req, res) => {
  const { customerName, address, items } = req.body || {};

  if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
    return res.status(400).json({ error: "customerName is required (min 2 chars)" });
  }
  if (!address || typeof address !== "string" || address.trim().length < 5) {
    return res.status(400).json({ error: "address is required (min 5 chars)" });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items must be a non-empty array" });
  }

  let total = 0;
  const lineItems = items.map((item) => {
    const id = String(item.id);
    const name = String(item.name || "Dish");
    const unitPrice = Number(item.unitPrice);
    const quantity = Math.max(1, Math.floor(Number(item.quantity)) || 1);
    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      throw new Error(`Invalid unitPrice for item ${id}`);
    }
    total += unitPrice * quantity;
    return { id, name, unitPrice, quantity };
  });

  const order = {
    orderId: generateOrderId(),
    status: "demo",
    customerName: customerName.trim(),
    address: address.trim(),
    items: lineItems,
    total: Number(total.toFixed(2)),
    createdAt: new Date().toISOString(),
  };

  const orders = readOrders();
  orders.push(order);
  writeOrders(orders);

  res.status(201).json({
    orderId: order.orderId,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
    message:
      "Demo order recorded. No payment was processed and no restaurant fulfillment was triggered.",
  });
});

app.get("/api/orders/:orderId", (req, res) => {
  const orders = readOrders();
  const order = orders.find((o) => o.orderId === req.params.orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

// ---------------------------------------------------------------------------
// Static frontend (production build)
// ---------------------------------------------------------------------------
const distDir = path.join(__dirname, "..", "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`TasteHouse demo server running at http://localhost:${PORT}`);
});