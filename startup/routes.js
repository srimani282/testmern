const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const employee = require('../routes/employee');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/employee', employee);
  app.use(error);
}