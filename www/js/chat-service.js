angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://c5bd3196.ngrok.io');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})