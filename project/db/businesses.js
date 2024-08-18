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
// Select all business names - no duplicates
// order by stars descending and then review count descending
const getAllBusinesses = async () => {
  return prisma.business.findMany({
    distinct: ["name"],
    select: {
      name: true,
    },
    orderBy: [
      {
        stars: "desc",
      },
      {
        reviewCount: "desc",
      },
    ],
  });
};

const getBusinessByName = async (name) => {
  return prisma.business.findMany({
    where: {
      name,
    },
  });
};

// get business by category, returning categories, most recent review -
//  ordered by stars descending and then review count descending
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
    orderBy: [
      {
        stars: "desc",
      },
      {
        reviewCount: "desc",
      },
    ],
  });
};
// get businesses by category most popular? (look at what yelp has?)
// (order by stars first then order by most recent?)
module.exports = {
  getBusinessById,
  getBusinessByName,
  getBusinessesByCategory,
  getAllBusinesses,
};
