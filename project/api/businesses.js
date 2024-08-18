const express = require("express");
const businessRouter = express.Router();

const {
  getBusinessById,
  getBusinessesByCategory,
} = require("../db/businesses");

// GET /api/businesses/category/:category
businessRouter.get("/category/:categoryName", async (req, res, next) => {
  try {
    const businesses = await getBusinessesByCategory(req.params.categoryName);
    if (!businesses.length) {
      res.status(400).send({ message: "Invalid category" });
      return;
    }

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

module.exports = businessRouter;
