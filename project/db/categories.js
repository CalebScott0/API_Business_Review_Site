const prisma = require("./index");

// get all categories, returning id and name - ordered by name asc
const getCategories = () => {
  // await updateCategories();
  return prisma.category.findMany({
    select: { name: true },
    // first record returning in asc name order is "& Probates" - remove for ui cleanliness
    skip: 1,
    orderBy: { name: "asc" },
  });
};

const getCategoriesToDisplay = () => {};

module.exports = getCategories;
