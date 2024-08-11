const express = require("express");
const businessRouter = express.Router();

const {
  getBusinessById,
  getBusinessesByCategory,
} = require("../db/businesses");
const { business } = require("../db");

// get businesses by param category
businessRouter.get("/:category", async (req, res, next) => {
  try {
    const businesses = await getBusinessesByCategory(req.params.category);

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
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = businessRouter;
