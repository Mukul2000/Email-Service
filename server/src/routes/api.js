const express = require('express');
const route = express.Router();
const signup_controllers = require('../controllers/signup');
const data_controllers = require('../controllers/data')
const login_controllers = require('../controllers/login')
const authByToken = require('../middlewares/auth');

route.post('/account', signup_controllers.create_account);

route.get('/signup', signup_controllers.signup_user);
route.post('/signup',signup_controllers.verify_user);
route.delete('/signup', signup_controllers.delete_user);

route.post('/login', login_controllers.login)

route.get('/user_tables/:table_name', authByToken, data_controllers.fetch_table);
route.get('/user_templates', authByToken, data_controllers.get_templates);

module.exports = route;