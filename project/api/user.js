const express = require("express");
const userRouter = express.Router();
const { requireUser } = require("./utils");
const { getUserById } = require("../db/users");

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
