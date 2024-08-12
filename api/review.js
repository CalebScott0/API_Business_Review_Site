// CREATE MIDDLEWARE IN UTILS - CHECKS IF USER HAS ALREADY SUBMITTED REVIEW ON BUSINESS

const express = require("express");
const reviewRouter = express.Router();

const { createReview, updateReview, deleteReview } = require("../db/reviews");
const {
  checkCreateReviewData,
  checkUpdateReviewData,
  checkUserHasReview,
} = require("./utils");

// user will be set to req.user as token will be required for review functions
reviewRouter.post(
  "/:businessId",
  // check if user already has review for business,
  // then check if user provided text & star rating
  checkUserHasReview,
  checkCreateReviewData,
  async (req, res, next) => {
    try {
      const { businessId } = req.params.businessId;
      const { text, stars } = req.body;
      const newReview = {
        text,
        stars,
        authorId: req.user.id,
        businessId,
      };
      const postReview = await createReview(newReview);

      res.status(201).send({ postReview });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = reviewRouter;
