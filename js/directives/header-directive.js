angular.module('finkiAsk').directive('headerDirective', ['$location', function ($location) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var path = $location.path();
            
            angular.forEach(element.find('li'), function (li) {
                var anchor = li.querySelector('a');
                var href = anchor.getAttribute('href', 2);
                var myElement = angular.element(li);
                //alert(href + " - #" + path);
                if (href.match('#' + path)) {
                    //alert(href + " - #" + path);
                    myElement.addClass('active');
                } else {
                    myElement.removeClass('active');
                }
            });
        }
        
    };
}]);

