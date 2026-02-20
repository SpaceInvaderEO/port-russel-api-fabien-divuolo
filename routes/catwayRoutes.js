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
    const catway = await Catway.findOne({ 
      catwayNumber: req.params.id 
    });
    if (!catway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post('/', async (req, res) => {
  try {
    const catway = new Catway(req.body);
    const newCatway = await catway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const updated = await Catway.findOneAndUpdate(
      { catwayNumber: req.params.id },
      { catwayState: req.body.catwayState },
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
    const deleted = await Catway.findOneAndDelete({ 
      catwayNumber: req.params.id 
    });
    if (!deletedCatway) return res.status(404).json({ message: 'Catway introuvable' });
    res.json({ message: 'Catway supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
