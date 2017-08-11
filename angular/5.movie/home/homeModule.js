(function(angular){

    "usestrict";
    //自己维护自己模块的路由规则

    var app = angular.module('home',['ngRoute']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/home_page',{
            templateUrl:'./home/home.html',
            controller:'homeCtrl'
        })

    }]);

    app.controller('homeCtrl',['$scope',function($scope){
        
    }]);

})(angular)
