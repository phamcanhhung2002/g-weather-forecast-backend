import express from "express";
import * as WeatherService from "./weather.service.js";
import { query } from "express-validator";

export const weatherRouter = express.Router();

weatherRouter.get(
  "/",
  query("q").notEmpty().escape().trim(),
  query("days").optional().escape().isInt({
    min: 1,
    max: 10,
  }),
  WeatherService.getWeather
);
