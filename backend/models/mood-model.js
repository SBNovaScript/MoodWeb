const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moodSchema = new Schema({
    username: {type: String, required: true},
    mood: {type: String, required: true},
    details: {type: String, required: false},
    rating: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timestamps: true
});

const Exercise = mongoose.model('Mood', moodSchema);

module.exports = Exercise;