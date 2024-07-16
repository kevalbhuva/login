var mongoose = require('mongoose');

var product_data = mongoose.Schema({
    subcategoryid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'subcategoryid is required'],
        trim: true
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'categoryid is required'],
        trim: true
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true,
        require: [true, 'active is requied']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        trim: true
    },
    thumbimage: {
        type: String,
    },
    productimages: [{
        type: String,
    }],
    creatAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

product_data.path('name').validate({
    validator: async function (value) {
        if (!this.isModified('name')) {
            return true;
        }
        const count = await mongoose.models["product_data"].countDocuments({
            subcategoryid: this.subcategoryid,
            categoryid: this.categoryid,
            name: value,
            _id: { $ne: this._id }
        });
        return count === 0;
    },
    message: 'Name must be unique within each subcategory and category combination'
});

module.exports = mongoose.model('product_data', product_data, 'product_data');
