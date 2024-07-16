var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

//middleware in limit set 
app.use(express.urlencoded({ parameterLimit: 30, limit: '5mb', extended: true }));
app.use(express.json({ limit: '5mb' }));

//mongodb connect with database
mongoose.connect('mongodb://localhost:27017/product', 
    function(error) {
        if (error) {
            console.log('sorry not connect with database');
        } else {
            console.log('connct with database');
        }
});
    
module.exports = mongoose;

var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach((file) => {
    if (file.endsWith('.js')) require(path.join(modelsPath, file));
});

function middleware(req, res, next) {
    res.setHeader('Access-Control-Allow-querry', '*');
    res.setHeader('Access-Control-Allow-methos', 'GET', 'PUT', 'POST', 'DELETE', 'OPTION');
    res.setHeader('Access-Control-Allow-header', 'x-custom-header');
    next();
}

app.use(middleware);


// create server and express add
var server = http.createServer(app);

var route = require('./routes');
app.use(route);

// port add
port = 7000;
server.listen(port, () => {
    console.log("server is running this port", port);
})