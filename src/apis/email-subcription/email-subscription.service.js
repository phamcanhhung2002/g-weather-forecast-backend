import { HttpStatusCode } from "axios";
import { validationResult } from "express-validator";
import { Email } from "../../models/email.schema.js";
import { transporter } from "../../mailer.js";
import {
  MAILER,
  SECRET,
  API,
  PORT,
  TOKEN_EXPIRE_TIME,
} from "../../constants/api.js";
import jwt from "jsonwebtoken";

export const subscribe = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: result.array() });
  }

  const { email } = req.body;

  const token = jwt.sign({ email }, SECRET, { expiresIn: TOKEN_EXPIRE_TIME });

  try {
    const newEmail = new Email({
      email,
      token,
    });

    await newEmail.save();

    await transporter.sendMail({
      from: MAILER.USER,
      to: email,
      subject: "Confirm your email",
      text: `Click in this link to confirm your mail: http://localhost:${PORT}${API.PREFIX}/verify/${token}`,
    });

    return res.json({
      message: "Verification email sent!",
    });
  } catch (err) {
    const errorResponse = err?.errorResponse;
    const errorCode = errorResponse?.code;
    const email = errorResponse?.keyValue?.email;

    if (errorCode === 11000) {
      return res.status(HttpStatusCode.Conflict).json({
        message: `Email ${email} is already subscribed!`,
      });
    }

    next(err);
  }
};

export const verify = async (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ errors: result.array() });
  }

  const { token } = req.params;

  jwt.verify(token, SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(HttpStatusCode.BadRequest).json({
          message: "Your verification link is expired!",
        });
      }

      return res.status(HttpStatusCode.BadRequest).json({
        message: "Invalid token!",
      });
    }

    const { email } = decoded;

    try {
      const verifiedEmail = await Email.findOne({
        email,
      });

      (verifiedEmail.isVerified = true), (verifiedEmail.token = "");

      await verifiedEmail.save();

      return res.json({
        message: "Email has been verified!",
      });
    } catch (err) {
      next(err);
    }
  });
};
