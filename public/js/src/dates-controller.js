boumtchak.controller('DatesCtrl',function($scope, $http){
	$scope.title = 'Dates';
	//Fetching dates data
	$http.get('/dates').success(function(data){
		//Real Data
		$scope.dates = data;
	});
});