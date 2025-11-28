// routes/listingRoutes.ts
import express from "express";
import { createListing } from "../controllers/listningController";
import { agentOnly } from "../middlewares/isAgentMiddleware";

const router = express.Router();

// Agent adds property/listing
router.post("/add", agentOnly, createListing);

export default router;
