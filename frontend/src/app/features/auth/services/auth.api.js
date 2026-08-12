import axios from "axios";

const API_URL = "/api/auth";

const authApiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});



export async function registerUser({ email, password, contact, fullName, isSeller=false }) {
  try {
    const response = await authApiInstance.post("/register", { email, password, contact, fullName, isSeller });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await authApiInstance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getCurrentUser() {
  try {
    const response = await authApiInstance.get("/get-user");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}