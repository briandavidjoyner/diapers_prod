var app = angular.module('diapers',['ngCookies']);

//var app = angular.module('diapers',['ngRoute']);
//app.config(function($routeProvider){
//	$routeProvider
//	.when('/new', {
//		templateUrl: '/content/diapers_new2.html',
//		controller: 'pampers'
//	})
//	.otherwise({
//		redirectTo:'/'
//	});
//});

//Compenents
app.directive('header', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/content/new_head.html",
        controller: 'all'
    }
});

app.directive('maincontent', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/content/new_main.html",
        controller: 'all'
    }
});

app.directive('footer', function () {
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/content/new_footer.html",
        controller: 'all'
    }
});

app.directive('filtertool', function(){
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/content/filter-tool.html",
        controller: 'all'
    }
});

app.directive('emailcapture', function(){
    return {
        restrict: 'E', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: true,
        //scope: {user: '='}, // This is one of the cool things :). Will be explained in post.
        templateUrl: "/content/email_capture_2.html",
        controller: 'all'
    }
});