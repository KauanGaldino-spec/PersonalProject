// Smoke test for the TasteHouse demo backend.
// Run: node server/smoke.js
// Requires the server to be reachable at http://localhost:3001.

import assert from "node:assert";
import { API_BASE, PORT } from "./constants.js";

const BASE = `http://localhost:${PORT}${API_BASE}`;
let failures = 0;
let passed = 0;

async function check(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`PASS: ${name}`);
  } catch (err) {
    failures += 1;
    console.error(`FAIL: ${name} — ${err.message}`);
  }
}

function post(url, body) {
  return fetch(`${BASE}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function get(url) {
  return fetch(`${BASE}${url}`);
}

async function main() {
  await check("health endpoint", async () => {
    const res = await get("/health");
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(body.ok, "health body should be ok");
  });

  await check("cuisines endpoint", async () => {
    const res = await get("/cuisines");
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.cuisines) && body.cuisines.length > 0, "cuisines should be a non-empty array");
    assert.ok(body.cuisines[0].name, "first cuisine should have a name");
  });

  await check("dishes endpoint", async () => {
    const res = await get("/dishes?cuisine=Italian");
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.dishes) && body.dishes.length > 0, "dishes should be a non-empty array");
    assert.ok(body.dishes[0].id, "first dish should have an id");
  });

  await check("dish lookup by id", async () => {
    const list = await (await get("/dishes?cuisine=Italian")).json();
    const id = list.dishes[0].id;
    const res = await get(`/dishes/${id}`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.dish.id, id);
  });

  await check("order creation validates items", async () => {
    const res = await post("/orders", {
      customerName: "Jane Diner",
      address: "123 Market St, Apt 4",
      items: [],
    });
    assert.strictEqual(res.status, 400);
    const body = await res.json();
    assert.ok(body.error, "should return an error");
  });

  await check("order creation validates name", async () => {
    const res = await post("/orders", {
      customerName: "J",
      address: "123 Market St, Apt 4",
      items: [{ id: "1", name: "Margherita", unitPrice: 12.99, quantity: 1 }],
    });
    assert.strictEqual(res.status, 400);
  });

  await check("order creation succeeds and persists", async () => {
    const res = await post("/orders", {
      customerName: "Jane Diner",
      address: "123 Market St, Apt 4",
      items: [
        { id: "52771", name: "Margherita", unitPrice: 12.99, quantity: 2 },
        { id: "52766", name: "Carbonara", unitPrice: 11.99, quantity: 1 },
      ],
    });
    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.ok(body.orderId, "order should have an id");
    assert.strictEqual(body.status, "demo");
    assert.strictEqual(body.total, 37.97);

    const lookup = await get(`/orders/${body.orderId}`);
    assert.strictEqual(lookup.status, 200);
    const order = await lookup.json();
    assert.strictEqual(order.items.length, 2);
  });

  await check("order lookup for missing id", async () => {
    const res = await get("/orders/TH-NONEXISTENT-0000");
    assert.strictEqual(res.status, 404);
  });

  console.log(`\n${passed} passed, ${failures} failed`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Smoke test crashed:", err);
  process.exit(2);
});