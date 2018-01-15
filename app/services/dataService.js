app.factory('DataService', ['$http', function DataService($http){
	var factoryObj = {};

	factoryObj.getCurrPair = function(pairCode){
		return $http.post('/getCurrPair', pairCode);
	};

	factoryObj.getCodes = function(){
		return $http.get('/getCodes');
	};

	factoryObj.getBids = function(pairCode) {
		return $http.post('/getBids', pairCode);
	};

	return factoryObj;
}]);