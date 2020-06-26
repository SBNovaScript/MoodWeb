const express = require('express');
const router = express.Router();
let Mood = require('../models/mood-model');

router.get('/', (req, res) => {
    Mood.find()
        .then(moods => res.json(moods))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const mood = req.body.mood;
    const details = req.body.details;
    const rating = Number(req.body.rating);
    const date = Date.parse(req.body.date);

    const newMood = new Mood({
        username,
        mood,
        details,
        rating,
        date
    });

    newMood.save()
        .then(() => res.json('Mood added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
    Mood.findById(req.params.id)
        .then(mood => res.json(mood))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/:id', (req, res) => {
    Mood.findByIdAndDelete(req.params.id)
        .then(mood => res.json('Mood deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/update/:id', (req, res) => {
    Mood.findById(req.params.id)
        .then(mood => {
            mood.username = req.body.username;
            mood.mood = req.body.mood;
            mood.details = req.body.details;
            mood.rating = Number(req.body.rating);
            mood.date = Date.parse(req.body.date);

            mood.save()
                .then(() => res.json('Mood updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;