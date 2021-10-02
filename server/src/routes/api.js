const express = require('express');
const route = express.Router();
const signup_controllers = require('../controllers/signup');
const login_controllers = require('../controllers/login')

route.get('/signup', signup_controllers.signup_user);
route.post('/signup',signup_controllers.verify_user);
route.delete('/signup', signup_controllers.delete_user);

route.post('/login', login_controllers.login)

module.exports = route;