const express = require("express");
const businessRouter = express.Router();

const {
  getBusinessById,
  getAllBusinesses,
  getBusinessList,
  getBusinessesInCategory,
} = require("../db/businesses");

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

// GET /api/businesses/category/:category
businessRouter.get("/category/:categoryName", async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const page = +req.query.page;
    const limit = +req.query.limit;

    // total pages available
    const pages = Math.ceil(
      (await getBusinessesInCategory(categoryName)).length / limit
    );

    // if page 1 -> startIndex = 0, if page 2, startIndex is 1 index after last result on page 1...
    const startIndex = (page - 1) * limit;

    const businesses = await getBusinessList({
      categoryName,
      startIndex,
      limit,
    });

    if (!businesses.length) {
      res.status(400).send({ message: "Invalid category" });
      return;
    }

    res.send({ Pages: pages, currentPage: page, businesses });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = businessRouter;
