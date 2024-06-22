import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';

router.post('/register', authController.Register);
router.post('/login', authController.Login);
router.post('/logout', authController.Logout);


export default router;