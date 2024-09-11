const express = require("express");
const businessRouter = express.Router();
const {
  getBusinessById,
  getAllBusinesses,
  getBusinessList,
} = require("../db/businesses");
const { getReviewsForBusiness } = require("../db/reviews");
const { getPhotosForBusiness } = require("../db/photos");
const { getCommentsForReview } = require("../db/comments");

// GET /api/businesses - returns id & name
businessRouter.get("/", async (req, res, next) => {
  try {
    const businesses = await getAllBusinesses();

    res.send({ businesses });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/businesses/:id
businessRouter.get("/:id", async (req, res, next) => {
  try {
    const business = await getBusinessById(req.params.id);
    res.send({ business });
  } catch (error) {
    next({
      name: "UnableToFindBusinessError",
      message: "Unable to find business, id may be invalid",
    });
  }
});

// GET /api/businesses/list/category/:categoryName
businessRouter.get("/list/category/:categoryName", async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const startIndex = +req.query.offset;
    const limit = +req.query.limit;

    const businesses = await getBusinessList({
      categoryName,
      startIndex,
      limit,
    });

    if (!businesses.length) {
      res.status(400).send({ message: "No businesses found" });
      return;
    }

    // res.send({ Pages: pages, currentPage: page, businesses });
    res.send({ businesses });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/businesses/:id/reviews
businessRouter.get("/:id/reviews", async (req, res, next) => {
  try {
    const startIndex = +req.query.offset;
    const limit = +req.query.limit;
    const reviews = await getReviewsForBusiness({
      businessId: req.params.id,
      startIndex,
      limit,
    });

    res.send({ reviews });
  } catch (error) {
    next({
      name: "UnableToFetchReviews",
      message: "Unable to fetch reviews",
    });
  }
});

// GET /api/businesses/reviews/:reviewId/comments
businessRouter.get("/reviews/:reviewId/comments", async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const startIndex = +req.query.offset;
    const limit = +req.query.limit;
    const comments = await getCommentsForReview({
      reviewId,
      startIndex,
      limit,
    });
    res.send({ comments });
  } catch (error) {
    next({
      name: "UnableToFetchComments",
      message: "Unable to fetch comments for review",
    });
  }
});

// GET /api/businesses/:id/photos
businessRouter.get(`/:id/photos`, async (req, res, next) => {
  try {
    const photos = await getPhotosForBusiness(req.params.id);

    res.send({ photos });
  } catch (error) {
    next({
      name: "UnableToFetchPhotos",
      message: "Unable to fetch photos for review",
    });
  }
});

module.exports = businessRouter;
