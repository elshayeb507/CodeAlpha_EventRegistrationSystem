const express = require('express');
const router = express.Router();
const {
  getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect, organizerOnly } = require('../middleware/authMiddleware');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', protect, organizerOnly, createEvent);
router.put('/:id', protect, organizerOnly, updateEvent);
router.delete('/:id', protect, organizerOnly, deleteEvent);
module.exports = router;