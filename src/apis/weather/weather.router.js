import express from "express";
import * as WeatherService from "./weather.service.js";
import { query } from "express-validator";

export const weatherRouter = express.Router();

weatherRouter.get(
  "/",
  query("q").notEmpty().escape().trim(),
  WeatherService.getWeather
);
