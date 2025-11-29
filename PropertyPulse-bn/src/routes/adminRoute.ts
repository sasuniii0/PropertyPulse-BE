import express from "express"
import { isAdmin } from "../middlewares/isAdminMiddleware"
import { approveListing ,rejectListing} from "../controllers/adminController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/approve" ,authenticate, isAdmin, approveListing)
router.post("/reject",authenticate , isAdmin , rejectListing)

export default router;