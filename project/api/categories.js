const express = require("express");
const categoryRouter = express.Router();

const { getCategories, getCategoriesToDisplay } = require("../db/categories");

// /api/categories
categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await getCategories();

    res.send({ categories });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// /api/categories/display
categoryRouter.get("/display", async (req, res, next) => {
  try {
    const categories = await getCategoriesToDisplay();

    res.send({ categories });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = categoryRouter;
