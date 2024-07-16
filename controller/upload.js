var multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir = './filesystem/';
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});

module.exports = { upload };