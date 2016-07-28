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


.controller('signupCtrl', function($scope,$state,$ionicPlatform) {
  /*$ionicPlatform.ready(function() {
            if(window.StatusBar){
                    window.StatusBar.overlaysWebView(false);
                    window.StatusBar.Hide();
            }
  });*/
  $scope.SignUp=function(){
    $state.go('home.match');
  }
})
.controller('homeCtrl', function($scope,$state,$ionicPlatform,$rootScope, $ionicModal,socket) {
  $ionicPlatform.ready(function() {
            if(window.StatusBar){
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.Hide();
            }
  });

  $scope.toggleIcon = function($event, iconName,username) {
    var success = false;
    var buttonClasses = $event.currentTarget.className;
    socket.emit('request',{'by':"shubham",'to':"ladki"});
    socket.on("request-sent",function(body){
    success = body.success;
    if(success){
      if (buttonClasses.indexOf(iconName + '-outline') > 0) {
      buttonClasses = buttonClasses.replace('-outline', '');
    } else {
      buttonClasses = buttonClasses.replace(iconName, iconName + '-outline');
    }
    $event.currentTarget.className = buttonClasses;
    }
  })
    

    console.log(username);
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
  $scope.viewProfile = function(data) {
    $scope.data = data;
    $scope.modal.show();
  };
  $rootScope.data=3;


    

})
.controller('notifcationsCtrl', function($scope,$rootScope,socket) {
$scope.$on('$ionicView.enter', function() {
          $rootScope.data=0;
     
    });
$scope.acceptFun = function(){
    socket.emit('request-accepted',{'acceptedBy':"Shubham",'requestedBy':"agrawal"});
};
$scope.rejectFun = function(){  
    socket.emit('request-declined',{'username':"Shubham",'to':"Agrawal"});
};

   
})

.controller('infoCtrl', function($scope,$ionicSlideBoxDelegate) {

   $scope.verify = function() {

      var alertPopup = $ionicPopup.alert({
        title: 'Info',
        template: 'hello word'
      });
  };
})

.controller('matchCtrl',function($scope,$ionicSlideBoxDelegate) {

  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index,200);
  }
  $scope.test=function(){
      alert('heehh');
  };
  $scope.dataset = [{"_id":"579320b2f7e8a0581c86ac90","picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/c0.21.320.320/p320x320/579080_365174433573364_446527233_n.jpg?oh=8dd734cc77624d5abd64ff8dcb14e16f&oe=5833D2F4","height":-1,"religion":null,"occupation":null,"gender":"male","name":"John Kiran","username":"1058382204252580"},{"_id":"57932276f7e8a0581c86ac91","picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/c74.22.276.276/p320x320/64441_440983889354035_1453730571_n.jpg?oh=5d1aa57fda37c0e6ff8e5ee64e15ddb2&oe=582E94E0","height":-1,"religion":null,"occupation":null,"gender":"female","name":"Jeba Parveen","username":"1176538332465250"}];
})

.controller('profileCtrl',function($scope,$state){
  $scope.Edit=function(){
     $state.go('firstSignup');
  }
})

.controller('SplashScreenCtrl', ['$scope', '$state', '$timeout',
   function($scope, $state, $timeout) {

    $timeout(function() {
      $state.go('initial');
      }, 10000);
 }]);


