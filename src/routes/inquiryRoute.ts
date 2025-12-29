import express from 'express'
import {
    createInquiry,
    getClientInquiries,
    getAgentInquiries,
    respondToInquiry,
    closeInquiry,
    getRecentInquiries
} from '../controllers/inquiryController'
import { authenticate } from '../middlewares/authMiddleware'
import { requireRole } from '../middlewares/roleRequiredMiddleware'
import { Role } from '../models/userModel';

const router = express.Router();

//CLIENT
router.post("/create" , authenticate, requireRole([Role.CLIENT]), createInquiry)
router.get("/my" , authenticate,requireRole([Role.CLIENT]) , getClientInquiries)

//AGENT
router.get("/agent", authenticate, requireRole([Role.AGENT]), getAgentInquiries);
router.patch("/:id/respond", authenticate, requireRole([Role.AGENT]), respondToInquiry);
router.patch("/:id/close", authenticate, requireRole([Role.AGENT]), closeInquiry);

router.get("/recent", authenticate, getRecentInquiries);

export default router;