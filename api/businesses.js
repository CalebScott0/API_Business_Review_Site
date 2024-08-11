const express = require("express");
const businessRouter = express.Router();

const {
  getBusinessById,
  getBusinessesByCategory,
} = require("../db/businesses");

// get businesses by param category
businessRouter.get("/category/:category", async (req, res, next) => {
  try {
    const businesses = await getBusinessesByCategory(req.params.category);

    !businesses.length && res.status(400).send({ message: "Invalid category" });

    res.send({ businesses });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// get business by id
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
