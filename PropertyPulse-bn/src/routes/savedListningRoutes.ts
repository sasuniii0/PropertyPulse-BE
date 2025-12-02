import express from "express"
import { authenticate } from "../middlewares/authMiddleware"
import { saveListing,removeSavedListing,getSavedListings } from "../controllers/savedListnings"

const router = express.Router();

router.post("/save/:id" , authenticate, saveListing)
router.delete("/remove/:id" , authenticate , removeSavedListing)
router.get("/" , authenticate , getSavedListings)

export default router;