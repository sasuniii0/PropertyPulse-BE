// routes/listingRoutes.ts
import express from "express";
import { 
    createListing, 
    updateListing,
    deleteListing,
    getAgentListings,
    getAllListings,
    getListingById,
    searchListings,
    approvedListning
} from "../controllers/listningController";
import { agentOnly } from "../middlewares/isAgentMiddleware";
import { isAdmin } from "../middlewares/isAdminMiddleware";
import { authenticate } from "../middlewares/authMiddleware";
import { approveListing,rejectListing } from "../controllers/adminController";  
import { upload } from "../middlewares/multerMiddleware";

const router = express.Router();

// Agent adds property/listing
router.post("/add", authenticate, agentOnly, upload.array("images"), createListing);

router.put("/update/:id" , authenticate ,agentOnly,upload.array("images" , 20),updateListing);

router.delete("/delete/:id" , authenticate , agentOnly ,deleteListing);

router.get("/agent" , authenticate , agentOnly , getAgentListings);

router.get("/" , authenticate, getAllListings);

router.get("/search", searchListings);

router.get("/approved", authenticate ,approvedListning)

router.get("/:id" ,getListingById)


export default router;
