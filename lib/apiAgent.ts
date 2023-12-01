// apiAgent.js

import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const API_URL = "https://reqres.in/api";

// Create a cache adapter with a maximum age of 15 minutes
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: cache.adapter,
});

export { axiosInstance };
