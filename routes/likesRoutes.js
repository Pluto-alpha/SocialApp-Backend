import express from 'express';
const router = express.Router();
import likesController from '../controllers/likeController.js';
import validateToken from '../middlewares/validateTokenHandler.js';

router.use(validateToken);
router.get('/:postId', likesController.getLikes);
router.post('/', likesController.addLike);
router.delete('/:id', likesController.deleteLike);


export default router;