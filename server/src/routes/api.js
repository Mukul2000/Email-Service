const express = require('express');
const route = express.Router();
const signup_controllers = require('../controllers/signup')

route.get('/signup', signup_controllers.signup_user);
route.post('/signup',signup_controllers.verify_user);

module.exports = route;