angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://2b4b77e8.ngrok.io');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})