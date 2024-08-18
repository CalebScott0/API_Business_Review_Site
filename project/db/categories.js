const prisma = require("./index");

// get all categories - ordered by count of businesses desc
const getCategories = () => {
  return prisma.category.findMany({
    where: {
      businessCount: { gte: 100 },
    },
    orderBy: { businessCount: "desc" },
  });
};

module.exports = getCategories;
