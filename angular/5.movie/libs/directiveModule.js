(function(angular){

    var  app = angular.module('directiveApp',[]);
    app.directive('autoActive',['$location',function($location){

        return {
            link:function(scope,element,attributes){
                element.on("click",function(){
                    /*console.log(123);
                    console.log(this);*/
                    element.parent().children().removeClass('active');
                    element.addClass('active');

                                  
                });
                scope.loc = $location; 
                scope.$watch('loc.url()',function(now,old){
                        var hash = element.find('a').attr('href').substr(2);
                        console.log('hash:'+hash);
                        console.log('now:'+now);
                        //element.parent().f
                        if(now.startsWith(hash)){
                            element.parent().children().removeClass('active');
                         // 让当前元素添加样式
                            element.addClass('active');
                        }
                });
            }
        }
    }]);

    
})(angular)
