import express from "express";
import { updateProfile, deleteAccount , getMyDetails, getUserById ,checkAgentPaymentStatus} from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import isClient from '../middlewares/isClientMiddleware'
import {agentOnly} from '../middlewares/isAgentMiddleware'

const router = express.Router();

router.put("/updateMe", authenticate, updateProfile);
router.delete("/deleteMe", authenticate, deleteAccount);
router.get("/me", authenticate, getMyDetails);
router.get("/:id" ,authenticate ,getUserById);
router.get("/payment-status",authenticate,agentOnly,checkAgentPaymentStatus);

export default router;
