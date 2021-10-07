const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Employee, validateEmployee, validateRegister, validateLogin} = require('../models/employee');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
//employee register
router.post('/register', async (req, res) => {
  const { error } = validateRegister(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let employee = await Employee.findOne({ email: req.body.email });
  if (!employee) return res.status(400).send('Sorry you are not allowed to register');

  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(req.body.password, salt);
  await employee.save();

  const token = employee.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(employee, ['_id', 'name', 'email', ]));
});
//adding employee by admin
router.post('/',auth,admin, async (req, res) => {
  const { error } = validateEmployee(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let employee = await Employee.findOne({ email: req.body.email });
  if (employee) return res.status(400).send('employee already added');

  employee = new Employee(_.pick(req.body, ['name', 'email', 'salary']));
  await employee.save();

  res.send("success");
});
//employee login
router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let employee = await Employee.findOne({ email: req.body.email });
    if (!employee) return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(req.body.password, employee.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
    const token = {token : employee.generateAuthToken()};
    res.send(token);
  });

module.exports = router; 
