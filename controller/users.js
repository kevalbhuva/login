var mongoose = require('mongoose');
var user_data = mongoose.model('user_data');
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
var sendEmail = require('./utils');

module.exports = {
    addUser: async (req, res) => {
        try {
            var body = req.body;


            // if (body.firstname == undefined || body.firstname == null) {
            //     return res.json({ code: 400, message: 'firstname is required!' });
            // }
            // if (body.lastname == undefined || body.lastname == null) {
            //     return res.json({ code: 400, message: 'lastname is required!' });
            // }
            // if(body.email == undefined || body.email == null) {
            //     return res.json({ code: 400, message: 'Email is required!' });
            // }
            // if (body.password == undefined || body.password == null) {
            //     return res.json({ code: 400, message: 'password is required!' });
            // }
            // if (body.mobileno == undefined || body.mobileno == null) {
            //     return res.json({ code: 400, message: 'mobileno is required!' });
            // }
            // if (!body.email || !/^[^\s@]+@email\.com$/.test(body.email)) {
            //     return res.json({ code: 400, message: "Email is required end with @email.com!" });
            // }   

            // if (!body.password || body.password.length < 8) {
            //     res.json({ code: 400, message: "password length more then 8" });
            // }

            const existingUser = await user_data.findOne({ email: body.email });
            if (existingUser) {
                return res.json({ code: 400, message: "Email already exists" });
            }
            console.log(body);

            const hashPassword = await bcrypt.hashSync(body.password, bcrypt.genSaltSync(8));
            console.log(hashPassword);

            const userdetail = new user_data({
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: hashPassword,
                mobileno: body.mobileno
            })
            const data = await userdetail.save();
            if (data) {
                const emailResult = await sendEmail(data.email, "Welcome", "Welcome w3schools");
                if (emailResult) {
                    return res.json({ code: 200, data: data, message: "Success" });
                } else {
                    return res.json({ code: 400, message: "Email Sending Failed" });
                }
            } else {
                return res.json({ code: 400, meessage: "Successful"});
            }

        } catch (error) {
            console.error(error);
            if (error.name === 'ValidationError') {
                const errorMessage = Object.values(error.errors).map(error => error.message).join(',');
                return res.json({ code: 400, message: errorMessage });
            } else {
                return res.json({ code: 500, message: "Internal Server Error" });
            }

        }
    }
}