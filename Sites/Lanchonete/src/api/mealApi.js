const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    ...options,
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(body.error || "Request failed");
    error.status = res.status;
    throw error;
  }
  return body;
}

export function getCuisines() {
  return request("/cuisines").then((body) => body.cuisines || []);
}

export function getDishes({ cuisine = "", q = "" } = {}) {
  const params = new URLSearchParams();
  if (cuisine) params.set("cuisine", cuisine);
  if (q) params.set("q", q);
  const query = params.toString();
  return request(`/dishes${query ? `?${query}` : ""}`).then(
    (body) => body.dishes || []
  );
}

export function getDish(id) {
  return request(`/dishes/${encodeURIComponent(id)}`).then((body) => body.dish);
}

export function createDemoOrder(payload) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
