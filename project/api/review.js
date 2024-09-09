const express = require("express");
const reviewRouter = express.Router();

const { createReview, updateReview, deleteReview } = require("../db/reviews");

const {
  checkCreateReviewData,
  checkUpdateReviewData,
  checkUserHasReview,
  checkIsUserReview,
} = require("./utils");

// user will be set to req.user as token will be required for review functions

// POST /api/review/:businessId
reviewRouter.post(
  "/:businessId",
  // check if user already has review for business,
  // then check if user provided text & star rating
  checkUserHasReview,
  checkCreateReviewData,
  async (req, res, next) => {
    try {
      const review = await createReview({
        ...req.body,
        authorId: req.user.id,
        businessId: req.params.businessId,
      });
      res.status(201).send({ review });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// PUT /api/review/:id
reviewRouter.put(
  "/:id",
  // check user is author of review
  // then check either text or stars have been provided
  checkIsUserReview,
  checkUpdateReviewData,
  async (req, res, next) => {
    try {
      const review = await updateReview(req.params.id, {
        ...req.body,
        authorId: req.user.id,
      });

      res.send({ review });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// DELETE /api/review/:id
reviewRouter.delete(
  "/:id",
  // check user is author of review
  checkIsUserReview,
  async (req, res, next) => {
    try {
      await deleteReview(req.params.id);

      res.sendStatus(204);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// // GET /api/review/business/:id
// reviewRouter.get("/business/:id", async (req, res, next) => {
//   try {
//     const reviews = await getReviewsForBusiness(req.params.id);

//     res.send({ reviews });
//   } catch (error) {
//     next({
//       name: "UnableToFetchReviews",
//       message: "Unable to fetch reviews",
//     });
//   }
// });

// GET /api/review/recent
// reviewRouter.get("/recent", async (req, res, next) => {
//   try {
//     const reviews = await getMostRecentReviews();

//     res.send({ reviews });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

module.exports = reviewRouter;
