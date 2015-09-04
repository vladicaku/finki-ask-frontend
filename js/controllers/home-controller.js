angular.module('finkiAsk').controller('HomeController', ['$scope', function($scope) {
    $scope.tests = [
        {
            id: 2,
            name: 'Test1 asdasd',
            isActive: 'true',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 10,
            name: 'Test2 asdasd asd',
            isActive: 'false',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 8,
            name: 'Test3 adfg q3423asdas dsad asdasdasd Test3  Test3 adfg q3423asdas dsad asdasdasd' ,
            isActive: 'false',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 0,
            name: 'Test4 asdasd asd',
            isActive: 'true',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 1,
            name: 'Test5 adfg q3423asdas dsad asdasdasd' ,
            isActive: 'false',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 26,
            name: 'Test6 asdasd',
            isActive: 'true',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 17,
            name: 'Test7 asdasd asd',
            isActive: 'false',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 88,
            name: 'Test8 adfg q3423asdas dsad asdasdasd Test3  Test3 adfg q3423asdas dsad asdasdasd' ,
            isActive: 'false',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 90,
            name: 'Test9 asdasd asd',
            isActive: 'true',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        } ,
        {
            id: 100,
            name: 'Test10 adfg q3423asdas dsad asdasdasd' ,
            isActive: 'false',
            dateCreated: '14.04.2015',
            start: '14.04.2015 15:30',
            end: '14.04.2015 15:30'
        }
    ];

    $scope.search = {};
    $scope.search.text = '';
    $scope.search.filterOnlyActive = {};

    $scope.changefilterOnlyActive = function () {
        if ( Object.keys($scope.search.filterOnlyActive).length == 0 ) {
            $scope.search.filterOnlyActive = {isActive : 'true'}
        }
        else {
            $scope.search.filterOnlyActive = {};
        }
    };

}]);