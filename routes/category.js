var express = require('express');
var routes = express.Router();
var categoryController = require('../controller/category');
var { authentication } = require('../middleware/authentication');

routes.post('/add', authentication, categoryController.addCategory);
routes.get('/get', authentication, categoryController.getCategory);
routes.put('/update/:id', authentication, categoryController.updateCategory);
routes.delete('/delete/:id', authentication, categoryController.deleteCategory);

module.exports = routes;    