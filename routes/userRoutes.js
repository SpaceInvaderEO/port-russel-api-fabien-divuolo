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
 
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User introuvable' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User introuvable' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User introuvable' });
    res.json({ message: 'User supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
