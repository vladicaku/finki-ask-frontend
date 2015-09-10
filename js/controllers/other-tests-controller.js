angular.module('finkiAsk').controller('OtherTestController', ['$scope', 'TestService', function($scope, TestService) {
    $scope.hasError = false;
    $scope.error = '';

    $scope.search = {};
    $scope.search.text = '';
    $scope.search.filterOnlyActive = {};

    TestService.findOther().then(
        function (response) {
            console.log(response);
            if (response.data.responseStatus == 'SUCCESS') {
                $scope.tests = response.data.data;
                $scope.hasError = false;
            }
            else if (response.data.responseStatus == 'ERROR') {
                $scope.hasError = true;
                $scope.error = response.data.description;
            }
        },
        function (response) {
            $scope.hasError = true;
            $scope.error = response.data.description;
            console.log(response);
        }
    );

    $scope.changeOnlyActiveFilter = function () {
        if ( Object.keys($scope.search.filterOnlyActive).length == 0 ) {
            $scope.search.filterOnlyActive = {isActive : 'true'}
        }
        else {
            $scope.search.filterOnlyActive = {};
        }
    };

}]);