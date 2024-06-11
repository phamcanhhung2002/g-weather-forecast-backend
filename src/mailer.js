import nodemailer from "nodemailer";
import { MAILER } from "./constants/index.js";
import hbs from "nodemailer-express-handlebars";

const transporter = nodemailer.createTransport({
  host: MAILER.HOST,
  port: 465,
  secure: true,
  auth: {
    user: MAILER.USER,
    pass: MAILER.PASS,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "src/templates/",
      defaultLayout: false,
      partialsDir: "src/templates/",
    },
    viewPath: "src/templates/",
    extName: ".hbs",
  })
);

export { transporter };
