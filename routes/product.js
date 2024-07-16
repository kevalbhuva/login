var express = require('express');
var routes = express.Router();

var productController = require('../controller/product')
var updateImage = require('../controller/upload');
var { authentication } = require('../middleware/authentication');

routes.post('/add', authentication, updateImage.upload.fields([{ name: 'image', maxCount: 1 }, { name: 'productimages', maxCount: 4 }]), productController.addproduct);
routes.get('/get', authentication, productController.getproduct);
routes.put('/update/:id', authentication, updateImage.upload.fields([{ name: 'image', maxCount: 1 }, { name: 'productimages', maxCount: 4 }]), productController.updateproduct);
routes.delete('/delete/:id', authentication, productController.deleteproduct);

module.exports = routes;    