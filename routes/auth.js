
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');


    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['email','password']));

    //const token = user.generateAuthToken();
    //res.send(email, password);
    //const token = user.generateAuthToken();
    //res.header('x-auth-token', token).send(token);

});


function validate(req) {
    const schema = Joi.object({
        email:  Joi.string().min(3).required().email(),
        password:  Joi.string().min(8).required()
});

return schema.validate(req);
}

module.exports = router;