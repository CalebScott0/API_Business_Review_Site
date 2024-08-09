const express = require("express");
const userRouter = express.Router();
const { requireUser } = require("./utils");

userRouter.get("/", requireUser, async (req, res, next) => {
  try {
    // delete user password? won't be needed on frontend?
    delete req.user.password;
  } catch (error) {
    console.log(error);
  }
});
