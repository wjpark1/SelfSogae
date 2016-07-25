angular.module('starter.chatControllers', [])

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
 

  $scope.messages = [];
 $scope.sendMessage= function() {
        // if(auth){
          console.log($scope.textbox);
          $scope.messages.push({type:"0",text:$scope.textbox});  
          socket.emit('chatting',{"message":$scope.textbox});
          console.log($scope.messages);
        // }
  }
$scope.onFocusFun = function(){
  socket.emit('typing',{'username':"shubham"});
}

$scope.onBlurFun = function(){
  socket.emit('stop-typing',{'username':"shubham"});
}

socket.on('new_message',function(data){
    console.log(data.body+"aaya hai");
    $scope.messages.push({type:"1",text:data.body});
    console.log($scope.messages);
      
 });

socket.on('typing',function(data) {
  console.log(data.body+"\tis typing");
});

socket.on('stop-typing',function(data){
  console.log(data.body+"\tis stop typing");
});
console.log("chat is running");
console.log(socket);
})
