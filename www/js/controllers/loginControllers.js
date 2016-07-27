angular.module('starter.loginControllers', ['ngStorage', 'ngCordova'])

.controller('loginCtrl', function($scope,$http,$ionicSlideBoxDelegate, $cordovaOauth, $localStorage, $location) {

  $scope.navSlide = function(index){
    $ionicSlideBoxDelegate.slide(index,200);
  }

//handel the login process of the facebook
//app id here is 158674504552863
//["public_profile", "email", "user_friends"] are the permissions for the facebook
  $scope.login = function() {
      $cordovaOauth.facebook("158674504552863", ["public_profile", "email", "user_friends","user_birthday","user_relationships","user_location","user_photos","user_hometown"]).then(function(result) {
            $localStorage.fbAccessToken = result.access_token;
            console.log("login sucessfull with token = " + result.access_token);
            //get detail about the user from facebook
            $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $localStorage.fbAccessToken, fields: "id,name,email,gender,relationship_status,cover,location,picture.height(250).width(250),birthday,friends", format: "json" }}).then(function(result) {
                $scope.profileData = result.data;
                console.log(result.data);
                $localStorage.fbDetailFetched = true;
                
                var user = {};
                user.token = $localStorage.fbAccessToken;
                user.username = result.data.id;
                user.name = result.data.name;
                user.email = result.data.email;
                user.gender = result.data.gender;
                //user.relationship_status = result.data.relationship_status;
                user.cover = result.data.cover.source;
                //user.location = result.data.location.name;
                user.picture = result.data.picture.data.url;
                //user.birthday = result.data.birthday;

                $http.post("http://f259ef4b.ngrok.io/api/v1/user/auth", user, { headers: { 'Content-Type': 'application/json' } }).
				then(function(response) {
   					 console.log(response);
   					 if(response.data.success === true){
                         $localStorage.serverToken = response.data.token;
                         if(response.data.policy_flag === flase){
                         	 $location.path("/firstSignup");
                         } else{
                         	$location.path("/home/match");
                         }     
   					 }
				}, function(error) {
  					  alert("Something is not right.. please try again.!");
    					console.log(error);
				});
            }, function(error) {
                alert("There was a problem getting your profile..");
                console.log(error);
            });
                 // if sucessfull redirect to detail page
        }, function(error) {                     //handel any error
            alert("Login unsuccessful.! Please try again.. ");
            console.log(error);
        });

    };
});