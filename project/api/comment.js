const express = require("express");
const commentRouter = express.Router();

const {
  createComment,
  updateComment,
  deleteComment,
  updateUserOnComment,
} = require("../db/comments");
const {
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
  checkIsNotUserReview,
  checkCommentData,
  async (req, res, next) => {
    const authorId = req.user.id;
    try {
      const comment = await createComment({
        ...req.body,
        authorId,
        reviewId: req.params.reviewId,
      });

      res.status(201).send({ comment });

      // + 1 to user comment count
      await updateUserOnComment(authorId, "create");
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// PUT /api/comment/:id
commentRouter.put(
  "/:id",
  //  check user is author of comment and text data was provided
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

//  DELETE /api/comment/:id
commentRouter.delete("/:id", checkIsUserComment, async (req, res, next) => {
  try {
    await deleteComment(req.params.id);

    res.sendStatus(204);

    // -1 to user comment count
    await updateUserOnComment(req.user.id, "delete");
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = commentRouter;
