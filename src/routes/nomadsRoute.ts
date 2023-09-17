import { Router } from 'express';
import { getNomads } from '../controllers/nomadsController';

const router = Router();

router.route('/nomads').post(getNomads);

export default router;
