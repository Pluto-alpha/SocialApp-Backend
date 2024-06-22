import express from 'express';
import authRoutes from './authRoutes.js';
import postsRoutes from './postsRoutes.js';
import commentRoutes from './commentsRoutes.js';
import likesRoutes from './likesRoutes.js';
import relationshipRoutes from './relationshipRoutes.js';
import storyRoutes from './storyRoutes.js';
import usersRoutes from './usersRoutes.js';

const router = express.Router();

// Add routes
router.use('/auth', authRoutes);
router.use('/post', postsRoutes);
router.use('/comment', commentRoutes);
router.use('/likes', likesRoutes);
router.use('/relationship', relationshipRoutes);
router.use('/story', storyRoutes);
router.use('/user', usersRoutes);


export default router;
