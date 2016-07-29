/**
 * Created by Rupesh Choudhary on 7/29/2016.
 */
angular.module('starter.apiservices', [])

  .factory('apiServices',function($http){

    return {
      updateProfile : function (data){
        return $http.post("http://localhost:3000/api/v1/user/update/", data, {headers: {'Content-Type': 'application/json'}});
      }
    }
  });
