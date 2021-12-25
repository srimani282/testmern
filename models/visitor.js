const mongoose = require("mongoose");
const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 13,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  occupation: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

exports.Visitor = Visitor;
