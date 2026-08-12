import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

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