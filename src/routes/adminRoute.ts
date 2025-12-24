import express from "express"
import { isAdmin } from "../middlewares/isAdminMiddleware"
import { 
    approveListing ,
    rejectListing,
    getPendingListnings , 
    getAllAgents , 
    activateAgent , 
    deactivateAgent,
    getAllListings,
    getSingleListing,
    updateListing,
    deleteListing
} from "../controllers/adminController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/approve" ,authenticate, isAdmin, approveListing)
router.post("/reject",authenticate , isAdmin , rejectListing)
router.get("/pending-listnings", authenticate, isAdmin, getPendingListnings)
router.put("/agents/:id/deactivate",authenticate, isAdmin, deactivateAgent)
router.put("/agents/:id/active" , authenticate , isAdmin , activateAgent)
router.get("/agents" , authenticate, isAdmin , getAllAgents)
router.get('/listnings',authenticate,isAdmin,getAllListings)
router.get('/single-listning/:id' , authenticate ,isAdmin, getSingleListing)
router.put('/update-listning/"id' , authenticate, isAdmin , updateListing)
router.delete('/delete-listning/:id' , authenticate , isAdmin , deleteListing)

export default router;