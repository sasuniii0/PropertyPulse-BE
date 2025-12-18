import express from "express";
import { updateProfile, deleteAccount , getMyDetails } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.put("/updateMe", authenticate, updateProfile);
router.delete("/deleteMe", authenticate, deleteAccount);
router.get("/me", authenticate, getMyDetails);

export default router;
