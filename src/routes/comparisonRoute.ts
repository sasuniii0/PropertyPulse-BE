import express from 'express';
import { compareProperties } from '../controllers/comparisonController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// POST /api/properties/compare - Compare two properties
router.post('/compare', authenticate, compareProperties);

export default router;