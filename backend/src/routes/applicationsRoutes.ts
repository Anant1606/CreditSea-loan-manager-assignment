// backend/src/routes/applicationRoutes.ts
import express from 'express';
import {
  submitApplication,
  getApplications,
  getDashboardStats,
  getAdminStats,
  getVerifierStats,
  getUserStats
} from '../controllers/applicationsControllers';

const router = express.Router();

router.post('/', submitApplication);
router.get('/', getApplications);
router.get('/stats', getDashboardStats);

// Role‑specific stat endpoints:
router.get('/stats/admin',    getAdminStats);
router.get('/stats/verifier', getVerifierStats);
router.get('/stats/user',     getUserStats);

export default router;
