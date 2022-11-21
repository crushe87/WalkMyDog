const mongoose = require('mongoose');
const Joi = require('joi');


const Walker = mongoose.model( 'Walker', new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    lastName:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    bio:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String
    } 
}));


function validateWalker(walker) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName:  Joi.string().min(3).required(),
        bio:  Joi.string().min(30).required(),
        email:  Joi.string().min(3).required(),
        password:  Joi.string().min(8).required(),
        phone:  Joi.string().min(8)
});

return schema.validate(walker);
}

exports.Walker = Walker;
exports.validateWalker = validateWalker;