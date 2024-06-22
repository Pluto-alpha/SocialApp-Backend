import express from 'express';
const router = express.Router();
import storyController from '../controllers/storyController.js';
import validateToken from '../middlewares/validateTokenHandler.js';
import upload from '../utils/multer.js';

router.use(validateToken);
router.get('/', storyController.getStories);
router.post('/', upload.single('image'), storyController.addStory);
router.delete('/:id', storyController.deleteStory);


export default router;