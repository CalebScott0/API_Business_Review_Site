const express = require("express");
const reviewRouter = express.Router();

const {
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  incrementBusinessOnReview,
  incrementUserOnReview,
  updateBusinessStars,
  updateUserStars,
  decrementBusinessOnReview,
  decrementUserOnReview,
} = require("../db/reviews");

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
      const authorId = req.user.id;
      const { businessId } = req.params;

      const review = await createReview({
        ...req.body,
        authorId,
        businessId: req.params.businessId,
      });

      /* re-average stars and + 1 to review count 
       (business before res to display accurate review count) */
      await incrementBusinessOnReview(businessId);

      res.status(201).send({ review });

      // re-average stars and + 1 to review count
      await incrementUserOnReview(authorId);
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
      const { id } = req.params;
      const { stars } = req.body;
      const authorId = req.user.id;

      const review = await updateReview(id, {
        ...req.body,
        authorId,
      });

      /* update business & user if data has stars
          business before res to display accurate info  */
      stars && (await updateBusinessStars(id));

      res.send({ review });

      stars && (await updateUserStars(authorId));
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
      const { id } = req.params;
      // id to pass to decrementBusinessReview before review is deleted
      const { businessId, authorId } = (await getReviewById(id))[0];

      await deleteReview(id);

      /* re-average stars and - 1 to review count 
          business before res to display accurate info */
      await decrementBusinessOnReview(businessId);

      res.sendStatus(204);

      // re-average stars and - 1 to review count
      await decrementUserOnReview(authorId);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = reviewRouter;
