/**
 * Created by User on 8/14/2015.
 */

angular.module('finkiAsk').factory('TestService', ['$http', function ($http) {

    $http.defaults.withCredentials = true;

    var service = {};
    //service.url = 'http://192.168.1.124:8080/ask/admin/tests';
    service.url = 'http://192.168.0.109:8080/ask/admin/tests';

    service.delete = function (id) {
        return $http.get(this.url + '/' + id);
    };

    service.create = function (test) {
        var jsonString = JSON.stringify(test);
        console.log(test);
        return $http({
            url: this.url,
            method: 'POST',
            data: jsonString,
            headers: {'Content-Type': 'application/json'}
        });
    }
    service.update = function (test) {
        alert('da');
        var jsonString = JSON.stringify(test);
        console.log(test);
        return $http({
            url: this.url + '/' + test.id,
            method: 'POST',
            data: jsonString,
            headers: {'Content-Type': 'application/json'}
        });
    };

    service.findById = function (id) {
        return $http.get(this.url + '/' + id);
    };

    service.findAll = function () {
        return $http.get(this.url);
    };

    return service;
}]);