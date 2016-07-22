angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://8c17913c.ngrok.io');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})