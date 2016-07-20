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
  /*$ionicPlatform.ready(function() {
            if(window.StatusBar){
                    window.StatusBar.overlaysWebView(false);
                    window.StatusBar.Hide();
            }
  });*/
  $scope.SignUp=function(){
    $state.go('selected');
  }
})

.controller('homeCtrl', function($scope,$state,$ionicPlatform, $ionicModal) {
  $ionicPlatform.ready(function() {
            if(window.StatusBar){
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.Hide();
            }
  });
  $scope.toggleIcon = function($event, iconName) {
    var buttonClasses = $event.currentTarget.className;
    if (buttonClasses.indexOf(iconName + '-outline') > 0) {
      buttonClasses = buttonClasses.replace('-outline', '');
    } else {
      buttonClasses = buttonClasses.replace(iconName, iconName + '-outline');
    }
    $event.currentTarget.className = buttonClasses;
  }

  $ionicModal.fromTemplateUrl('templates/profile-view.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeProfile = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.viewProfile = function() {
    $scope.modal.show();
  };

})

.controller('initialCtrl', function($scope,$ionicSlideBoxDelegate) {

  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index,200);
  }
})

.controller('infoCtrl', function($scope,$ionicSlideBoxDelegate) {

   $scope.verify = function() {

      var alertPopup = $ionicPopup.alert({
        title: 'Info',
        template: 'hello word'
      });
  };
})

.controller('SplashScreenCtrl', ['$scope', '$state', '$timeout',
   function($scope, $state, $timeout) {

    $timeout(function() {
      $state.go('initial');
      }, 10000);
 }]);


