import express from 'express';
const router = express.Router();
import commentController from '../controllers/commentsController.js';
import validateToken from '../middlewares/validateTokenHandler.js';

router.use(validateToken);
router.get('/:postId', commentController.getComments);
router.post('/:postId', commentController.addComment);
router.delete('/:id', commentController.deleteComment);


export default router;