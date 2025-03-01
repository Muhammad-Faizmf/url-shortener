const express = require("express");
const router = express.Router();
const {
  handleGenerateNewURL,
  handleGetShortURL,
} = require("../controllers/url");

router.post("/", handleGenerateNewURL);

router.get("/:shortId", handleGetShortURL);

module.exports = router;
