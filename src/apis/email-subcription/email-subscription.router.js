import express from "express";
import { body, param } from "express-validator";
import * as EmailSubscriptionService from "./email-subscription.service.js";

export const emailSubcriptionRouter = express.Router();

emailSubcriptionRouter.post(
  "/subcribe/email",
  body("email").escape().trim().isEmail(),
  EmailSubscriptionService.subscribe
);

emailSubcriptionRouter.get(
  "/unsubcribe/:email",
  param("email").escape().trim().isEmail(),
  EmailSubscriptionService.unsubcribe
)

emailSubcriptionRouter.get(
  "/verify/:token",
  param("token").escape().trim(),
  EmailSubscriptionService.verify
);
