import express from 'express';
import CustomMeetController from '../controllers/customMeets.js'

const router = express.Router();

router.get('/', CustomMeetController.getCustomMeets)
router.get('/:id', CustomMeetController.getCustomMeetByID)
router.post('/', CustomMeetController.createCustomMeet)
router.patch('/:id', CustomMeetController.updateCustomMeet)
router.delete('/:id', CustomMeetController.deleteCustomMeet)

export default router