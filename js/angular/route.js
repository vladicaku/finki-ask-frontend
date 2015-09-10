angular.module('finkiAsk').config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.
        when('/home', {
            templateUrl: 'templates/pages/home/index.html',
            controller: 'HomeController'
        }).
        when('/create-test', {
            templateUrl: 'templates/pages/test/index.html',
            controller: 'TestController'
        }).
        when('/test/:id', {
            templateUrl: 'templates/pages/test/index.html',
            controller: 'TestController'
        }).
        when('/live-results/:id', {
            templateUrl: 'templates/pages/results/index.html',
            controller: 'ResultsController'
        }).
        when('/other-tests', {
            templateUrl: 'templates/pages/other-tests/index.html',
            controller: 'OtherTestController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    
}]);
            
