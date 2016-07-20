// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.loginControllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider.state('app',{
        url:'/SplashScreen',
        templateUrl:'templates/SplashScreen.html',
        controller:'SplashScreenCtrl'
      })
      .state('initial',{
        url:'/initial',
        templateUrl:'templates/initial.html',
        controller:'initialCtrl'
      })
      .state('info',{
        url:'/info',
        templateUrl:'templates/info.html',
        controller:'infoCtrl'
        
      })
      .state('selected',{
        url:'/selected',
        templateUrl:'templates/SelectedDetails.html',
        
        
      })
      .state('home',{
        url:'/home',
        abstract: true,
        templateUrl:'templates/home.html',
        controller: 'homeCtrl'
        
      })

      .state('home.match', {
        url: "/match",
        views: {
          'match-tab': {
            templateUrl: "templates/match.html"
          }
        }
      })
      .state('home.chat', {
        url: "/chat",
        views: {
          'chat-tab': {
            templateUrl: "templates/chat.html"
          }
        }
      })
      .state('home.profile', {
        url: "/profile",
        views: {
          'profile-tab': {
            templateUrl: "templates/profile.html"
          }
        }
      })
      .state('details',{
        url:'/details',
        templateUrl:'templates/details.html',
        controller:'detailsCtrl'
        
      })
      ;
      $urlRouterProvider.otherwise('/home/match');
});
