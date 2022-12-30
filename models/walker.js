const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const schema = new Schema({ 
    userName: String,
    bio: String,
    email: String
});
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
const Walker = mongoose.model('Walker', schema);


function validateWalker(walker) {
    const schema = Joi.object({
        userName: Joi.string().min(3).required(),
        bio:  Joi.string().min(30).required(),
        email:  Joi.string().min(3).required()
});

return schema.validate(walker);
}

exports.Walker = Walker;
exports.validateWalker = validateWalker;



