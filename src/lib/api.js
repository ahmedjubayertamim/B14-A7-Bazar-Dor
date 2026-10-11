
const BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

const BACKUP_URL =
  "https://api.api-store.workers.dev/api/bazardor";

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

export const getProducts = () => request("/products");

export const getCategories = () => request("/categories");

export const getProduct = (id) =>
  request(`/products/${encodeURIComponent(id)}`);

export const getCategory = (slug) =>
  request(`/categories/${encodeURIComponent(slug)}`);

export const getProductsByCategory = (slug) =>
  request(`/products?category=${encodeURIComponent(slug)}`);
