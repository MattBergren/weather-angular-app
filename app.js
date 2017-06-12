// Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routing
weatherApp.config(function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'mainController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});

// Services
weatherApp.service('cityService', function(){
	this.city = 'New York, NY';
});

// Controllers
weatherApp.controller('mainController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;

    $scope.$watch('city', function(){
    	cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource','cityService', function($scope, $resource, cityService) {
    
    $scope.city = cityService.city;

    $scope.weatherAPI = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?APPID=e10242ead92bdfee51a5de001a347818',
        { callback: 'JSON_CALLBACK' },
        { get: { method: 'JSONP'} }
    );

    $scope.weatherResult = $scope.weatherAPI.get({
        q: $scope.city,
        cnt: 2
    });

    $scope.convertToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    };

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
    
}]);