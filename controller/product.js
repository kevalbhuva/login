var mongoose = require('mongoose');
const subcategory = require('./subcategory');
const category = require('./category');
const product_data = mongoose.model('product_data');
var fs = require('fs');
var path = require('path');

module.exports = {
    addproduct: async (req, res) => {
        try {
            if (!req.files || !req.files.image || !req.files.productimages) {
                return res.json({ code: 400, message: "please upload file" });
            }
            const images = req.files.image.map(file => {
                const filepath = path.join(__dirname, '/../filesystem/', file.filename);
                if (!fs.existsSync(filepath)) {
                    throw new Error(`File ${file.filename}does not exists`);
                }
                return file.filename;
            });
            const productimages = req.files.productimages.map(file => {
                const filepath = path.join(__dirname, '/../filesystem/', file.filename);
                if (!fs.existsSync(filepath)) {
                    throw new isError(`File ${file.filename}does not exists`);
                }
                return file.filename;
            })
            const body = req.body;
            const productDetail = new product_data({
                subcategoryid: body.subcategoryid,
                categoryid: body.categoryid,
                name: body.name,
                active: body.active,
                description: body.description,
                price: body.price,
                thumbimage: images[0],
                productimages: productimages
            })
            const data = await productDetail.save();
            return res.json({ code: 200, data: data, message: "Success" });
        } catch (error) {
            console.error(error);
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(error => error.message).join(',');
                res.json({ code: 400, message: errorMessage });
            }
        }
    },
    getproduct: async (req, res) => {
        try {
            const productList = await product_data.find();
            res.json({ code: 200, data: productList, message: "Success" });
        } catch (error) {
            res.json({ code: 400, message: "Bad Request" });
        }
    },
    updateproduct: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const obj = {
                updatedAt: new Date()
            };

            const existingProduct = await product_data.findById(id);
            if (!existingProduct) {
                return res.status(404).json({ code: 404, message: "Resource not found" });
            }

            const exist = await product_data.exists({
                name: body.name,
                categoryid: body.categoryid,
                subcategoryid: body.subcategoryid,
                _id: { $ne: id }
            });

            if (exist) {
                return res.status(400).json({ code: 400, message: 'Product already exists' });
            }
            if (body.subcategoryid) {
                obj.subcategoryid = body.subcategoryid;
            }
            if (body.categoryid) {
                obj.categoryid = body.categoryid;
            }
            if (body.name) {
                obj.name = body.name; nameUpdated = true;
            }
            if (body.active !== undefined) {
                obj.active = body.active;
            }
            if (body.description) {
                obj.description = body.description;
            }
            if (body.price) {
                obj.price = body.price;
            }

            if (req.files && req.files.image && req.files.image.length > 0) {
                obj.thumbimage = req.files.image[0].filename;
            }

            if (req.files && req.files.productimages && req.files.productimages.length > 0) {
                const oldProductImages = existingProduct.productimages || [];
                const newImageFilenames = req.files.productimages.map(file => file.filename);

                const sameImages = oldProductImages.some(image => newImageFilenames.includes(image));
                if (sameImages) {

                    req.files.productimages.forEach(file => {
                        const filepath = path.join(__dirname, '/../filesystem/', file.filename);
                        fs.unlinkSync(filepath);
                    });
                    return res.json({ code: 400, message: "Same image detected. Please upload another image for update." });
                } else {
                    obj.productimages = newImageFilenames;
                }
            }

            console.log("obj", obj);
            if (Object.keys(obj).length === 1) {
                return res.status(400).json({ code: 400, message: "No changes made to the resource" });
            }

            console.log('id', id, 'obj', obj);
            const update = await product_data.updateOne({ _id: id }, { $set: obj });
            console.log('update', update);
            if (update.nModified === 0) {
                return res.status(404).json({ code: 404, message: "Resource not found" });
            }
            if (req.files && req.files.image && req.files.image.length > 0) {
                console.log('exist thumbimage', existingProduct.thumbimage);
                const oldImagePath = path.join(__dirname, '/../filesystem/', existingProduct.thumbimage);
                console.log('OldImagepath', oldImagePath);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                console.log('obj.thumbimage', obj.thumbimage);
            }

            if (req.files && req.files.productimages && req.files.productimages.length > 0 && existingProduct.productimages.length > 0) {
                console.log('productimages', existingProduct.productimages);
                existingProduct.productimages.forEach(image => {
                    const filepath = path.join(__dirname, '/../filesystem/', image);
                    if (fs.existsSync(filepath)) {
                        fs.unlinkSync(filepath);
                    }
                })
            }

            return res.status(200).json({ code: 200, message: "Success" });

        } catch (error) {
            console.error(error);
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(err => err.message).join(',');
                return res.status(400).json({ code: 400, message: errorMessage });
            }
            res.status(400).json({ code: 400, message: "Bad Request" });
        }
    },
    deleteproduct: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteproduct = await product_data.deleteOne({ _id: id });
            res.json({ code: 200, data: deleteproduct, message: "Success" });
        } catch (error) {
            res.json({ code: 400, message: "Bad Request" });
        }
    }
}

