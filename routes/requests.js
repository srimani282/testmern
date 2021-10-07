const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Request = require('../models/requests');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {

    let request = await new Request(req.body);

    res.send("success");

});

router.get('/requests', auth, async (req, res) => {

    let requests = await Request.find({ userId: req.user._id });

    res.send(requests);

});

module.exports = router; 
