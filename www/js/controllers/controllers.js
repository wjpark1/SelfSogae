angular.module('starter.controllers', [])

.controller('StartupCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  console.log('StartupCtrl');

})


.controller('signupCtrl', function($scope,$state,$ionicPlatform,$localStorage,apiServices) {

    $scope.checkModel = {
      value1 : '',
      value2 : ''
    };
    $scope.form = {
      height:"0",
      religion: "buddists",
      occupation: "",
      about_me:"",
      high_school: "",
      bachelors: "",
      hobbies: []
    };


  /*$ionicPlatform.ready(function() {
            if(window.StatusBar){
                    window.StatusBar.overlaysWebView(false);
                    window.StatusBar.Hide();
            }
  });*/
  $scope.submit=function(){

    var data = {};
    data.hobbies = [];

    if($scope.checkModel.value1 === "Male" && $scope.checkModel.value2 === "Female" )
      data.interested_in = "both";
    else if($scope.checkModel.value1 === "Male")
       data.interested_in = "male";
    else if($scope.checkModel.value2 === "Female")
       data.interested_in = "female";
    else{
      alert("Please select any option in Intrested In section..!!")
      return;
    }

    data.height = parseInt($scope.form.height, 10);
    data.religion = $scope.form.religion;

    var count = 0;
    for(var i=0;i<$scope.form.hobbies.length;i++){
      if($scope.form.hobbies[i] !== "false" && $scope.form.hobbies[i]) {
        data.hobbies.push($scope.form.hobbies[i]);
        count++;
      }
    }
    if(count <= 3){
      alert("Please select atleat four hobbie..!")
      return;
    }

    data.occupation = $scope.form.occupation;
    if(data.occupation.trim() === "") {
      alert("Occupation is not valid.!");
      return;
    }
    data.about_me = $scope.form.about_me;
    if(data.about_me.trim() === "") {
      alert("Please discribe yourself..!");
      return;
    }
    data.high_school = $scope.form.high_school;
    data.bachelors = $scope.form.bachelors;
    data.complete_flag = true;
    data.username = $localStorage.username;
    data.token = $localStorage.serverToken;


    apiServices.updateProfile(data).
      then(function(response) {
               if(response.data.success) {
                 $state.go('home.match');
                 console.log(response);
               }
      }, function(error) {
        alert("Something is not right.. please try again.!");
        console.log(error);
      });
  }

})
.controller('homeCtrl', function($scope,$state,$ionicPlatform,$rootScope, $ionicModal,socket) {
  $ionicPlatform.ready(function() {
            
  });

  $scope.toggleIcon = function($event, iconName,username) {
    var success = false;
    var buttonClasses = $event.currentTarget.className;
    socket.emit('request',{'by':"shubham",'to':"ladki"});
    socket.on("request-sent",function(body){
    success = body.success;
    if(success){
      if (buttonClasses.indexOf(iconName + '-outline') > 0) {
      buttonClasses = buttonClasses.replace('-outline', '');
    } else {
      buttonClasses = buttonClasses.replace(iconName, iconName + '-outline');
    }
    $event.currentTarget.className = buttonClasses;
    }
  })


    console.log(username);
  }


  $ionicModal.fromTemplateUrl('templates/profile-view.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeProfile = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.viewProfile = function(data) {
    $scope.data = data;
    $scope.modal.show();
  };

  $rootScope.data=0;
  socket.on('notification',function(){
    $rootScope.data++;
  });

})
.controller('notifcationsCtrl', function($scope,$rootScope,socket,requestsList) {
$scope.$on('$ionicView.enter', function() {
        requestsList.getRequestList().then(function(data){
          $scope.requestList = data.data.data;
          console.log(data);
        });
          // $rootScope.data=0;
     
});
$scope.acceptFun = function(obj,username){
  console.log(username);
  console.log(obj);
    socket.emit('request-accepted',{'acceptedBy':localStorage.username,'requestedBy':username});
};
$scope.rejectFun = function(obj,username){
    console.log(username);  
    socket.emit('request-declined',{'username':localStorage.username,'to':username});
   };
})

.controller('infoCtrl', function($scope,$ionicSlideBoxDelegate) {

   $scope.verify = function() {

      var alertPopup = $ionicPopup.alert({
        title: 'Info',
        template: 'hello word'
      });
  };
})

.controller('matchCtrl',function($scope,$ionicSlideBoxDelegate) {

  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index,200);
  }
  $scope.test=function(){
      alert('heehh');
  };
  $scope.dataset = [{"_id":"579320b2f7e8a0581c86ac90","picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/c0.21.320.320/p320x320/579080_365174433573364_446527233_n.jpg?oh=8dd734cc77624d5abd64ff8dcb14e16f&oe=5833D2F4","height":-1,"religion":null,"occupation":null,"gender":"male","name":"John Kiran","username":"1058382204252580"},{"_id":"57932276f7e8a0581c86ac91","picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/c74.22.276.276/p320x320/64441_440983889354035_1453730571_n.jpg?oh=5d1aa57fda37c0e6ff8e5ee64e15ddb2&oe=582E94E0","height":-1,"religion":null,"occupation":null,"gender":"female","name":"Jeba Parveen","username":"1176538332465250"}];
})

.controller('profileCtrl',function($scope,$state){
  $scope.Edit=function(){
     $state.go('editProfile');
  }
})

.controller('SplashScreenCtrl', ['$scope', '$state', '$timeout',
   function($scope, $state, $timeout) {

    $timeout(function() {
      $state.go('initial');
      }, 10000);
 }]);


