import express from 'express';
import {
  getMarketAnalytics,
  getHistoricalAnalytics,
  generateMonthlyReport,
  getMonthlySales,
  getDashboardMetrics,
} from '../controllers/analyticsController';
import { isAdmin } from '../middlewares/isAdminMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// GET /api/analytics/market - Get current market analytics
router.get('/market', authenticate, isAdmin, getMarketAnalytics);

// GET /api/analytics/historical - Get historical analytics
router.get('/historical', authenticate, isAdmin, getHistoricalAnalytics);

// POST /api/analytics/generate-report - Generate monthly report (admin only)
router.post('/generate-report', authenticate, isAdmin, generateMonthlyReport);

router.get("/monthly-sales", authenticate, getMonthlySales);

router.get("/dashboard-metrics", authenticate, getDashboardMetrics);


export default router;