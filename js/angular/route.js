angular.module('finkiAsk').config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.
        when('/create-test', {
            templateUrl: 'templates/pages/test/index.html',
            controller: 'TestCtrl'
        }).
        when('/create/:id', {
            templateUrl: 'templates/pages/test/index.html',
            controller: 'TestCtrl'
        }).
        when('/home', {
            templateUrl: 'templates/pages/home/index.html',
            controller: 'TestsController'
        }).
        when('/other-tests', {
            templateUrl: 'templates/pages/other-tests/index.html',
            controller: 'DashboardController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    
}]);
            
