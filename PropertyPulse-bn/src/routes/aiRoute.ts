// routes/aiRoutes.ts
import express from "express";
import { generateListingAISummary } from "../controllers/aiController";

const router = express.Router();

router.post("/generate-ai-summary", generateListingAISummary);

export default router;
