(function(angular){

    "usestrict";
    //自己维护自己模块的路由规则

    var app = angular.module('coming_soon',['ngRoute','myjsonpService','details']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/coming_soon/:page?',{
            templateUrl:'./coming_soon/coming_soon.html',
            controller:'coming_soonCtrl'
        });

    }]);

    app.controller('coming_soonCtrl',['$scope','$http','myService','$routeParams','$route','$window',function($scope,$http,myService,$routeParams,$route,$window){
        /* $http.get('./coming_soon/data.json').then(function(res){
            console.log(res);
            $scope.data = res.data;
        }); */
        $scope.loadingShow = true;
        $scope.pageSize = 5;
        console.log($routeParams);
        $scope.page =($routeParams.page || "1") -0;
        console.log($scope.page);

        var start = ($scope.page-1)*$scope.pageSize;


        myService.jsonp('https://api.douban.com/v2/movie/coming_soon',{start:start,count:$scope.pageSize},function(data){
            console.log(data);
            $scope.data = data;

            $scope.pageTotal = $window.Math.ceil($scope.data.total/$scope.pageSize);

            if($scope.page === 1){
                $scope.prevDisable=true;
                $scope.nextDisable=false;
            }else if($scope.page === $scope.pageTotal){
                $scope.prevDisable=false;
                $scope.nextDisable=true;
            }else{
                $scope.prevDisable=false;
                $scope.nextDisable=false;
            }
            //通知angular数据模型改变了,让angular更新数据模型
             $scope.loadingShow = false;
            $scope.$apply();
        })

        $scope.getPage = function(nowpage){
            //判断是否为第一页
            if(nowpage <= 1){
                return;
            }
            //判断是否为最后一页
            if(nowpage >= $scope.pageTotal){
                return;
            }
            console.log(nowpage);
            //更新锚点值参数
            $route.updateParams({page:nowpage});
        }
    }]);

})(angular)
