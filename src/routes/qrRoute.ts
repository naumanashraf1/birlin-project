import { Router } from 'express';

import { generatePdf } from '../controllers/qrController';

const router = Router();

router.route('/qr-pdf/:iteration').get(generatePdf);

export default router;
