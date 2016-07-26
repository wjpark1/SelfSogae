// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.loginControllers','starter.chatControllers','starter.chat-services','btford.socket-io'])

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
  $stateProvider
      .state('login',{
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'loginCtrl'
      })
      .state('firstSignup',{
        url:'/firstSignup',
        templateUrl:'templates/firstSignup.html',
        controller:'signupCtrl'
      })

      .state('info',{
        url:'/info',
        templateUrl:'templates/info.html',
        controller:'infoCtrl'
      })
      .state('chatbox',{
        url:'/chatbox',
        templateUrl:'templates/chatBox.html',
        controller:'chatboxCtrl'
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
            templateUrl: "templates/match.html",
            controller: "matchCtrl"
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
            templateUrl: "templates/profile.html",
            controller: 'profileCtrl'
          }
        }
      })
     
      .state('settings',{
        url:'/settings',
        templateUrl:'templates/settings.html'
      })
      .state('terms',{
        url:'/terms',
        templateUrl:'templates/terms.html'
      })
      ;
      $urlRouterProvider.otherwise('/firstSignup');
})
.filter('nl2br', ['$filter',
  function($filter) {
    return function(data) {
      if (!data) return data;
      return data.replace(/\n\r?/g, '<br />');
    };
  }
]);

