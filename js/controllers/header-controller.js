angular.module('finkiAsk').controller('HeaderController', ['$location', '$scope', 'LoginService', function ($location, $scope, LoginService) {
    $scope.isActive = function (location) {
        //alert(location + '    ' + $location.path());
        return location === ('#' + $location.path());
    };

    $scope.credentials = {};

    LoginService.getLoginInfo().then(
        function (response) {
            if (response.data.responseStatus == "SUCCESS") {
                $scope.credentials = response.data.data;
            } else {
                $scope.credentials = {};
            }
        },
        function (response) {
            $scope.credentials = {};
        }
    );
}]);