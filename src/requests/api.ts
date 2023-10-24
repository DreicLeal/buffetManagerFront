import axios from "axios";

export const buffetManagerApi = axios.create({
  baseURL: "https://buffetmanagerapi007.onrender.com/",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});
