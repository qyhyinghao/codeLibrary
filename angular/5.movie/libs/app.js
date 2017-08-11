(function (angular) {
    // "use strict";
    var app = angular.module('main',['home','in_theaters','coming_soon','top250','directiveApp','details','myjsonpService','ngRoute']);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/:home_page?',{
            templateUrl:'./home/home.html',
            controller:'homeCtrl'
        })

    }]);



    app.controller('myCtrl',['$scope','myService','$routeParams','$route',function($scope,myService,$routeParams,$route){

        $scope.movieName = '';
        $scope.loadingShow = false;
        // $scope.search = function(){
        //     console.log("click");


        //     // myService.jsonp('https://api.douban.com/v2/movie/search',{q:$scope.movieName},function(data){
        //     //     console.log(data);
        //     // })
        // }
    }]);
    
    
})(angular);
