const mongoose = require('mongoose');
const Request = mongoose.model('Request', new mongoose.Schema({

    requesterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, { timestamps: true }));


exports.Request = Request;