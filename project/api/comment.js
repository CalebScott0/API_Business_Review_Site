const express = require("express");
const commentRouter = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForReview,
} = require("../db/comments");
const {
  requireUser,
  checkIsNotUserReview,
  checkCommentData,
  checkIsUserComment,
} = require("./utils");

// user will be set to req.user as token will be required for comment functions

// POST /api/comment/:reviewId
commentRouter.post(
  "/:reviewId",
  // check user is not author of review
  // then check user provided text for comment
  requireUser,
  checkIsNotUserReview,
  checkCommentData,
  async (req, res, next) => {
    try {
      const comment = await createComment({
        ...req.body,
        authorId: req.user.id,
        reviewId: req.params.reviewId,
      });

      res.status(201).send({ comment });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// PUT /api/comment/:id
commentRouter.put(
  "/:id",
  //  check user is author of comment and text data was provided
  requireUser,
  checkIsUserComment,
  checkCommentData,
  async (req, res, next) => {
    try {
      const comment = await updateComment(req.params.id, req.body.text);

      res.send({ comment });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// GET /api/comment/review/:reviewid
commentRouter.get("/review/:reviewId", async (req, res, next) => {
  try {
    const comments = await getCommentsForReview(req.params.reviewId);
    res.send({ comments });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//  DELETE /api/comment/:id
commentRouter.delete(
  "/:id",
  requireUser,
  checkIsUserComment,
  async (req, res, next) => {
    try {
      await deleteComment(req.params.id);

      res.sendStatus(204);
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = commentRouter;
