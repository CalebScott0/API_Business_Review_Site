const prisma = require("./index");

// get business by id including reviews and review comments
const getBusinessById = async (id) => {
  return prisma.business.findUnique({
    where: { id },
    include: {
      Categories: {
        select: {
          categoryName: true,
        },
      },
      Reviews: {
        orderBy: { createdAt: "desc" },
        include: {
          Comments: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  });
};

const getBusinessesByCategory = (categoryName) => {
  return prisma.business.findMany({
    where: {
      Categories: {
        some: {
          categoryName,
        },
      },
    },
    include: {
      Categories: {
        select: {
          categoryName: true,
        },
      },
      Reviews: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });
};
// get businesses by category most popular? (look at what yelp has?)
// (order by stars first then order by most recent?)
module.exports = { getBusinessById, getBusinessesByCategory };
