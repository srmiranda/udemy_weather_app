// CONTROLLERS

weatherApp.controller('homeController', ['$scope', '$log', 'cityService', function($scope, $log, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
}]);

weatherApp.controller('forcastController', ['$scope', '$log', '$resource', '$routeParams', 'cityService', function($scope, $log, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days, APPID: '7142da4098dac47b689d011c59fb174e' });
    
    $scope.convertToF = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32); 
    };
    
    $scope.convertDate = function(dt) {
        return new Date(dt * 1000);
    }
    

}]);