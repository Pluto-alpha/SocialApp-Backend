import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';
import validateToken from '../middlewares/validateTokenHandler.js';
import upload from '../utils/multer.js';

router.use(validateToken);
router.get('/:id', userController.getUser);
router.put('/:id', upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'coverPic', maxCount: 1 }]), userController.updateUser);

export default router;