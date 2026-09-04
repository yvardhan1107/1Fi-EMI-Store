import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await API.get(`/products/${slug}`);
  return response.data;
};

/**
 * Helper to resolve production image URL whether relative or absolute
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  const backendBase = apiBase.replace(/\/api\/?$/, "");
  return `${backendBase}${imagePath}`;
};