const mongoose = require('mongoose');
const Joi = require('joi');

const Location = mongoose.model( 'Location', new mongoose.Schema({
    area:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    }
}));


function validateLocation(location) {
    const schema = Joi.object({
        area: Joi.string().min(2).max(20).required()
});

return schema.validate(location);
}

exports.Location = Location;
exports.validateLocation = validateLocation;
