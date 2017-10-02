//自定义指令
(function(angular){
var app=angular.module('todoApp.directive',[]);
	app.directive('myFocus',[function(){
		return {
			link:function(scope,dom,attr){
				dom.on('dblclick',function(){
					//console.log(dom.find('input').eq(1));   //打印出来的是一个数组
					dom.find('input').eq(1)[0].focus();
				});
			}
		}
	}]);

})(angular);
