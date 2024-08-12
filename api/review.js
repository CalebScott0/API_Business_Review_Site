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
      const postReview = await createReview({
        ...req.body,
        authorId: req.user.id,
        businessId: req.params.businessId,
      });

      res.status(201).send({ postReview });
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
      const putReview = await updateReview(req.params.id, {
        ...req.body,
      });

      res.send({ putReview });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// DELETE /api/review/:id
reviewRouter.delete("/:id", checkIsUserReview, async (req, res, next) => {
  try {
    await deleteReview(req.params.id);

    res.sendStatus(204);
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = reviewRouter;
