const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');
 
router.get('/', async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.get('/:id', async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post('/', async (req, res) => {
  const { name, location, capacity } = req.body;
  const catway = new Catway({ name, location, capacity });
  try {
    const newCatway = await catway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCatway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json(updatedCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    const deletedCatway = await Catway.findByIdAndDelete(req.params.id);
    if (!deletedCatway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
