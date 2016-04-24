function Servers() {
	this.list = []; 
	this.MAX_SERVERS = 20; 
	this.MAX_APPS_PER_SERVER = 2; 
	this.APP_TYPES = [
		{
			name: 'Hadoop',
			title: 'hd', 
		}, 
		{
			name: 'Rails',
			title: 'rd'
		}, 
		{
			name: 'Chronos',
			title: 'ch'
		}, 
		{
			name: 'Storm',
			title: 'st'
		}, 
		{
			name: 'Spark',
			title: 'sp'
		}
	]
} 

Servers.prototype.AddServer = function() {
	var that = this; 
	return new Promise(function(resolve, reject){ 
		if (that.list.length >= that.MAX_SERVERS) {
			throw new Error('MAX_SERVER_REACHED')
		}
		that.list.push(new ServerModel()); 
		resolve(that.list); 
	}); 
} 

Servers.prototype.RemoveServer = function() {
	var that = this; 
	return new Promise(function(resolve, reject){
		if (that.list.length < 1) throw new Error('NO_AVAILABLE_SERVERS'); 
		that.list = that.list.slice(0,that.list.length-1); 
		resolve(that.list); 
	});  
}

Servers.prototype.AddApp = function(type) {
	var that = this; 
	return new Promise(function(resolve, reject){
		
		// Get app template 
		var appTypeTpl = that.APP_TYPES.find(function(item){
			return type === item.title; 
		}); 

		if (!appTypeTpl) throw new Error('INVALID_APP_TYPE'); 

		// Find a hole in the server list 
		var freeServer = getFirstFreeHole(that.list, 0, that.MAX_APPS_PER_SERVER); 

		if (!freeServer) throw new Error('NO_AVAILABLE_SERVERS'); 

		// Add app to that server 
		freeServer.apps.push(new AppModel(appTypeTpl.name, appTypeTpl.title)); 
		resolve(that.list); 
	}); 
}

Servers.prototype.RemoveApp = function(type) {
	
	var that = this; 
	return new Promise(function(resolve, reject){

		if (!type) throw new Error('TYPE_NOT_FOUND'); 
		// Get all apps by type in the cluster 
		var recentAppByType = null; 

		for (var i=0; i<that.list.length; i++) {
			
			var server = that.list[i]; 
			var foundMostRecentApp = server.apps.find(function(item) {
				return item.title === type; 
			}); 

			if ( (foundMostRecentApp && !recentAppByType) || 
				foundMostRecentApp && recentAppByType && 
				foundMostRecentApp.lastUpdated > recentAppByType.lastUpdated
				) {
				recentAppByType = foundMostRecentApp; 
				recentAppByType.serverIndex = i; 
				recentAppByType.appIndex = server.apps.indexOf(foundMostRecentApp); 
			} 
		}

		if (!recentAppByType) throw new Error('APP_NOT_FOUND'); 
		that.list[recentAppByType.serverIndex].apps.splice(recentAppByType.appIndex,1); 
		resolve(that.list); 
	}); 
}

Servers.prototype.GetAllServers = function() {
	return Promise.resolve(this.list); 
}

function ServerModel() {
	this.apps = []; 
} 

function AppModel( name, title ) {
	this.name = name; 
	this.title = title; 
	this.lastUpdated = new Date(); 
} 

function getFirstFreeHole( list, minAppNum, maxAppNum ) {
	// Get a empty server with the following conditions: 
	// - Empty server 
	// - 1 app server 
	var availableSlot = null; 
	if (minAppNum>=maxAppNum) return null; 
	availableSlot = list.find(function(item){
		return item.apps.length <= minAppNum; 
	}); 
	if (!availableSlot) return getFirstFreeHole(list, ++minAppNum, maxAppNum); 
	return availableSlot; 
}

module.exports = {
	servers: new Servers(), 
	serverModel: ServerModel, 
	appModel: AppModel 
}; 
