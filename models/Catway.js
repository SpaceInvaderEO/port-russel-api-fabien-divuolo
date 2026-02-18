const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    capacity: Number
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);