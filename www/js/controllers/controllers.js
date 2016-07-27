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

.controller('chatboxCtrl', function($scope,$state,$ionicPlatform,$ionicScrollDelegate,socket) {
// var x = 1; 
socket.emit("join_room",{'room':"temp"});
var room = "temp";
    // var auth;
    // socket.emit('authentication',{token:"",userId:""});
    // socket.on('authenticated',function(body){
    //   if(body.success == true){
    //     auth = true;
    //   }
    // });
  $scope.textbox="";
 // $scope.input.message="";

  $scope.messages = [];
 $scope.sendMessage= function() {
        // if(auth){
          console.log($scope.textbox);
     
         $scope.messages.push({type:"0",text:$scope.textbox});  
          socket.emit('chatting',{"message":$scope.textbox});
          console.log($scope.messages);
        // }
  }
socket.on('new_message',function(data){

  //var x = data.body+"aaya hai";
    console.log(data.body+"aaya hai");
    $scope.messages.push({type:"1",text:data.body});
    console.log($scope.messages);
      
 });
 
  console.log("chat is running");
  console.log(socket);
 // $scope.chat={
 //  room:"",
 //  message:""
 // };
 // $scope.abcd=function(){
 //  socket.emit('chat',{'room':$scope.chat.room,'message':$scope.chat.message});
 //  console.log($scope.chat.room);
 // };
 // $scope.abcd2=function(){
 //  socket.emit("joinroom",{'room':$scope.chat.room});  
 // };
 
 
})


.controller('homeCtrl', function($scope,$state,$ionicPlatform, $ionicModal) {
  $ionicPlatform.ready(function() {
            if(window.StatusBar){
    window.StatusBar.overlaysWebView(false);
    window.StatusBar.Hide();
            }
  });
  $scope.toggleIcon = function($event, iconName,username) {
    var buttonClasses = $event.currentTarget.className;
    if (buttonClasses.indexOf(iconName + '-outline') > 0) {
      buttonClasses = buttonClasses.replace('-outline', '');
    } else {
      buttonClasses = buttonClasses.replace(iconName, iconName + '-outline');
    }
    $event.currentTarget.className = buttonClasses;

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


