var mongoose = require('mongoose');
const category_data = mongoose.model('category_data');

module.exports = {
    addCategory: async (req, res) => {
        try {
            const body = req.body;
            const categoryDetail = new category_data({
                name: body.name,
                active: body.active,
                creatAt: body.creatAt,
                updateAt: body.updateAt
            })
            const data = await categoryDetail.save();
            res.json({ code: 200, data: data, message: "Success" });
        } catch (error) {
            console.error(error);
            if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
                res.json({ code: 400, message: "Category name required unique" });
            } else {
                res.json({ code: 400, message: "Bad Request" });
            }
        }
    },
    getCategory: async (req, res) => {
        try {
            const categoryList = await category_data.find();
            res.json({ code: 200, data: categoryList, message: "Success" });
        } catch (error) {
            res.json({ code: 400, message: "Bad Request" });
        }
    },
    updateCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            console.log(body)
            const obj = {
                updateAt: new Date()
            };
            if (body.name) {
                obj.name = body.name;
            }
            if (body.active != undefined) {
                obj.active = body.active
            }

            const update = await category_data.update({ _id: id }, {
                $set: obj
            })
            console.log(update);
            if (update.nModified == 0) {
                return res.json({ code: 400, message: "not updated" });
            }
            res.json({ code: 200, message: "Success" });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(error => error.message).join(',');
                return res.json({ code: 400, message: errorMessage });
            }
            console.error(error);
            res.json({ code: 400, message: "Bad Request" });
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteCategory = await category_data.deleteOne({ _id: id });
            res.json({ code: 200, data: deleteCategory, message: "Success" });
        } catch (error) {
            res.json({ code: 400, message: "Bad Request" });
        }
    }
}