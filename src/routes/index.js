// routes/index.js
import express from 'express';
import authRoutes from './auth';

const router = express.Router();
/* GET home page. */

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);

export default router;