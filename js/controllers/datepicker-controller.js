/**
 * Created by User on 8/15/2015.
 */
angular.module('finkiAsk').controller('DatePickerController', ['$scope', function ($scope) {

    // Date picker - Angular UI

    $scope.open = function($event) {
        $scope.status.opened = true;
    };


    $scope.status = {
        opened: false
    };
}]);
