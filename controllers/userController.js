const User = require('../models/User');
 
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (err) {
    if (err.code === 11000) { 
      return res.status(400).json({ message: 'Email ou username déjà utilisé', error: err.keyValue });
    }
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};