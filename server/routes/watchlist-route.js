const { Router } = require("express");
const router = Router();
const {
  saveToWatchlist
} = require("../controllers/watchlistCtrl");

router.post("/watchlist", saveToWatchlist);
// router.get("/watchlist", foo);

module.exports = router;
