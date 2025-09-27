import Router from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js';
import { dashboardController } from '../controllers/private.controller.js';

const router = Router();

router.get('/dashboard' , authMiddleware , dashboardController);

export default router;