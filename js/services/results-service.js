/**
 * Created by User on 9/7/2015.
 */

angular.module('finkiAsk').factory('ResultsService', ['$http', function ($http) {
    $http.defaults.withCredentials = true;

    var service = {};
    //service.url = 'http://192.168.1.124:8080/ask/admin/results';
    //service.url = 'http://192.168.0.109:8080/ask/admin/results';
    service.url = 'http://localhost:8080/ask/admin/results';
    
    service.loadResults = function (id) {
        return $http.get(this.url + '/' + id);
    }

    return service;
}]);