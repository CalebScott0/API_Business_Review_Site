const express = require("express");
const userRouter = express.Router();
const { getUserById } = require("../db/users");
const { getReviewsForUser } = require("../db/reviews");
const { getCommentsForUser } = require("../db/comments");
// GET /api/user
userRouter.get("/", async (req, res, next) => {
  try {
    // delete user password? won't be needed on frontend?
    delete req.user.password;
    // req.user is set in api/index.js, do not need to requery here
    res.send({ user: req.user });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/user/reviews
userRouter.get("/reviews", async (req, res, next) => {
  try {
    const reviews = await getReviewsForUser(req.user.id);

    res.send({ reviews });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/user/comments
userRouter.get("/comments", async (req, res, next) => {
  try {
    const comments = await getCommentsForUser(req.user.id);

    res.send({ comments });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/user/:id
userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    res.send({ user });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
