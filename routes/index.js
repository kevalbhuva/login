var express = require('express');
const { route } = require('./users');
var routes = express.Router();

routes.use('/user', require('./users'));
routes.use('/auth', require('./login'));
routes.use('/category', require('./category'));
routes.use('/subcategory', require('./subcategory'));
routes.use('/product', require('./product'));
module.exports = routes;