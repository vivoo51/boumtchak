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