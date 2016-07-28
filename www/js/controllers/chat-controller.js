angular.module('starter.chatControllers', [])


.controller('chatListCtrl',function($scope,$state,$stateParams,chatRoomList){
   chatRoomList.getChatList().then(function(data){
    console.log(data);
      console.log("sh"+data.data.data[0].partner);
      $scope.chatRoomList = data.data.data;
      localStorage.chatRoomList = JSON.stringify(data.data.data);
   })

})


.controller('chatboxCtrl', function($scope,$state,$localStorage,$ionicPlatform,$stateParams,$timeout,$interval,$ionicScrollDelegate,socket) {

    var auth;
    var x = $stateParams.id;
    console.log(x);
    var roomId=$stateParams.id;
    console.log("roomId"+roomId);

    var chatList = JSON.parse(localStorage.chatRoomList);
    var roomId=$stateParams.id;
    $scope.$on('$ionicView.enter', function() {
      $scope.messages = [];
      if(localStorage.getItem(roomId) == undefined){
          localStorage.setItem(roomId,"");
      }
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
        $scope.messages =JSON.parse(localStorage.getItem(roomId));
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
    $scope.messages = [{
      type:"",
      text:""
    }];
    $scope.sendMessage= function() {

        console.log($scope.textbox);
        socket.emit('chatting',{"message":$scope.textbox,"room":roomId});
        $scope.messages.push({type:"0",text:$scope.textbox});
        localStorage.setItem(String(roomId),JSON.stringify($scope.messages));
        // localStorage.roomId=JSON.stringify($scope.messages);
        $scope.textbox='';
        $timeout(function() {
        viewScroll.scrollBottom();
        }, 0);

  }


socket.on('new_message',function(data){
  // $scope.messages_return = [];
    console.log("message aaya hai");
    $scope.messages.push({type:"1",text:data.body});
    localStorage.setItem(String(roomId),JSON.stringify($scope.messages));
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

socket.on('typing',function(data) {
  console.log(data.body+"\tis typing");
});

socket.on('stop-typing',function(data){
  console.log(data.body+"\tis stop typing");
});

$scope.$on('$ionicView.beforeLeave',function(){
    socket.emit("leave_room",{'room':roomId});
});
});
