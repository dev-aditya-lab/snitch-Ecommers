import axios from "axios";

const baseUrl = "/api/products";
const productsApi = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const createProduct = async (formData) => {
  try {
    const response = await productsApi.post("/create", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getSellerProducts = async () => {
  try {
    const response = await productsApi.get("/seller-products");
    return response.data;
  } catch (error) {
    console.error("Error fetching seller products:", error);
    throw error;
  }
};