const prisma = require("./index");

// get all categories
// - ordered by count of businesses desc
const getCategories = () => {
  return prisma.$queryRaw`SELECT DISTINCT "categoryName" FROM "CategoryToBusiness"`;
};
module.exports = getCategories;
