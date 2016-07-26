angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://127.0.0.1:3030');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})