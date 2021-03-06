angular.module('dashboardApp', [])
.factory('dashboardServerFactory', function () { 
	var dService = { 
			servers:[],  
			index:0, 
			offset:5, 
	};   
	return dService;  
})
.controller('dashboardCtrl', ['$scope', '$http', 'dashboardServerFactory', function($scope, $http, dashboardServerFactory) {
	$scope.servers = dashboardServerFactory.servers; 

	$scope.addServer = function() {
		console.log('add server'); 
		$http({
			method: 'POST',
			url: 'api/server'
		})
		.then(function (response) {
			console.dir(response);
			$scope.servers = formatData(response.data); 
		})
		.catch(function (err){
			console.dir(err); 
		});
	}; 

	$scope.removeServer = function() {
		console.log('add server'); 
		$http({
			method: 'DELETE',
			url: 'api/server'
		})
		.then(function (response) {
			console.dir(response);
			$scope.servers = formatData(response.data); 
		})
		.catch(function (err){
			console.dir(err); 
		});
	}; 

	$scope.addApp = function(type) {
		console.log('add app'); 
		$http({
			method: 'POST',
			url: 'api/app/' + type
		})
		.then(function (response) {
			console.dir(response);
			$scope.servers = formatData(response.data); 
		})
		.catch(function (err){
			console.dir(err); 
		});
	}; 

	$scope.removeApp = function(type) {
		console.log('remove app'); 
		$http({
			method: 'DELETE',
			url: 'api/app/' + type
		})
		.then(function (response) {
			console.dir(response);
			$scope.servers = formatData(response.data); 
		})
		.catch(function (err){
			console.dir(err); 
		});
	}; 

	$scope.getServersAndApps = function() {
		console.log('get data and apps'); 
		$http({
			method: 'GET',
			url: 'api/server'
		})
		.then(function (response) {
			$scope.servers = formatData(response.data); 
		})
		.catch(function (err){
			console.dir(err); 
		});
	} 

	function formatData(servers) {
		return servers.map(function(server) {
			server.apps_name = '';
			server.apps_title = '';
			server.apps_lastUpdated = '';
			server.apps.forEach(function(app) {
				server.apps_name += (server.apps_name.length>0 ? ' - ' : '') + app.name; 
				server.apps_title += (server.apps_title.length>0 ? ' - ' : '') + app.title; 
				server.apps_lastUpdated += (server.apps_lastUpdated.length>0 ? ' - ' : '') + app.lastUpdated; 
			}); 
			return server; 
		}); 
	}

	$scope.getServersAndApps(); 

}]); 