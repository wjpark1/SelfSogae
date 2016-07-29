angular.module('starter.chat-services',[])
.factory('socket', function($http, socketFactory){

  var myIoSocket = io.connect('http://127.0.0.1:3030');

  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
})

.factory('requestsList',function($http){
	return {
		getRequestList : function() {
			return $http.get('https://jsonblob.com/api/579aedf1e4b0dc55a4e8b28d',{params:{format:"json"}});
		}
	}
})

.factory('chatRoomList',function($http) {
return {
		getChatList : function() {
			return $http.get('https://jsonblob.com/api/5799da41e4b0dc55a4e8420e',{ params:{format:"json"}});
		}
	}
});
