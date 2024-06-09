import { HttpStatusCode } from "axios";
import { validationResult } from "express-validator";
import { WEATHER_API } from "../../constants/index.js";
import { axiosClient } from "../../axios-client.js";

export const getWeather = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: result.array() });
  }

  try {
    const { q, days } = req.query;

    const { data } = await axiosClient.get(WEATHER_API.FORECAST, {
      params: {
        q,
        days,
      },
    });

    return res.json(data);
  } catch (err) {
    const statusCode = err?.response?.status;
    const errorCode = err?.response?.data?.error?.code;

    if (statusCode === 400 && errorCode === 1006) {
      return res.status(HttpStatusCode.BadRequest).json({
        message:
          "You should input your city names or latitude and longitude correctly!",
      });
    }

    next(err);
  }
};
