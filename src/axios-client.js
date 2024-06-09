import axios from "axios";
import { WEATHER_API } from "./constants/index.js";

export const axiosClient = axios.create({
  baseURL: WEATHER_API.BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  params: {
    key: WEATHER_API.KEY,
  },
});
