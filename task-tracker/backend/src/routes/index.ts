import { Router } from 'express';
import authRoutes from './auth.routes';
import taskRoutes from './tasks.routes';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

export default router;
