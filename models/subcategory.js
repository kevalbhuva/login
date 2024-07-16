var mongoose = require('mongoose');

var subcategory_data = mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'categoryid is required'],
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        unique : true,
        trim : true
    },
    active: {
        type: Boolean,
        default: true,
        require: [true, 'active is requied']
    },
    creatAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
});

subcategory_data.path('name').validate({
    validator: async function (value) {
        const count = await mongoose.models["subcategory_data"].countDocuments({ categoryid: this.categoryid, name: value });
        return count === 0;
    },
    message: 'Name must be unique within each category'
});

module.exports = mongoose.model('subcategory_data', subcategory_data, 'subcategory_data');