angular.module('starter.loginControllers', ['ngStorage', 'ngCordova'])

.controller('initialCtrl', function($scope,$ionicSlideBoxDelegate, $cordovaOauth, $localStorage, $location) {

  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index,200);
  }

//handel the login process of the facebook
//app id here is 158674504552863
//["public_profile", "email", "user_friends"] are the permissions for the facebook
  $scope.login = function() {
        $cordovaOauth.facebook("158674504552863", ["public_profile", "email", "user_friends"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            console.log("login sucessfull with token = " + result.access_token);
            $location.path("/details");          // if sucessfull redirect to detail page
        }, function(error) {                     //handel any error
            alert("Login unsuccessful.! Please try again.. ");
            console.log(error);
        });
    };
});