angular.module('starter.chatControllers', [])


.controller('chatboxCtrl', function($scope,$state,$ionicPlatform,$timeout,$interval,$ionicScrollDelegate,socket) {

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

      //  console.log(localStorage.data);
         $scope.textbox='';
          $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
        // }
  }
<<<<<<< HEAD
socket.on('new_message',function(data){

  //var x = data.body+"aaya hai";
   // console.log(data.body+"aaya hai");
    $scope.messages.push({type:"1",text:data.body});
    localStorage.data=JSON.stringify($scope.messages);

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
 

=======
>>>>>>> 74f0e781954ec09220ee6ecb4dec0041a88588dc
$scope.onFocusFun = function(){
  socket.emit('typing',{'username':"shubham"});
}

$scope.onBlurFun = function(){
  socket.emit('stop-typing',{'username':"shubham"});
}
<<<<<<< HEAD



=======
socket.on('new_message',function(data){

 
    console.log(data.body+"aaya hai");
    $scope.messages.push({type:"1",text:data.body});
       $timeout(function() {
          viewScroll.scrollBottom();
        }, 0);
 });
 
>>>>>>> 74f0e781954ec09220ee6ecb4dec0041a88588dc
socket.on('typing',function(data) {
  console.log(data.body+"\tis typing");
});

socket.on('stop-typing',function(data){
  console.log(data.body+"\tis stop typing");
});

})
