/**
 * Created by user on 9/10/2015.
 */

angular.module('finkiAsk').factory('LoginService', ['$http', function ($http) {
    $http.defaults.withCredentials = true;

    var service = {};
    //service.url = 'http://192.168.1.124:8080/ask/admin/results';
    //service.url = 'http://192.168.0.109:8080/ask/login';
    service.url = 'http://localhost:8080/ask/admin/login-info';

    service.getLoginInfo = function () {
        return $http.get(this.url);
    }

    service.login = function (credentials) {
        return $http({
            url: this.url,
            method: 'POST',
            data: 'username=' + credentials.username + "&password=" + credentials.password ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            withCredentials: true
        });
    }

    return service;
}]);