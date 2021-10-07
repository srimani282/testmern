const Joi = require('joi');
const mongoose = require('mongoose');
const date = require('joi/lib/types/date');

const Job = mongoose.model('Jobs', new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 70
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'joined',],
    default: 'applied'
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  altMail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  dob: {
    type: Date,
    requred: true,
  },
  age: {
    type: Number,
    min: 4,
    Max: 5,
    required: true,
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'others',],
    required: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },
  altPhone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    unique: true
  },
  fatherName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  fatherNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  fatherOccupation: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  fatherPhone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  motherNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  motherOccupation: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  motherPhone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,

  },
  gaurdianNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 70,
  },
  gaurdianOccupation: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  gaurdianPhone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,

  },
  presentAddress1: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  presentAddress2: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  presentCity: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  presentState: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  presentPin: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10,
  },
  isAddressSame: {
    type: Boolean,
    required: true,
    default: false,
  },
permanentAddress1: {
  type: String,
  minlength: 5,
  maxlength: 255,
},
permanentAddress2: {
  type: String,
  minlength: 5,
  maxlength: 255,
},
permanentCity: {
  type: String,
  minlength: 5,
  maxlength: 50,
},
permanentState: {
  type: String,
  minlength: 5,
  maxlength: 50,
},
permanentPin: {
  type: String,
  minlength: 5,
  maxlength: 10,
},
qualification:{
  type: String,
  minlength: 5,
  maxlength: 10,
},
employedStatus:{
  type: String,
  minlength: 5,
  maxlength: 10,
},
expectedCtc:{
  type:Number,
},
expectedCtc:{
  type:Number,
},
languages:{
  type:Array,
  
}




}, { timestamps: true }));

function validatePack(Job) {
  const schema = {
    uniqueNumber: Joi.string().min(5).max(50).required(),
    isWith: Joi.string().min(5).max(50).required(),
    price: Joi.number().min(0).required(),
  };

  return Joi.validate(Job, schema);
}

exports.Job = Job;
exports.validate = validatePack;