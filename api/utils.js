const { getUserRevByBusiness } = require("../db/reviews");

// function to ensure user is logged in before accessing certain functionality
const requireUser = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.staus(401).send({ message: "You must be logged in to do that" });
  }
  next();
};

// checks create review function has both text and star rating
const checkCreateReviewData = (req, res, next) => {
  const { text, stars } = req.body;
  if (!text || !stars) {
    return res
      .status(400)
      .send({ message: "Please provide text and a star rating for review" });
  }

  next();
};

// checks update review function has text and/or star rating
const checkUpdateReviewData = (req, res, next) => {
  const { text, stars } = req.body;
  if (!text && !stars) {
    return res
      .status(400)
      .send({ message: "Please update the text or star rating for review" });
  }

  next();
};

// check if user has review for business already
// req.user will be set with token, businessId from endpoint param
const checkUserHasReview = async (req, res, next) => {
  const hasReview = await getUserRevByBusiness({
    authorId: req.user.id,
    businessId: req.params.businessId,
  });

  if (hasReview) {
    return res.status(409).send({
      name: "UserReviewForBusinessExistsError",
      message:
        "A review already exists with this unique combination of authorId and businessId",
    });
  }

  next();
};
module.exports = {
  requireUser,
  checkCreateReviewData,
  checkUpdateReviewData,
  checkUserHasReview,
};
