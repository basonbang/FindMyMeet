import express from 'express';
import MeetsController from '../controllers/meets.js'

const router = express.Router();

router.get('/', MeetsController.getStates)
router.get('/:state', MeetsController.getNumberOfMeetsForState, MeetsController.getMeetsByState)

export default router