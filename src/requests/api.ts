import axios from "axios";

export const buffetManagerApi = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});
