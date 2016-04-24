var express = require('express');
var app = express();
var port = 8080; 
var business = require('./lib/model/servers'); 
var serverCtrl = business.servers; 

var routes = require('./lib/routes/index')( app, serverCtrl ); 

app.use(express.static('../front')); 

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log('Example app listening on port ' + port + "!");
});