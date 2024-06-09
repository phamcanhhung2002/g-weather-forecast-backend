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
    const { q } = req.query;

    const { data } = await axiosClient.get(WEATHER_API.CURRENT, {
      params: {
        q,
      },
    });

    return res.json(data);
  } catch (err) {
    const responseStatus = err?.response?.status;
    if (responseStatus == 400) {
      return res.status(HttpStatusCode.BadRequest).json({
        message: "You should input your city names or latitude and longitude!",
      });
    }

    next(err);
  }
};
