'use strict';

var app = angular.module('CryptoApp', ['ngRoute', 'chart.js']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'views/overview.html',
			controller: 'CryptoController'
		})
		.otherwise({
            redirectTo: '/error'
        });
}]);