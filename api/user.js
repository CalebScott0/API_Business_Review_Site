const express = require("express");
const userRouter = express.Router();
const { requireUser } = require("./utils");

// GET /api/user
userRouter.get("/", requireUser, async (req, res, next) => {
  try {
    // delete user password? won't be needed on frontend?
    delete req.user.password;

    // req.user is set in api/index.js, do not need to requery here
    res.send({ user: req.user });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = userRouter;
