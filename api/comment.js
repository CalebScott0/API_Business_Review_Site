/*  CREATE MIDDLEWARE IN UTILS FOLDER TO CHECK
    IF USER IS TRYING TO COMMENT ON THEIR OWN REVIEW!! */
const express = require("express");
const commentRouter = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../db/comments");
const { checkUserIsNotAuthor } = require("./utils");

// user will be set to req.user as token will be required for comment functions

// POST /api/comment/:reviewId
commentRouter.post(
  "/:reviewid",
  // check user is not author of review
  checkUserIsNotAuthor,
  async (req, res, next) => {
    try {
      const newComment = await createComment({
        ...req.body,
        authorId: req.user.id,
        reviewId: req.params.reviewid,
      });

      res.status(201).send({ newComment });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = commentRouter;
