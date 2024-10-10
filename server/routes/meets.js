import express from 'express';
import MeetsController from '../controllers/meets.js'

const router = express.Router();

router.get('/', MeetsController.getMeets)
router.get('/:id', MeetsController.getMeetByID)

export default router