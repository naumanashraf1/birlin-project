import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { generatePdf } from '../controllers/qrController';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/qr-pdf').post(generatePdf);

export default router;
