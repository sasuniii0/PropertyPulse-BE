import express from "express";
import { updateProfile, deleteAccount } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.put("/update", authenticate, updateProfile);
router.delete("/delete", authenticate, deleteAccount);

export default router;
