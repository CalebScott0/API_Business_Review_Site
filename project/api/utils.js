const { getUserRevByBusiness, getReviewById } = require("../db/reviews");
const { getCommentById } = require("../db/comments");

// function to ensure user is logged in before accessing certain functionality
const requireUser = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .send({ message: "You must be logged in to do that" });
  }
  next();
};

const checkCreateReviewData = async (req, res, next) => {
  const { text, stars } = req.body;
  if (!text || !stars || stars > 5) {
    return res.status(400).send({
      message: "Please provide text and a stars rating (1-5) for review",
    });
  }

  next();
};

// checks update review function has text and/or star rating
const checkUpdateReviewData = async (req, res, next) => {
  const { text, stars } = req.body;
  // error to avoid accidentally removing text during update
  // checks if text key was provided in req.body obj then if length = 0
  if (stars && text?.length === 0) {
    return res.status(400).send({
      message: "Text value cannot be empty",
    });
  }
  if ((!text && !stars) || stars > 5) {
    return res.status(400).send({
      message: "Please update the text or stars rating (1-5) for review",
    });
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
      name: "UserReviewError",
      message: "User already has review for this business",
    });
  }

  next();
};

// check if user is author of review before update or delete
const checkIsUserReview = async (req, res, next) => {
  const review = await getReviewById(req.params.id);

  if (req.user.id !== review.authorId) {
    return res
      .status(400)
      .send({ message: "User is not the author of this review" });
  }
  next();
};

// check if user is trying to comment on their own review
const checkIsNotUserReview = async (req, res, next) => {
  const review = await getReviewById(req.params.reviewId);
  if (req.user.id === review.authorId) {
    return res
      .status(400)
      .send({ message: "User can not submit comment on their own review" });
  }
  next();
};

const checkCommentData = async (req, res, next) => {
  const { text } = req.body;
  if (!text || !text.length) {
    return res.status(400).send({ message: "Please provide text for comment" });
  }
  next();
};
// check user is author of comment before update or delete
const checkIsUserComment = async (req, res, next) => {
  const comment = await getCommentById(req.params.id);
  if (req.user.id !== comment.authorId) {
    return res
      .status(400)
      .send({ message: "User is not the author of this comment" });
  }
  next();
};
module.exports = {
  requireUser,
  checkCreateReviewData,
  checkUpdateReviewData,
  checkUserHasReview,
  checkIsUserReview,
  checkIsNotUserReview,
  checkCommentData,
  checkIsUserComment,
};
