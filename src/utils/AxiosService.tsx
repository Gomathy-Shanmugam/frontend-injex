import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Your NestJS backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
