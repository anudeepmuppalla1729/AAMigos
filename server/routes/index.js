import express from 'express';
import authRoutes from './auth.js';
import setupRoutes from './setup.js';
import agentRoutes from './agentMain.js'
import customerRoutes from './customerMain.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/setup' , setupRoutes);
router.use('/agent', agentRoutes);
router.use('/customer', customerRoutes);

export default router;