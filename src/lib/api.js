
const BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

const BACKUP_URL =
  "https://api.api-store.workers.dev/api/bazardor";

function extractCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.[collectionName])) {
    return payload[collectionName];
  }

  throw new Error(
    `API response did not contain a valid ${collectionName} array`
  );
}

async function request(endpoint) {
  for (const baseUrl of [BASE_URL, BACKUP_URL]) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (baseUrl === BACKUP_URL) {
        throw error;
      }
    }
  }
}

export const getProducts = async () =>
  extractCollection(await request("/products"), "products");

export const getCategories = () => request("/categories");

export const getProduct = (id) =>
  request(`/products/${encodeURIComponent(id)}`);

export const getCategory = (slug) =>
  request(`/categories/${encodeURIComponent(slug)}`);

export const getProductsByCategory = (slug) =>
  request(`/products?category=${encodeURIComponent(slug)}`);
