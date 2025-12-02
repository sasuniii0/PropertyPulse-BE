import express from "express"
import { isAdmin } from "../middlewares/isAdminMiddleware"
import { approveListing ,rejectListing , getAllAgents , activateAgent , deactivateAgent} from "../controllers/adminController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/approve" ,authenticate, isAdmin, approveListing)
router.post("/reject",authenticate , isAdmin , rejectListing)
router.put("/agents/:id/deactivate",authenticate, isAdmin, deactivateAgent)
router.put("/agents/:id/active" , authenticate , isAdmin , activateAgent)
router.get("/agents" , isAdmin , getAllAgents)

export default router;