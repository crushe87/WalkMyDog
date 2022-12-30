
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Walker, validateWalker} = require('../models/walker');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const walkers = await Walker.find().sort('userName');
    res.send(walkers);
});

router.post('/', auth, async (req, res) => {
    const { error } = validateWalker(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let walker = new Walker({
        userName: req.body.userName,
        bio: req.body.bio,
        email: req.body.email
    });
        walker = await walker.save();

        res.send(walker);
});


router.put('/:id', async (req, res) => {
    //const { error } = validateWalker(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    const walker = await Walker.findByIdAndUpdate(req.params.id, {
            userName: req.body.userName,
            bio: req.body.bio,
            email: req.body.email
        }, 
        { new: true });

    if (!walker) return res.status(404).send('The walker with the given id cannot be found');

    res.send(walker);
});


router.delete('/:id', async (req, res) => {
    const walker = await Walker.findByIdAndRemove(req.params.id);
    
    if (!walker) return res.status(404).send('The walker with the given id cannot be found');

    res.send(walker);
});

router.get('/:id', async (req, res) => {
    const walker = await Walker.findById(req.params.id);

    if(!walker) return res.status(404).send('The walker with this id was not found');

    res.send(walker);
});


module.exports = router;