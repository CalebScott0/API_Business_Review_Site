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

// GET /api/businesses
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
    const page = +req.query.page;
    const limit = +req.query.limit;

    // total pages available
    // const pages = Math.ceil(
    //   (await getBusinessesInCategory(categoryName)).length / limit
    // );

    // if page 1 -> startIndex = 0, if page 2, startIndex is 1 index after last result on page 1...
    // const startIndex = (page - 1) * limit;
    const startIndex = 0;

    const businesses = await getBusinessList({
      categoryName,
      startIndex,
      limit,
    });

    if (!businesses.length) {
      res.status(400).send({ message: "Invalid category" });
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
    const reviews = await getReviewsForBusiness(req.params.id);

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
    const comments = await getCommentsForReview(req.params.reviewId);
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
