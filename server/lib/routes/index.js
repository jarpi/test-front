module.exports = function apiRouter( app, serverCtrl ) {
	var express = require('express'); 
	var router = express.Router(); 

	router.get('/server', function( req, res, next ) {
		return serverCtrl.GetAllServers()
		.then(function(data){
			res.status(200).send(data); 
		})
		.catch(function(err){
			res.status(400).send(err.message); 
		}); 
	}); 

	router.post('/server', function( req, res, next ) {
		return serverCtrl.AddServer()
		.then(function(data){
			res.status(200).send(data); 
		}).catch(function(err){
			res.status(400).send(err.message); 
		}); 
	}); 

	router.delete('/server', function( req, res, next ) {
		return serverCtrl.RemoveServer()
		.then(function(data){
			res.status(200).send(data); 
		}).catch(function(err){
			res.status(400).send(err.message); 
		}); 
	}); 

	// We don't need the server id right now 
	router.post('/app/:type', function( req, res, next ) {
		return serverCtrl.AddApp(req.params.type)
		.then(function(data){
			res.status(200).send(data); 
		}).catch(function(err){
			console.dir(err); 
			res.status(400).send(err.message); 
		});  
	}); 

	router.delete('/app/:type', function( req, res, next ) {
		return serverCtrl.RemoveApp(req.params.type)
		.then(function(data){
			res.status(200).send(data); 
		}).catch(function(err){
			res.status(400).send(err.message); 
		});  
	}); 

	app.use('/api', router); 
}; 