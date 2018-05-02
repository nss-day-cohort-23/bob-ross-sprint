'use strict';

const { Router } = require("express");
const router = Router();

router.use(require("./auth-route"));
router.use(require("./movie-api-route"));
router.use(require("./watchlist-route"));

module.exports = router;
