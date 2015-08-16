/**
 * Created by User on 8/14/2015.
 */

angular.module('finkiAsk').factory('TestService', ['$http', function ($http) {
    return {
        url : 'http://localhost:8080/ask/admin/tests',

        deleteTest : function(id) {
            $http.get(this.url + '/' + id).
                then(function(response) {
                    alert("success");
                }, function(response) {
                    alert("error");
                });
        },

        createTest : function (test) {
            var jsonString = JSON.stringify(test);
            alert(jsonString);
            $.ajax({
                type: "POST",
                url: this.url,
                crossDomain : true,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: jsonString,
                success: function (data) {
                    alert("success");
                }
            })
        },

        updateTest : function (test) {
            var jsonString = JSON.stringify(test);
            $.ajax({
                type: "POST",
                url: this.url + "/" + test.id,
                contentType:"application/json; charset=utf-8",
                dataType: 'json',
                data:  jsonString,
                success: function(data){
                    alert("success");
                }
            });
        },

        readTest : function (id) {
            $http.get(this.url + '/' + id).
                then(function(response) {
                    return response;
                }, function(response) {
                    return {};
                });
        }
    };

}]);