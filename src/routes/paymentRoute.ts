import express from 'express'
import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { agentOnly } from "../middlewares/isAgentMiddleware";
import { createAgentCheckoutSession ,confirmPayment} from "../controllers/paymentController";

const router = express.Router();

router.post(
  "/checkout",
  authenticate,
  agentOnly,
  createAgentCheckoutSession
);

router.post("/update", authenticate,agentOnly,confirmPayment);   // mark payment as PAID

export default router
