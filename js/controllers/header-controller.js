angular.module('finkiAsk').controller('HeaderController', ['$location', '$scope', function ($location, $scope) {
    $scope.isActive = function (location) {
        //alert(location + '    ' + $location.path());
        return location === ('#' + $location.path());
    };
}]);