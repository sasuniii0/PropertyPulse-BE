import express from "express"
import { getPendingAgents,approveAgent,rejectAgent } from "../controllers/adminController"
import { isAdmin } from "../middlewares/isAdminMiddleware"

const router = express.Router();

// Get all pending agents
router.get("/pending-agents", isAdmin, getPendingAgents);

// Approve agent
router.put("/approve-agent/:userId", isAdmin, approveAgent);

// Reject agent
router.put("/reject-agent/:userId", isAdmin, rejectAgent);

export default router;