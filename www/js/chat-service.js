angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://127.0.0.1:3030');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})

.factory('chatRoomList',function($http) {

	return {
		getChatList : function() {
			return $http.get('https://link_for_the_list');
		}
	}
});