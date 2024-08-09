const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../../db/users");
const { checkUserData, checkUserExists } = require("./utils");

const authRouter = express.Router();

// path /api/auth

authRouter.post(
  "/register",
  checkUserData,
  checkUserExists,
  async (req, res) => {
    try {
      const { password } = req.body();
      //   checkUserData / checkUserExists
      // hash pass
      const hashPass = await bcrypt.hash(password, +process.env.SALT || 7);
      //   create user
      const user = await createUser({ ...req.body, password: hashPass });

      //  create token with user id
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT || "Super secret super safe"
      );
      res.status(201).send({ token });
    } catch (error) {
      console.log(error);
      // send response (status, body:  {error˝}
      res.status(500).send({ error, message: "Failed to register user" });
    }
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // find user by username
    const user = await findUserByUsername(username);

    // run bcypt if login was NOT via OAuth
    const isSamePass = await bcrypt.compare(password, user.password);

    // check there is a user and passwords match
    if (!user || !isSamePass) {
      return res.status(401).send("Invalid login credentials");
    }

    // if user exists and passwords match, create token with user id
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT || "Super secret super safe"
    );

    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500), send({ error, message: "Failed to login" });
  }
});

module.exports = authRouter;
