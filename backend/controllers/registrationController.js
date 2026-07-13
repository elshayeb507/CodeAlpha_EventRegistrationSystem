const Registration = require('../models/Registration')
const Event = require('../models/Event')

const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (new Date(event.event_date) < new Date()) {
      return res.status(400).json({ message: 'Registration closed: event date has passed' })
    }

    const existingRegistration = await Registration.findOne({
      where: { user_id: userId, event_id: eventId, status: 'confirmed' },
    });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' });
    }

    const confirmedCount = await Registration.count({
      where: { event_id: eventId, status: 'confirmed' },
    });
    if (confirmedCount >= event.capacity) {
      return res.status(400).json({ message: 'Event is fully booked' });
    }

    const newRegistration = await Registration.create({
      user_id: userId,
      event_id: eventId,
      status: 'confirmed',
    });

    res.status(201).json({ message: 'Registered successfully', registration: newRegistration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const cancelRegistration = async (req, res) => {
  try {
    const registrationId = req.params.id;
    const userId = req.user.id;

    const registration = await Registration.findByPk(registrationId);

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (registration.user_id !== userId) {
      return res.status(403).json({ message: 'You can only cancel your own registration' });
    }

    registration.status = 'cancelled';
    await registration.save();

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMyRegistrations = async (req, res) => {
  try {
    const userId = req.user.id;

    const registrations = await Registration.findAll({
      where: { user_id: userId },
      include: Event,
    });

    res.status(200).json(registrations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerForEvent, cancelRegistration, getMyRegistrations };



