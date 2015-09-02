var app = angular.module('finkiAsk', ['ngRoute', 'angularUtils.directives.dirPagination', 'ui.bootstrap']);

angular.module('finkiAsk').config(function($logProvider){
    $logProvider.debugEnabled(true);
});

document.getElementsByTagName("form").arrive(".pero", function() {
    // 'this' refers to the newly created element
    $(document).ready(function() {
        // This command is used to initialize some elements and make them work properly
        $.material.init();
    });
    console.log("new element");
});