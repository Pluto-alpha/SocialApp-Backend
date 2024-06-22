import express from 'express';
const router = express.Router();
import relationController from '../controllers/relationshipController.js';
import validateToken from '../middlewares/validateTokenHandler.js';

router.use(validateToken);
router.get('/', relationController.getRelationships);
router.post('/', relationController.addRelationship);
router.delete('/:id', relationController.deleteRelationship);


export default router;