"use strict";

angular.module("MovieWatchlist").factory("MovieFactory", $http => {
  return {
    searchAPIMovies(keyword) {
      return $http.get(`/movies?keyword=${keyword}`);
    },

    postToWatchlist(movie) {
      console.log("factory movie", movie);
      return $http.post(`/watchlist`, movie);
    }
  };
});
