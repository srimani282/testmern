const Joi = require('joi');
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['In', 'Out',],
        default: 'In',
    },
    visitorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visitor'
    },
}, { timestamps: true });


const Entry = mongoose.model('Entry', entrySchema);

// function validateUser(user) {
//     const schema = {
//         name: Joi.string().min(5).max(50).required(),
//         email: Joi.string().min(5).max(255).required().email(),
//         password: Joi.string().min(5).max(255).required()
//     };

//     return Joi.validate(user, schema);
// }

exports.Entry = Entry;
//exports.validate = validateUser;