"use strict";

angular.module("MovieWatchlist").controller("TestCtrl", function($scope) {
  $scope.message = "This is a test of the Emergency Web App System";

  $scope.$on("handleBroadcast", function(event, user) {
    console.log("handleBroadcast called in testCtrl", user);
  });

});
