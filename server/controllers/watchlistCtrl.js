"use strict";

module.exports.saveToWatchlist = ({ app, body: { user_id, imdb_id } }, res, next) => {
  let Movie = app.get("models").Movie;
  Movie.create({ user_id, imdb_id })
    .then(() => {
      res.status(201).end(); // 201 = new resource created
    })
    .catch(err => {
      next(err);
    });
};

// module.exports.getWatchlist = (req, res, next) => {
//   let Movie = app.get("models").Movie;
// };
