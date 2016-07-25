angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://fb1ee5b6.ngrok.io');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})