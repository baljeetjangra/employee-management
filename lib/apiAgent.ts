// apiAgent.js

import axios from "axios";
import { setupCache } from "axios-cache-adapter";

const API_URL = "https://dummy.restapiexample.com/api/v1";

// Create a cache adapter with a maximum age of 15 minutes
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

const cachedApiAgent = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: cache.adapter,
});

const apiAgent = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { cachedApiAgent, apiAgent };
