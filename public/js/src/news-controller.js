
boumtchak.controller('NewsCtrl',function($scope, $http){
	$scope.title = 'News';
	$scope.i = 0;
	$scope.currentNews = [];  
	//Fetching articles data
	$http.get('/articles').success(function(data){
		//Real Data
		$scope.news = data;
		//Fake Data
		//$scope.news=[{"saveDate": "03 Avril", "title":"Article n°1", "content":"BOUM Tchak Rocks! Et un peu plus de texte pour faire plus long histoire de... Blalbalbalbalba... "},{"saveDate": "09 Avril", "title":"Article n°2", "content":"BOUM Tchak Rocks! Et un peu plus de texte pour faire plus long histoire de... Blalbalbalbalba... "}];
		$scope.currentNews[0] = $scope.news[0];
	});
	$scope.addNews = function(){
		if($scope.i !=$scope.news.length -1){
			$scope.i++;
			$scope.currentNews.push($scope.news[$scope.i]);
			// Remove 1st article for simple pagination
			if ($scope.currentNews.length > 2)
				$scope.currentNews = $scope.currentNews.slice(1,3);
		}
	};
});





