// CONTROLLERS

weatherApp.controller('homeController', ['$scope', '$location', '$log', 'cityService', function($scope, $location, $log, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
    
    $scope.submit = function() {
        $location.path("/forcast");
    };
    
}]);

weatherApp.controller('forcastController', ['$scope', '$log', '$routeParams', 'cityService', 'weatherService', function($scope, $log, $routeParams, cityService, weatherService) {
    
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);
    
    $scope.convertToF = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32); 
    };
    
    $scope.convertDate = function(dt) {
        return new Date(dt * 1000);
    };
    

}]);