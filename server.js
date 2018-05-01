"use strict";

const express = require("express");
const app = express();
const movieApi = require("imdb-api");

app.use(express.static(__dirname + "/client"));
app.use("/angular", express.static(__dirname + "/node_modules/angular/"));
app.use("/angular-route", express.static(__dirname + "/node_modules/angular-route/"));

// TODO: Move into routes module
app.get("/movies", (req, res, next) => {
  movieApi
    .search(
      { title: req.query.keyword },
      { apiKey: require("./server/key").key }
    )
    .then(movieData => {
      res.status(200).json(movieData.results);
    });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
