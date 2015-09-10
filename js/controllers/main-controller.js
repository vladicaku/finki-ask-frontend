/**
 * Created by user on 9/10/2015.
 */

angular.module('finkiAsk').controller('MainController', ['$location', '$scope', '$rootScope', function ($location, $scope, $rootScope) {
    $rootScope.loggedIn = false;
    $rootScope.hasError = false;
    $rootScope.error = '';


    if(!$rootScope.loggedIn && ($location.path() != '/login')) {
        $location.path('/login');
    }

        $rootScope.$watch(function() { return $location.path(); }, function(newValue, oldValue){
        if ($rootScope.loggedIn == false && newValue != '/login'){
            $location.path('/login');
        }
    });
}]);