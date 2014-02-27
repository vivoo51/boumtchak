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