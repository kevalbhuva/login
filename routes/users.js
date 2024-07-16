var express = require('express');
var routes = express.Router();
var user_controller = require('../controller/users');

routes.post('/add', user_controller.addUser);

module.exports = routes;
