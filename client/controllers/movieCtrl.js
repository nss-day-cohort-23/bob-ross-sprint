"use strict";

angular
  .module("MovieWatchlist")
  .controller("MovieCtrl", function($scope, MovieFactory) {
    let currentUserId = null;

    // This listens for an event that is broadcast via $rootScope. Because $rootScope is the parent scope of $scope, anything on $rootScope is available on $scope ( remember, nested scopes acan look up to a higher scope for a value). When that event is emitted (which happens in the AuthFactory) this controller is sent the current user clientInformation. That allows us to attach the current user id to the object we send to the movie factory in addToWatchlist, below
    $scope.$on("handleBroadcast", function(event, user) {
      console.log("handleBroadcast called in movieCtrl", user);
      currentUserId = user.id;
      console.log("Current user in movie ctrl", currentUserId);
    });

    $scope.searchForMovies = () => {
      MovieFactory.searchAPIMovies($scope.keyword).then(movies => {
        const movieList = movies.data.map(movie => {
          if (movie.poster === "N/A") movie.poster = "/images/no-poster.jpg";
          movie.maintitle = movie.title.length > 22 ? `${movie.title.slice(0, 23)}...` : movie.title;
          return movie;
        });
        $scope.movieList = movieList;
      });
    };

    $scope.addToWatchlist = imdb_id => {
      console.log(imdb_id);
      MovieFactory.postToWatchlist({ user_id: currentUserId, imdb_id }).then(
        movData => {
          console.log("watchlist item added", movData);
          $scope.watchlist = true;
        }
      );
    };
  });
