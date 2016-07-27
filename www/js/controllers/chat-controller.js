angular.module('starter.chatControllers', [])


.controller('chatListCtrl',function($scope,$state,chatRoomList){
   chatRoomList.getChatList().then(function(data){
      $scope.chatRoomList = data.chat_rooms;
      localStorage.chatRoomList = JSON.stringify(data.chat_rooms);
      console.log($scope.chatRoomList);
   })    
})

.controller('chatboxCtrl', function($scope,$state,$ionicPlatform,$timeout,$interval,$ionicScrollDelegate,socket) {
    var auth;
    var roomId=$stateParams.id;
    var chatList = JSON.parse(localStorage.chatRoomList);
    var roomId=$stateParams.id;
    $scope.$on('$ionicView.enter', function() {
      console.log($stateParams);
      socket.emit("join_room",{'room':roomId});
      console.log('UserMessages $ionicView.enter');
      getMessages();
      
      $timeout(function() {
        footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        scroller = document.body.querySelector('#userMessagesView .scroll-content');
        txtInput = angular.element(footerBar.querySelector('textarea'));
      }, 0);

      messageCheckTimer = $interval(function() {
        }, 20000);
      });
    
    socket.emit('authentication',{token:"",userId:""});
    socket.on('authenticated',function(body){
      if(body.success == true){
        auth = true;
        console.log(auth);
      }
    });
     function getMessages() {
        $scope.messages =JSON.parse(localStorage.roomId);
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
    $scope.messages = [];
    $scope.sendMessage= function() {
        console.log($scope.textbox);
        $scope.messages.push({type:"0",text:$scope.textbox});  
        socket.emit('chatting',{"message":$scope.textbox});
        localStorage.setItem('roomId',JSON.stringify($scope.messages));
          // localStorage.roomId=JSON.stringify($scope.messages);
        $scope.textbox='';
        $timeout(function() {
        viewScroll.scrollBottom();
        }, 0);

  }


        // }
};

socket.on('new_message',function(data){

    $scope.messages.push({type:"1",text:data.body});
    localStorage.setItem('roomId',JSON.stringify($scope.messages));
    // localStorage.roomId=JSON.stringify($scope.messages);
       $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
 });
 
  console.log("chat is running");
  console.log(socket);

$scope.onFocusFun = function(){
  socket.emit('typing',{'username':"shubham"});
}

$scope.onBlurFun = function(){
  socket.emit('stop-typing',{'username':"shubham"});
}
<<<<<<< HEAD
=======

>>>>>>> 160cc9c01045451de2555e0ad5b3363cb2e197df
socket.on('typing',function(data) {
  console.log(data.body+"\tis typing");
});

socket.on('stop-typing',function(data){
  console.log(data.body+"\tis stop typing");
});

$scope.$on('$ionicView.beforeLeave',function(){
    socket.emit("leave_room",{'room':roomId});
});
// $scope.$on('$ionicView.leave',function(){

// })
});
