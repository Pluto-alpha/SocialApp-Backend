import express from 'express';
const router = express.Router();
import postsController from '../controllers/postsController.js';
import upload from '../utils/multer.js'
import validateToken from '../middlewares/validateTokenHandler.js';


router.use(validateToken)
router.get('/', postsController.GetAllPost);
router.post('/create',upload.single('image'), postsController.addPost);
router.delete('/:id', postsController.deletePost);



export default router;