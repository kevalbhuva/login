const jwt = require('jsonwebtoken');
const secreatkeys = require('../config/index');
const mongoose = require('mongoose');
const user_data = mongoose.model('user_data');

const authentication = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log('token', token);

        if (!token) {
            return res.json({ code: 400, message: "No token provided" });
        }

        const decode = await jwt.verify(token, secreatkeys.jwtSecret);
        console.log('decode', decode);

        if (!decode) {
            return res.json({ code: 400, message: "Failed to authrnticate token" });
        }

        const user = await user_data.findOne({_id: decode.id});
        // const user = await product_data.findById(decode.id);
        console.log('user', user);

        if (!user) {
            return res.json({ code: 400, message: "User not found" });
        }
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ code: 401, message: "Token expired" });
        }
        console.error(error);
        return res.status(500).json({ code: 500, message: "Failed to authenticate" });
    }
}

module.exports = { authentication };

