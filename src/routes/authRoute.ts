import { Router } from 'express';
import {
  ApproveUser,
  deleteUser,
  getAllUsers,
  login,
  register,
} from '../controllers/authController';
import { generatePdf } from '../controllers/qrController';

const router = Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/users').get(getAllUsers);
router.route('/delete-user/:id').delete(deleteUser);
router.route('/approve-user/:id').patch(ApproveUser);

export default router;
