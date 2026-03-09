require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.json());

app.use(session({
  secret: 'port-russell-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.error('Erreur MongoDB :', err));
 
app.get('/', (req, res) => {
  res.send('Serveur Port Russell OK avec MongoDB');
});
 
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/', reservationRoutes);
 
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});