const express = require('express');
const router = express.Router();
const User = require('../models/User');
 
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ 
      email: req.params.email 
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.put('/:email', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:email', async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      email: req.params.email
    });
    if (!deleted) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
