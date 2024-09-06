const prisma = require("./index");

// get business by id including reviews and review comments
const getBusinessById = async (id) => {
  // grab base business object
  let business =
    await prisma.$queryRaw`SELECT * FROM "Business" WHERE id = ${id} `;
  business = { ...business["0"] };

  // grab all categories related to businessId
  const categories =
    await prisma.$queryRaw`SELECT "categoryName" FROM "CategoryToBusiness" WHERE "businessId"=${id};`;

  // grab all reviews related to businessId
  const reviews =
    await prisma.$queryRaw`SELECT * from "Review" WHERE "businessId"=${id} ORDER BY "createdAt" DESC;`;

  // find comments associated with the business's reviews
  // const comments =
  // await prisma.$queryRaw`SELECT * FROM "Comment" WHERE "reviewId" in (SELECT id FROM "Review" WHERE "businessId"=${id})`;

  // grab all photos for the business
  const photos =
    await prisma.$queryRaw`SELECT * FROM "Photo" WHERE "businessId"=${id};`;

  // add categories reviews, and photos array to business object
  business = { ...business, categories, reviews, photos };
  return business;

  // return prisma.$queryRaw`SELECT "categoryName" FROM "Business" t1 FULL JOIN "CategoryToBusiness" t2 ON t1.id = t2."businessId" WHERE t1.id=${id} ;`;
  // return prisma.business.findUnique({
  //   where: { id },
  //   include: {
  //     Categories: {
  //       select: {
  //         categoryName: true,
  //       },
  //     },
  //     Reviews: {
  //       orderBy: { createdAt: "desc" },
  //       include: {
  //         author: {
  //           select: { username: true },
  //         },
  //         Comments: {
  //           include: {
  //             author: {
  //               select: { username: true },
  //             },
  //           },
  //           orderBy: { createdAt: "desc" },
  //         },
  //       },
  //     },
  //     Photos: true,
  //   },
  // });
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
const getBusinessList = ({ categoryName, startIndex, limit }) => {
  return prisma.business.findMany({
    where: {
      Categories: {
        some: { categoryName },
      },
      Photos: {
        some: {},
      },
    },
    include: {
      Categories: {
        select: {
          categoryName: true,
        },
      },
      // take first review to display on business list
      Reviews: {
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      Photos: {
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
    skip: startIndex,
    take: limit,
  });
};

module.exports = {
  getBusinessById,
  getAllBusinesses,
  getBusinessList,
};
