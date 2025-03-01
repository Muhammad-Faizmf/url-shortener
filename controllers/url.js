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

module.exports = { handleGenerateNewURL, handleGetShortURL };
