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
          author: {
            select: { username: true },
          },
          Comments: {
            include: {
              author: {
                select: { username: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      },
      Photos: true,
    },
  });
};
// Select all businesses with pictures ids & names - no duplicates
// order by stars descending and then review count descending
const getAllBusinesses = () => {
  return prisma.business.findMany({
    distinct: ["name"],
    where: {
      Photos: {
        some: {},
      },
    },
    select: {
      id: true,
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

// GET ALL BUSINESSES BY A NAME? filter by location first?

// get business with photos by category, returning categories, most recent review -
//  ordered by stars descending and then review count descending
const getBusinessesByCategory = (categoryName) => {
  return prisma.business.findMany({
    where: {
      Categories: {
        some: {
          categoryName,
        },
      },
      Photos: {
        some: {},
      },
    },
    include: {
      Photos: {
        take: 1,
      },
      Categories: {
        select: {
          categoryName: true,
        },
        // order categories to display the first several to user
        orderBy: {
          category: {
            businessCount: "desc",
          },
        },
      },
      // take first review to display on business list
      Reviews: {
        include: {
          author: {
            select: { username: true },
          },
        },
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
module.exports = {
  getBusinessById,
  getBusinessesByCategory,
  getAllBusinesses,
};
