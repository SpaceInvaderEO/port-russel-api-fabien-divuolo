const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
 
router.get('/catways/:id/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find({
      catwayNumber: req.params.id
    });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.get('/catways/:id/reservations/:idReservation', async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    });
    if (!reservation) return res.status(404).json({ message: 'Reservation introuvable' });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post('/catways/:id/reservations', async (req, res) => {
  try {
    const reservation = new Reservation({
      ...req.body,
      catwayNumber: req.params.id
    });
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.put('/catways/:id/reservations/:idReservation', async (req, res) => {
  try {
    const updated = await Reservation.findOneAndUpdate(
      { _id: req.params.idReservation, catwayNumber: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Reservation introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Reservation.findOneAndDelete({
      _id: req.params.idReservation,
      catwayNumber: req.params.id
    });
    if (!deleted) return res.status(404).json({ message: 'Reservation introuvable' });
    res.json({ message: 'Reservation supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
