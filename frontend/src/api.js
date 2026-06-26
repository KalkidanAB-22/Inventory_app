// This keeps Axios configuration in one place

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export default API;