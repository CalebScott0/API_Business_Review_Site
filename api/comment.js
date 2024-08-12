/*  CREATE MIDDLEWARE IN UTILS FOLDER TO CHECK
    IF USER IS TRYING TO COMMENT ON THEIR OWN REVIEW!! */
const express = require("express");
const commentRouter = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../db/comments");
const { checkUserIsNotAuthor, checkCommentData } = require("./utils");

// user will be set to req.user as token will be required for comment functions

// POST /api/comment/:reviewId
commentRouter.post(
  "/review/:reviewId",
  // check user is not author of review
  // then check user provided text for comment
  checkUserIsNotAuthor,
  checkCommentData,
  async (req, res, next) => {
    try {
      const newComment = await createComment({
        ...req.body,
        authorId: req.user.id,
        reviewId: req.params.reviewId,
      });

      res.status(201).send({ newComment });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// PUT /api/comment/:id
commentRouter.put("/:id", checkCommentData, async (req, res, next) => {
  try {
    const putComment = await updateComment(req.params.id, req.body.text);

    res.send({ putComment });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
module.exports = commentRouter;
