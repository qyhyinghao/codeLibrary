(function(angular){

    "usestrict";
    //自己维护自己模块的路由规则

    var app = angular.module('in_theaters',['ngRoute','myjsonpService']);
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/in_theaters/:page?',{
            templateUrl:'./in_theaters/in_theaters.html',
            controller:'in_theatersCtrl'
        })

    }]);

    app.controller('in_theatersCtrl',['$scope',
    '$http',
    'myService',
    '$routeParams',
    '$route',
    '$window',
    function($scope,$http,myService,$routeParams,$route,$window){

        console.log($routeParams);

        $scope.loadingShow = true;

        $scope.pageSize = 5;
        //获取当前的页数
        $scope.page = ($routeParams.page || "1") - 0;

        var start = ($scope.page - 1)*$scope.pageSize;
         
        myService.jsonp('https://api.douban.com/v2/movie/in_theaters',{start:start,count:$scope.pageSize},function(data){
            console.log(data);
            //读取数据
            $scope.data = data;
            //计算总页数
            $scope.pageTotal =$window.Math.ceil($scope.data.total/$scope.pageSize);
            console.log($scope.pageTotal);
            //判断当前的页数对按钮的样式进行设置
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
        });

        console.log($scope.page);

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
