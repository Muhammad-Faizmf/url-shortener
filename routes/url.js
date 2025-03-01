const express = require("express");
const router = express.Router();
const {
  handleGenerateNewURL,
  handleGetShortURL,
  handleAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewURL);

router.get("/:shortId", handleGetShortURL);

router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
