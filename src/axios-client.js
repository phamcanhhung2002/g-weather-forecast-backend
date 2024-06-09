import axios from "axios";
import { WEATHER_API } from "./constants/index.js";
import queryString from "query-string";

export const axiosClient = axios.create({
  baseURL: WEATHER_API.BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  params: {
    key: WEATHER_API.KEY,
  },
  paramsSerializer: {
    serialize: (params) => {
      return queryString.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      });
    },
  },
});
