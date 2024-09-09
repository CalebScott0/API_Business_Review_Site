const express = require("express");
const landingPageRouter = express.Router();

const { getMostRecentReviews } = require("../db/reviews");

//   GET /api/landing-page/reviews/recent
landingPageRouter.get("/reviews/recent", async (req, res, next) => {
  try {
    const reviews = await getMostRecentReviews();

    res.send({ reviews });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// get top businesses 

// get photos

module.exports = landingPageRouter;