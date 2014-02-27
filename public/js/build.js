var boumtchak = angular.module('boumtchak',['ngRoute','ngAnimate']);

boumtchak.config(function($routeProvider) {
	$routeProvider.
		when('/news', {	
			templateUrl: 'partials/news.html',
			controller: 'NewsCtrl'
		}).
		when('/dates', {
			templateUrl: 'partials/dates.html',
			controller: 'DatesCtrl'
		}).
		when('/photos', {
			templateUrl: 'partials/photos.html',
			controller: 'PhotosCtrl'
		}).
		when('/videos', {
			templateUrl: 'partials/videos.html',
			controller: 'VideosCtrl'
		}).
		when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'ContactCtrl'
		}).
		when('/404', {
			templateUrl: 'partials/404.html'
		}).
		otherwise({
			redirectTo: '/404'
		});
});
boumtchak.controller('DatesCtrl',function($scope, $http){
	$scope.title = 'Dates';
	//Fetching dates data
	$http.get('/dates').success(function(data){
		//Real Data
		$scope.dates = data;
	});
});

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






boumtchak.controller('VideoCtrl', function($scope, $timeout, $document, $window, $interval){

	$scope.vid = document.getElementsByClassName('video-background')[0];

	$scope.timeline= {
			home:{ start: 0, duration: 7},
			news: { start: 7, duration: 13},
			dates: { start: 20, duration: 3},
			photos: { start: 23, duration: 17},
			videos: { start: 40, duration: 10},
			contact: { start: 50, duration: 10}
		};
	
	//Play function
	$scope.play = function(){
		$scope.vid.play();
	};
	//pause Function
	$scope.pause = function(){
		$scope.vid.pause();
		$interval.cancel($scope.promise);
	};
	//Go To Time (s)
	$scope.goTo = function(t){
		$interval.cancel($scope.promise);
		$scope.vid.currentTime = t;
	};

	//Load Scene from Timeline
	$scope.loadScene = function(scene){
		$timeout.cancel($scope.timeout);
		$scope.delay = $scope.timeline[scene].duration * 1000 ;
		$scope.end = $scope.timeline[scene].start + $scope.timeline[scene].duration ;
		$interval(updateTime, 200);
		$scope.goTo($scope.timeline[scene].start);
		$scope.timeout = $timeout(function(){
			$scope.promise = $interval(checkPause,100);
		}, $scope.delay);
		$scope.play();

	};

	var checkPause = function(){
		if (($scope.vid.currentTime) > $scope.end){
			$scope.pause();
			console.log("Paused !");
		}


		console.log("checkPause: current :"+ $scope.vid.currentTime + "    End: " + $scope.end);
	};



	var updateTime = function(){
		$scope.timeVid = $scope.vid.currentTime;
	};
});