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
    $state.go('selected');
  }
})

.controller('chatboxCtrl', function($scope,$timeout,$interval,$state,$ionicPlatform,$ionicScrollDelegate,socket) {

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
     function getMessages() {
      // the service is mock but you would probably pass the toUser's GUID here
     
        $scope.messages =JSON.parse(localStorage.data);
        console.log($scope.messages);

        $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
      
    }
    var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
  $scope.textbox="";
 // $scope.input.message="";
    var footerBar; // gets set in $ionicView.enter
    var scroller;
    var txtInput; // ^^^

    $scope.$on('$ionicView.enter', function() {
      console.log('UserMessages $ionicView.enter');

     getMessages();
      
      $timeout(function() {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        // here you could check for new messages if your app doesn't use push notifications or user disabled them
      }, 20000);
    });



  $scope.messages = [];
 $scope.sendMessage= function() {
        // if(auth){
          console.log($scope.textbox);
     
         $scope.messages.push({type:"0",text:$scope.textbox});  
          socket.emit('chatting',{"message":$scope.textbox});
          localStorage.data=JSON.stringify($scope.messages);

        console.log(localStorage.data);
         $scope.textbox='';
          $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
        // }
  }
socket.on('new_message',function(data){

  //var x = data.body+"aaya hai";
    console.log(data.body+"aaya hai");
    $scope.messages.push({type:"1",text:data.body});
   // console.log($scope.messages);
       $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
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
})

.controller('profileCtrl',function($scope,$state){
  $scope.Edit=function(){
     $state.go('details');
  }
})

.controller('SplashScreenCtrl', ['$scope', '$state', '$timeout',
   function($scope, $state, $timeout) {

    $timeout(function() {
      $state.go('initial');
      }, 10000);
 }]);


