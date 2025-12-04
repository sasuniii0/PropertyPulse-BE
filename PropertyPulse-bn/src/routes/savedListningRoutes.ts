import express from "express"
import { authenticate } from "../middlewares/authMiddleware"
import { requireRole } from "../middlewares/roleRequiredMiddleware";
import { saveListing,removeSavedListing,getSavedListings } from "../controllers/savedListnings"
import { Role } from "../models/userModel";

const router = express.Router();

router.post("/save/:id" , authenticate, saveListing ,requireRole([Role.CLIENT]) )
router.delete("/remove/:id" , authenticate , removeSavedListing ,requireRole([Role.CLIENT]))
router.get("/" , authenticate , getSavedListings , requireRole([Role.CLIENT]))

export default router;