const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is not provided" });
  }
  const id = shortid.generate();
  await URL.create({
    shortId: id,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(201).json({
    id: id,
  });
}

async function handleGetShortURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    }
  );

  return res.redirect(entry.redirectURL);
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ error: "Id is not provided" });
  }
  const result = await URL.findOne({ shortId });

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    visitHistory: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewURL,
  handleGetShortURL,
  handleAnalytics,
};
