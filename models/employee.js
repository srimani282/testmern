const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
    ,
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    }
    ,
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmployeeDetails'
    }
    ,
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024
    }
    ,
    userType: {
        type: String,
        default: 'employee',
    }
    ,
    salary: {
        type: Number,
        default: 0,
    }
});

employeeSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, userType: this.userType }, config.get('jwtPrivateKey'));
    return token;
}

const Employee = mongoose.model('Employee', employeeSchema);

function validateEmployee(employee) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
    };

    return Joi.validate(employee, schema);
}
function validateRegister(employee) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(50).required(),
    };

    return Joi.validate(employee, schema);
}

function validateLogin(employee) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(employee, schema);
}
exports.Employee = Employee;
exports.validateEmployee = validateEmployee;
exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;