(function(angular){

    var app = angular.module('details',['ngRoute','directiveApp']);

    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/details/:id?',{
            templateUrl:'./details/details.html',
            controller:'detailsCtrl'
        })
    }])

    app.controller('detailsCtrl',['$scope','myService','$routeParams',function($scope,myService,$routeParams){

        console.log($routeParams);

        $scope.loadingShow = true;

        myService.jsonp('https://api.douban.com/v2/movie/subject/'+$routeParams.id,{},function(data){
            console.log(data);
            $scope.data = data;

            // var arr = data.casts.map(function(e){
            //     return e.name;
            // }).join('、');
            $scope.casts = data.casts.map(function(e){
                return e.name;
            }).join('、');
            $scope.directors=data.directors.map(function(e){
                return e.name;
            }).join('、');
            $scope.loadingShow = false;
            $scope.$apply();

            

        })

    }]);
})(angular)
