var mongoose = require('mongoose');
const subcategory_data = mongoose.model('subcategory_data');

module.exports = {
    addsubcategory: async (req, res) => {
        try {
            const body = req.body;
            const categoryDetail = new subcategory_data({
                categoryid: body.categoryid,
                name: body.name,
                active: body.active,
            })
            const data = await categoryDetail.save();
            res.json({ code: 200, data: data, message: "Success" });
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(error => error.message).join(',');
                res.json({ code: 400, message: errorMessage });
            }
        }
    },
    getsubcategory: async (req, res) => {
        try {
            const categoryList = await subcategory_data.find();
            res.json({ code: 200, data: categoryList, message: "Success" });
        } catch (error) {
            res.json({ code: 400, message: "Bad Request" });
        }
    },
    updatesubcategory: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            console.log(body);  
            const obj = {
                updateAt: new Date()
            };
            if (body.categoryid) {
                obj.categoryid = body.categoryid;
            }
            if (body.name) {
                obj.name = body.name;
            }
            if (body.active != undefined) {
                obj.active = body.active;
            }
            const count = await subcategory_data.countDocuments({ _id: { $ne: id }, categoryid: obj.categoryid, name: obj.name });
            if (count == 0) {
                const update = await subcategory_data.updateOne({ _id: id }, { $set: obj });
                if (update.nModified == 0) {
                    return res.json({ code: 400, message: "Resource not found" });
                }
                return res.json({ code: 200, message: "Success" });
            } else {
                return res.json({ code: 400, message: "Name must be unique within each category" });
            }
        } catch (error) {
            console.error(error);
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(error => error.message).join(',');
                return res.json({ code: 400, message: errorMessage });
            }
            return res.json({code : 400, message : "Bad Request"});
        }
    },
    deletesubcategory: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteCategory = await subcategory_data.deleteOne({ _id: id });
            res.json({ code: 200, data: deleteCategory, message: "Success" });
        } catch (error) {
            res.json({ code: 400, message: "Bad Request" });
        }
    }
}