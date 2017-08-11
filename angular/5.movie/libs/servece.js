(function(angular){

    var myjsonpService = angular.module('myjsonpService',[]);
    myjsonpService.service('myService',['$window',function($window){

        this.jsonp = function(url, data, callback) {

            var script = $window.document.createElement("script");
            // srcipt.src=url;
            head = $window.document.querySelector('head');
            // console.log(head);

            var fnName = 'fn' + Date.now();
            $window[fnName] = function (data) {
                callback(data);
            }

            var str = '';
            for (var key in data) {
                str += key + '=' + data[key] + '&';
            }
            url = url + '?' + str + 'callback=' + fnName;

            // console.log(url);

            script.src = url;
            head.appendChild(script);

        }
    }])
})(angular)
