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

const getBusinessesByCategory = async (category) => {
  return prisma.business.findMany({
    where: {
      Categories: {
        some: {
          categoryName: category,
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
// get businesses by category just include the most recent review or most popular? (look at what yelp has?)
// (group by stars order by most recent?)
module.exports = { getBusinessById, getBusinessesByCategory };
