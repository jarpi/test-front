var express = require('express');
var app = express();
var port = 8080; 
var serverCtrl = require('./lib/model/servers').servers; 

var routes = require('./lib/routes/index')( app, serverCtrl ); 

app.use(express.static(__dirname + '/../front')); 

app.listen(port, function () {
  console.log('Example app listening on port ' + port + "!");
});