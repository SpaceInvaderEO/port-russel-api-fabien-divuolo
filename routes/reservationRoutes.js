const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
 
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('user', 'username email')
      .populate('catway', 'name location');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('user', 'username email')
      .populate('catway', 'name location');
    if (!reservation) return res.status(404).json({ message: 'Reservation introuvable' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post('/', async (req, res) => {
  const { user, catway, date, status } = req.body;
  const reservation = new Reservation({ user, catway, date, status });
  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedReservation) return res.status(404).json({ message: 'Reservation introuvable' });
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: 'Reservation introuvable' });
    res.json({ message: 'Reservation supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
