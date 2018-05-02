"use strict";

angular.module("MovieWatchlist", ["ngRoute"]).config($routeProvider => {
  $routeProvider
    .when("/test", {
      templateUrl: "partials/test.html",
      controller: "TestCtrl"
    })
    .when("/movies", {
      templateUrl: "partials/movies.html",
      controller: "MovieCtrl"
    })
    .when("/", {
      templateUrl: "partials/auth-form.html",
      controller: "AuthCtrl"
    })
    .otherwise("/");
});

// On a page refresh, the currentUser we set in the auth factory is lost, since it's just a variable. We need to be able to ask the backend for the user it has stored in session so we can reestablish who our current user is. Below, we listen for a route change and call a method that will ping the backend for the logged-in user, then broadcast that information via a custom event to the listening controllers ( see the test controller and the movie controller)
angular
  .module("MovieWatchlist")
  .run(($rootScope, $location, $route, $window, AuthFactory) => {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      AuthFactory.setUserStatus().then(() => {
        console.log("user", AuthFactory.getCurrentUser());
        console.log("next", next);
        AuthFactory.broadcastUserLogin(AuthFactory.getCurrentUser());
      });
    });
  });
