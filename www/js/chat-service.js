angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://6fcf1542.io');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})