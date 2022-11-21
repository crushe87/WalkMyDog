const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');



const userSchema = new mongoose.Schema({
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
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}


const User = mongoose.model( 'User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName:  Joi.string().min(3).required(),
        email:  Joi.string().min(3).required().email(),
        password:  Joi.string().min(8).required()
});

return schema.validate(user);
}


exports.User = User;
exports.validateUser = validateUser;