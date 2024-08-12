const { getUserRevByBusiness } = require("../db/reviews");

// function to ensure user is logged in before accessing certain functionality
const requireUser = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.staus(401).send({ message: "You must be logged in to do that" });
  }
  next();
};

const checkUserHasReview = (req, res, next) => {};
module.exports = { requireUser };
