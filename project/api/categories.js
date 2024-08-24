const express = require("express");
const categoryRouter = express.Router();

const getCategories = require("../db/categories");

// /api/categories
categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();

    res.send({ categories });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = categoryRouter;
