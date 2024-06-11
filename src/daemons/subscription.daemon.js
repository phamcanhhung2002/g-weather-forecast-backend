import "../database.js";
import schedule from "node-schedule";
import { Email } from "../models/email.schema.js";
import { MAILER, WEATHER_API } from "../constants/index.js";
import { transporter } from "../mailer.js";
import { axiosClient } from "../axios-client.js";

const formatWind = (windInKPH) => {
  return parseFloat((windInKPH * 5) / 18).toFixed(2);
};

const getContextFromData = (data) => {
  const { location, current, forecast } = data;
  const { name, localtime } = location;
  const { temp_c, wind_kph, humidity, condition } = current;
  const { text, icon } = condition;
  const { forecastday } = forecast;

  const forecasts = forecastday.map((f) => {
    const { date, day } = f;
    const { avgtemp_c, maxwind_kph, avghumidity, condition } = day;

    const { icon, text } = condition;
    return {
      date,
      icon,
      text,
      temp: avgtemp_c,
      wind: formatWind(maxwind_kph),
      humid: avghumidity,
    };
  });

  return {
    name,
    icon,
    text,
    localtime: localtime.split(" ")[0],
    temp: temp_c,
    wind: wind_kph,
    humid: humidity,
    forecasts,
  };
};

const sendWeatherForecastEmail = async (email, q) => {
  try {
    const { data } = await axiosClient.get(WEATHER_API.FORECAST, {
      params: {
        q,
        days: 4,
      },
    });

    await transporter.sendMail({
      from: MAILER.USER,
      to: email,
      subject: "Your weather today",
      template: "weather",
      context: getContextFromData(data),
    });
  } catch (err) {
    console.error(err.stack);
    console.log(`Error: ${err.message}`);
  }
};

const rule = new schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 0;
rule.tz = "Asia/Ho_Chi_Minh";

schedule.scheduleJob(rule, async () => {
  try {
    console.log("Start to send weather forecast emails.");
    const recipientEmails = await Email.find({
      isVerified: true,
    });
    const promises = recipientEmails.map((email) =>
      sendWeatherForecastEmail(email.email, email.location)
    );

    await Promise.all(promises);
  } catch (err) {
    console.error(err.stack);
    console.log(`Error: ${err.message}`);
  }
});
