var mongoose = require('mongoose');

var user_data = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/,
            'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    mobileno: {
        type: Number,
        required: [true, 'Mobile number is required'],
        // match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
        validate: {
            validator: function (v) {
                // Check if the mobile number contains only digits and has a length of 10
                return /^[0-9]{10}$/.test(v);
            },  
            message: 'Please enter a valid 10-digit mobile number'
        }
    }   
})

module.exports = mongoose.model('user_data', user_data, 'user_data')