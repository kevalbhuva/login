const express = require('express');
const routes = express.Router();
const loginController = require('../controller/login');

routes.post('/login', loginController.login_user);

module.exports = routes;