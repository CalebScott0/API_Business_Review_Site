const prisma = require("./index");

// get all categories from businesses with photos and containing >= 100 businesses
// - ordered by count of businesses desc
const getCategories = () => {
  return prisma.categoryToBusiness.findMany({
    distinct: ["categoryName"],
    where: {
      business: {
        Photos: {
          some: {},
        },
      },
      category: {
        businessCount: {
          gte: 100,
        },
      },
    },
    orderBy: {
      category: {
        businessCount: "desc",
      },
    },
  });
};

module.exports = getCategories;
