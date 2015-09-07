angular.module('finkiAsk').config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.
        when('/create-test', {
            templateUrl: 'templates/pages/test/index.html',
            controller: 'TestController'
        }).
        when('/test/:id', {
            templateUrl: 'templates/pages/test/index.html',
            controller: 'TestController'
        }).
        when('/results/:id', {
            templateUrl: 'templates/pages/results/index.html',
            controller: 'ResultsController'
        }).
        when('/home', {
            templateUrl: 'templates/pages/home/index.html',
            controller: 'HomeController'
        }).
        when('/other-tests', {
            templateUrl: 'templates/pages/other-tests/index.html',
            controller: 'DashboardController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    
}]);
            
