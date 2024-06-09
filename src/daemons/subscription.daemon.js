import "../database.js";
import schedule from "node-schedule";
import { Email } from "../models/email.schema.js";
import { MAILER, WEATHER_API } from "../constants/index.js";
import { transporter } from "../mailer.js";
import { axiosClient } from "../axios-client.js";

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
      text: JSON.stringify(data),
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
    const recipientEmails = await Email.find();
    const promises = recipientEmails.map((email) =>
      sendWeatherForecastEmail(email.email, email.location)
    );

    await Promise.all(promises);
  } catch (err) {
    console.error(err.stack);
    console.log(`Error: ${err.message}`);
  }
});
