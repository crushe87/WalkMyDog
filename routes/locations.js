const {Location, validateLocation} = require('../models/location');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const locations = await Location.find();
    res.send(locations);
});


router.post('/', async (req, res) => {
    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let location = new Location({ 
        area: req.body.area
    });
    location = await location.save();

    res.send(location);
});


router.put('/:id', async (req, res) => {
    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = await Location.findByIdAndUpdate(req.params.id, { name: req.body.area }, { new: true });

    if (!location) return res.status(404).send('The location with the given id cannot be found');

    res.send(location);
});


router.delete('/:id', async (req, res) => {
    const location = await Location.findByIdAndRemove(req.params.id);
    
    if (!location) return res.status(404).send('The location with the given id cannot be found');

    res.send(location);
});

router.get('/:id', async (req, res) => {
    const location = await Location.findById(req.params.id);

    if(!location) return res.status(404).send('The location with this id was not found');

    res.send(location);
});


module.exports = router;