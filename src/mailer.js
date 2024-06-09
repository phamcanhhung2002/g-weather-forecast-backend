import nodemailer from "nodemailer";
import { MAILER } from "./constants/index.js";

export const transporter = nodemailer.createTransport({
  host: MAILER.HOST,
  port: 465,
  secure: true,
  auth: {
    user: MAILER.USER,
    pass: MAILER.PASS,
  },
});
