const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    catway: { type: mongoose.Schema.Types.ObjectId, ref: 'Catway', required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);