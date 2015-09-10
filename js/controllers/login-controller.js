/**
 * Created by user on 9/10/2015.
 */

angular.module('finkiAsk').controller('LoginController', ['$location', '$scope', '$rootScope', 'LoginService', function ($location, $scope, $rootScope, LoginService) {

    $scope.credentials = {};

    LoginService.getLoginInfo().then(
        function (response) {
            if (response.data.responseStatus == "SUCCESS") {
                $scope.credentials.username = response.data.data;
            } else {
                $scope.credentials = {};
            }
        },
        function (response) {
            $scope.credentials = {};
        }
    );
}]);