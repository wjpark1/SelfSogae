angular.module('starter.controllers', [])

.controller('StartupCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log('StartupCtrl');

})

.controller('InitialCtrl', function($scope) {

  console.log('initial controller');

})
.controller('detailsCtrl', function($scope,$state,$ionicPlatform) {
  $ionicPlatform.ready(function() {
            if(window.StatusBar){
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.Hide();
            }
  });
  $scope.abc=function(){
    $state.go("third");
  }
})

.controller('initialCtrl', function($scope,$ionicSlideBoxDelegate) {

  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index,200);
  }
})

.controller('SplashScreenCtrl', ['$scope', '$state', '$timeout',
   function($scope, $state, $timeout) {

    $timeout(function() {
      $state.go('initial');
      }, 3000);
 }]);


