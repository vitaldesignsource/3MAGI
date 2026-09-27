import { Router } from 'express';
import healthCheck from './health-check.js';
import subscriptionsRouter from './ecommerce/subscriptions.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.use('/ecommerce/subscriptions', authMiddleware, subscriptionsRouter);

    return router;
};

