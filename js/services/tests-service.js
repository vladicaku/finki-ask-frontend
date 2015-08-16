/**
 * Created by User on 8/15/2015.
 */

angular.module('finkiAsk').service('TestsService', ['$http', '$scope', function ($http, $scope) {

    $scope.url = 'http://localhost:8080/ask';

    this.deleteTest = function (id) {
    };

    this.createTest = function (test) {
    };

    this.updateTest = function (test) {
    };

    this.readTest = function (testId) {
    };

}]);