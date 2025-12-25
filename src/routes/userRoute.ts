import express from "express";
import { updateProfile, deleteAccount , getMyDetails, getUserById } from "../controllers/userController";
import { authenticate } from "../middlewares/authMiddleware";
import isClient from '../middlewares/isClientMiddleware'

const router = express.Router();

router.put("/updateMe", authenticate, updateProfile);
router.delete("/deleteMe", authenticate, deleteAccount);
router.get("/me", authenticate, getMyDetails);
router.get("/:id" ,authenticate ,getUserById)

export default router;
