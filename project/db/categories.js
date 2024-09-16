const prisma = require("./index");

// get all categories
// - ordered by count of businesses desc
const getCategories = () => {
  return prisma.categoryToBusiness.findMany({
    distinct: ["categoryName"],
    orderBy: {
      category: {
        businessCount: "desc",
      },
    },
  });
};
module.exports = getCategories;
