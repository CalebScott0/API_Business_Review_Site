const prisma = require("./index");

// get all categories
// - ordered by name a-z
const getCategories = () => {
  return prisma.$queryRaw`SELECT DISTINCT "categoryId", "categoryName" 
                          FROM "CategoryToBusiness"
                          ORDER BY "categoryName" ASC`;
};
module.exports = getCategories;
