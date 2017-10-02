//创建控制器子模块
(function (angular) {
	angular.module('todoApp.controller', [])
		//中括号防止压缩
		.controller('todoCtrl', ['$scope','$filter', function ($scope,$filter) {
			$scope.text = "todos";
			$scope.todoEditText={};
			//查
			//思路：ng-repeat+数组，生成列表
			$scope.todoList = [
				{status: true, text: 'angular'},
				{status: false, text: 'vue'},
				{status: false, text: 'react'},
				{status: true, text: 'jquery'}
			];
			//增
			//思路： 1、先初始化文本框
			//      2、当文本框内容长度大于0时，添加到列表，否则不添加
			$scope.todoText = '';
			$scope.todoAdd = function () {
				if($scope.todoText.length>0){
					$scope.todoList.push({status:false,text:$scope.todoText});
					$scope.todoText = '';
				}
			};
			//删
			//思路：点击删除按钮，根据对应的索引删除元素
			//		ng-click调用函数时，传入i$index，控制器接收传入的参数
			$scope.todoDelete=function(index){
				//console.log(index);
				$scope.todoList.splice(index,1);
			};
			//修改（编辑）
			//思路：1、双击文本，切换到编辑框 (此时获取到文本框的当前内容)
			//     2、离开焦点，保存，清空编辑框  并切换回文本列表框

			//先初始化编辑框  因为之后要传入的是todo对象，所有这里写对象

			//触发双击事件，ng-blur传入todo参数，控制器接收传入的参数
			$scope.todoEdit=function(todo){
				//console.log(todo);
				$scope.todoEditText=todo;
			}
			//失去焦点时，保存,清空编辑框，并返回文本todoList列表
			$scope.todoBlur=function(){
				$scope.todoEditText={};
			}

			//统计 数据过滤 删除全部 全选
			//全选切换
			$scope.changeToggleAll=function(){
				$scope.todoList.forEach(function(item){
					//console.log(item);
					item.status=$scope.isToggleAll
				})
			}
			//删除已完成数据
			$scope.clearCompleted=function(){
				//过滤掉已完成数据,即显示未完成数据
				$scope.todoList=$filter('filter')($scope.todoList,{status:false})
			}
			//切换状态
			//$scope.statusFilter={status:true};//可筛选已完成数据
			//$scope.statusFilter={status:false}; //可筛选出为完成数据
			$scope.statusFilter={}; //可筛选出全部数据
			$scope.changeStatus=function(data){
				$scope.statusFilter=data;
			}
			//使用过滤器过滤数据
			// 1.引用$filter服务
			// 2. $filter('过滤器名称')('过滤的数据',过滤的参数)
			//$watch 加true监听每次函数改变
			$scope.$watch('todoList',function(newVal){

				$scope.todoCount=$filter('filter')(newVal,{status:false}).length;

				$scope.isShowClearCompleted=$filter('filter')(newVal,{status:true}).length>0?true:false;

				//全选切换
				$scope.isToggleAll=!$scope.todoCount;
			},true)

		}]);
})(angular);
