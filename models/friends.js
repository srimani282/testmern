const mongoose = require('mongoose');
const Friend = mongoose.model('Friends', new mongoose.Schema({

    friends: [{ type: ObjectId, ref: 'User' }],
    status: {
        type: String,
        enum: ['friends', 'blocked', 'requested'],
    },


}, { timestamps: true }));

exports.Friend = Friend;