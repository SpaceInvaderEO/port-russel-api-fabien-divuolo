require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch(err => console.error('Erreur MongoDB :', err));
 
app.get('/', (req, res) => {
    res.send('Serveur Port Russell OKKKKKK avec MongoDB');
});
 
app.listen(PORT, () => {
    console.log(`Serveur démarré avec succès sur http://localhost:${PORT}`);
});