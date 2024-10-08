import express from 'express';
import MeetsController from '../controllers/meets.js'

const router = express.Router();

router.get('/', MeetsController.getMeets)

export default router