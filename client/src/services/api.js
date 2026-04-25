import axios from "axios";

const developmentApiUrl = "http://localhost:3000";
const productionApiUrl = import.meta.env.VITE_BACKEND_URL;

export const API_BASE_URL = import.meta.env.DEV ? developmentApiUrl : productionApiUrl;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
