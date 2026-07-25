import { Router } from 'express';
import { getNearbyPharmacies } from '../controllers/pharmacyController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/nearby', authenticateToken, getNearbyPharmacies);

export default router;
