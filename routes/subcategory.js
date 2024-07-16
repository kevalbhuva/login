var express = require('express');
var routes = express.Router();
var subcategoryController = require('../controller/subcategory')
var {authentication} = require('../middleware/authentication');

routes.post('/add', authentication, subcategoryController.addsubcategory);
routes.get('/get', authentication, subcategoryController.getsubcategory);
routes.put('/update/:id', authentication, subcategoryController.updatesubcategory);
routes.delete('/delete/:id', authentication, subcategoryController.deletesubcategory);

module.exports = routes;