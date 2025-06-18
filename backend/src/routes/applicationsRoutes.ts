import express from 'express';
import { submitApplication, getAllApplications, getDashboardStats } from '../controllers/applicationsControllers';

const router = express.Router();

router.post('/', submitApplication);
router.get('/', getAllApplications);
router.get('/stats', getDashboardStats);

export default router;
