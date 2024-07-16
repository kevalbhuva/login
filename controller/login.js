const mongoose = require('mongoose');
const User = mongoose.model('user_data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secreatkeys = require('../config/index');

module.exports = {
    login_user: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.json({ code: 400, message: 'User not found' });
            }
            const correct = await bcrypt.compare(password, user.password);

            if (!correct) {
                return res.json({ code: 400, message: 'Incorrect password' });
            }
            const token = jwt.sign({
                id: user._id,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            }, secreatkeys.jwtSecret);

            res.json({ code: 200, message: 'Login Succesful', data: { token } });
        } catch (error) {
            if (error.name == 'TokenExpiredError') {
                return res.json({ code: 400, message: 'Token has expired' });

            } else {
                return res.json({ code: 400, message: 'Token verification failed', error: error.message });
            }
        }
    }
}