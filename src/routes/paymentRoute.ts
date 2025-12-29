import express from 'express'
import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { agentOnly } from "../middlewares/isAgentMiddleware";
import { createAgentCheckoutSession } from "../controllers/paymentController";

const router = express.Router();

router.post(
  "/checkout",
  authenticate,
  agentOnly,
  createAgentCheckoutSession
);

export default router
