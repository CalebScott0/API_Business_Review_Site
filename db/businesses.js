const prisma = require("./index");
const { roundHalf } = require("./users");

// total count of reviews for a business given an id
const countBusinessReviews = (id) => {
  return prisma.review.count({
    where: { businessId: id },
  });
};

// average all stars from reviews for a business given an id
const averageBusinessStars = (id) => {
  // return will look like: { _avg: { stars: 5 } }
  return prisma.review.aggregate({
    _avg: {
      stars: true,
    },
    where: { businessId: id },
  });
};
// update business with aggregates number of reviews and average stars of reviews
const updateBusiness = async (id) => {
  const numBusinessReviews = await countBusinessReviews(id);
  // round half from ./ users to return average rounded to the nearest 0/5
  const roundBusUserStars = roundHalf(
    (await averageBusinessStars(id))._avg.stars
  );
  return prisma.business.update({
    where: { id },
    data: {
      stars: roundBusUserStars,
      reviewCount: numBusinessReviews,
    },
  });
};
// get business by id including reviews and review comments
const getBusinessById = async (id) => {
  await updateBusiness(id);
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
  const businessesInCat = await prisma.categoryToBusiness.findMany({
    where: {
      categoryName: category,
    },
  });
  // map a new array with the businessId key from array of objects returned in prisma query
  const busIdArr = businessesInCat.map((i) => i["businessId"]);
  // update all businesses in selected category
  busIdArr.forEach(async (id) => await updateBusiness(id));
  // find all businesses IN array of businesses ids with requested category
  return prisma.business.findMany({
    where: { id: { in: [...busIdArr] } },
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

  // return prisma.business.findMany
};
// get businesses by category just include the most recent review or most popular? (look at what yelp has?)
// (group by stars order by most recent?)
module.exports = { getBusinessById, getBusinessesByCategory };
