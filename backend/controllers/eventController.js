const { model } = require('mongoose');
const Event = require('../models/Event');
//retrieve all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

//retrieve a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};
//create a new event
const createEvent = async (req, res) => {
  try {
    const { title, description, location, event_date, capacity } = req.body;

    if (!title || !location || !event_date || !capacity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newEvent = await Event.create({ title, description, location, event_date, capacity });


    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

//update an existing event

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.update(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
};

//delete an event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.destroy();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
