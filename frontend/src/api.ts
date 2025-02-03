// src/api.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10-second timeout
});

export const getHome = async (): Promise<string> => {
  try {
    const response = await instance.get<string>("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default instance;
