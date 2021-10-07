const Joi = require('joi');
const mongoose = require('mongoose');  
const Order = mongoose.model('Orders', new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  packId:{
     type: mongoose.Schema.Types.ObjectId,
     required: true, 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  orderTime:{
    type: Date, 
    required: true,
    default: Date.now  
  },
}));

function validateOrder(Order) {
  const schema = {
    packId: Joi.objectId().required(),
  };

  return Joi.validate(Order, schema);
}

exports.Order = Order; 
exports.validate = validateOrder;