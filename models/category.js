var mongoose = require('mongoose');

var category_data = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
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

category_data.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('category_data', category_data, "category_data");