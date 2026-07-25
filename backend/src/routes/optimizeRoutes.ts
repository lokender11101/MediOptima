import { Router } from 'express';
import { optimizeRoute } from '../controllers/optimizeController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Endpoint is protected via JWT in production, but let's make it open or mock it for testing if needed
// router.post('/', authenticateToken, optimizeRoute);
router.post('/', optimizeRoute); // Open for easy frontend integration testing right now

export default router;
