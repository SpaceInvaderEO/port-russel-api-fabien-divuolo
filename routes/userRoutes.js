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

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

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
 
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email et mot de passe requis'
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: 'Utilisateur ou mot de passe incorrect'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Utilisateur ou mot de passe incorrect'
      });
    }

    req.session.userId = user._id;

    res.status(200).json({
      message: 'Connexion réussie',
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.put('/:email', async (req, res) => {
  try {
    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Utilisateur introuvable'
      });
    }

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

    if (!deleted) {
      return res.status(404).json({
        message: 'Utilisateur introuvable'
      });
    }

    res.json({ message: 'Utilisateur supprimé' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
 
router.get('/logout', (req, res) => {

  req.session.destroy(err => {

    if (err) {
      return res.status(500).json({
        message: 'Erreur lors de la déconnexion'
      });
    }

    res.clearCookie('connect.sid');

    res.status(200).json({
      message: 'Déconnexion réussie'
    });

  });

});

module.exports = router;