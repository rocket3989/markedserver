var express = require('express');
var app = express();
var server = app.listen(3000);
var users = [];
app.use(express.static('public'));

console.log('server open on port 3000');
