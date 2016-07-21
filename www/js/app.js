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
  $stateProvider
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
})

.directive('textarea', function() {
    return {
        restrict: 'E',
        link: function( scope , element , attributes ) {
            var threshold    = 45,
                minHeight    = element[0].offsetHeight,
                paddingLeft  = element.css('paddingLeft'),
                paddingRight = element.css('paddingRight');

            var $shadow = angular.element('<div></div>').css({
                position:   'absolute',
                top:        -10000,
                left:       -10000,
                /*width:      element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),*/
                fontSize:   element.css('fontSize'),
                fontFamily: element.css('fontFamily'),
                lineHeight: element.css('lineHeight'),
                resize:     'none'
            });

            angular.element( document.body ).append( $shadow );

            var update = function() {
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i++) {
                        r += string;
                    }
                    return r;
                }

                var val = element.val().replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/\s{2,}/g, function( space ) {
                        return times('&nbsp;', space.length - 1) + ' ';
                    });

                $shadow.html( val );

                element.css( 'height' , Math.max( $shadow[0].offsetHeight + threshold , minHeight ) );
            }

            scope.$on('$destroy', function() {
                $shadow.remove();
            });

            element.bind( 'keyup keydown keypress change' , update );
            update();
        }
    }
})

;
