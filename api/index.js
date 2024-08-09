const express = require("express");
const jwt = require("jsonwebtoken");
const { findUserById } = require("../db/users");
const { requireUser } = require("./utils");

const apiRouter = express.Router();

// set req.user if available from log in
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  // if request does not need auth header, move on
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(
        token,
        process.env.JWT || "Super secret super safe"
      );
      //   if id is successfully made, set req.user
      if (id) {
        req.user = findUserById(id);
        next();
      } else {
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization Token Malformed",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// auth routes
apiRouter.use("/auth", require("./auth/auth"));

// route to get logged in user
apiRouter.use("/user", require("./user"));

// review & comment routes will all need requireUser middleware!

// error handling route
apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = router;
