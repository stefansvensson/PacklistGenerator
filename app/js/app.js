
// app.js
	// create the module and name it awesomeApp
		// include ngRoute for all routing needs
    var awesomeApp = angular.module('awesomeApp', [ 
        'ngRoute',
        'awesomeAppControllers',
        'awesomeAppFilters'
    ]);

	// configure the routes
	awesomeApp.config(function($routeProvider){
		$routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/gender', {
                templateUrl : 'pages/gender.html',
                controller  : 'genderController'
            })

            // route for the about page
            .when('/settings', {
                templateUrl : 'pages/settings.html',
                controller  : 'settingsController'
            })

            // route for the contact page
            .when('/packlists/:btnId', {
                templateUrl : 'pages/packlists.html',
                controller  : 'packlistsController'
            })

            // route for the about page
            .when('/testing', {
                templateUrl : 'pages/testing.html',
                controller  : 'testingController'
            });
	});
//

