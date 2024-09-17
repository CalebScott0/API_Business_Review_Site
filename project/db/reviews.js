const prisma = require("./index");
const {
  averageBusinessStars,
  averageUserStars,
  // countUserReviews,
} = require("../db/update_tables/utils");

// update businesses on review creation
const incrementBusinessOnReview = async (id) => {
  const stars = await averageBusinessStars(id);

  return prisma.business.update({
    where: {
      id,
    },
    data: {
      reviewCount: {
        increment: 1,
      },
      stars,
    },
  });
};

const incrementUserOnReview = async (authorId) => {
  // average user star ratings on reviews rounded to nearest 0.5
  const stars = await averageUserStars(authorId);

  // update user with review count and stars
  return prisma.$queryRaw`UPDATE "User" SET "reviewCount" = "reviewCount" + 1, stars=${stars} 
                          WHERE id = ${authorId} RETURNING *`;
};

const createReview = (data) => {
  // create a review for user
  // const newReview = await prisma.review.create({ data });
  // update business / user with ids from review data
  // await incrementUserOnReview(data.authorId);
  // await incrementBusinessOnReview(data.businessId);

  return prisma.review.create({ data });
};

const updateBusinessStars = async (reviewId) => {
  const { businessId } = await getReviewById(reviewId);
  // update business average stars if review update stars changed

  const stars = await averageBusinessStars(businessId);

  return prisma.business.update({
    where: {
      id: businessId,
    },
    data: {
      stars,
    },
  });
};

const updateUserStars = async (authorId) => {
  // average user star ratings on reviews rounded to nearest 0.5
  const stars = await averageUserStars(authorId);

  // update user with review count and stars
  return prisma.$queryRaw`UPDATE "User" SET stars=${stars} 
                          WHERE id = ${authorId} RETURNING *`;
};

// update a user review
const updateReview = (id, data) => {
  // const updateReview = await prisma.review.update({
  //   where: { id },
  //   data: {
  //     updatedAt: new Date(),
  //     ...data,
  //   },
  // });
  // update business with id passed to updateReview if data has stars
  // if (data.stars) {
  // await updateBusinessStars(id);
  // await updateUserStars(data.authorId);
  // }
  return prisma.review.update({
    where: { id },
    data: {
      updatedAt: new Date(),
      ...data,
    },
  });
};

// update business on review delete
const decrementBusinessOnReview = async (id) => {
  const stars = await averageBusinessStars(id);

  return prisma.business.update({
    where: { id },
    data: {
      reviewCount: {
        decrement: 1,
      },
      stars,
    },
  });
};

// update user on review delete
const decrementUserOnReview = async (authorId) => {
  const stars = await averageUserStars(authorId);

  return prisma.$queryRaw`UPDATE "User" SET "reviewCount" = "reviewCount" - 1, stars=${stars} 
                          WHERE id = ${authorId} RETURNING *`;
};

// delete a user review
const deleteReview = (id) => {
  // id to pass to decrementBusinessReview before review is deleted
  // const { businessId, authorId } = await getReviewById(id);
  // const deletedReview = await prisma.$queryRaw`DELETE FROM "Review"
  //                         WHERE id = ${id};`;

  // await decrementBusinessOnReview(businessId);
  // await decrementUserOnReview(authorId);
  return prisma.$queryRaw`DELETE FROM "Review"
                          WHERE id = ${id};`;
};

// find a review given an authorId & businessId
const getUserRevByBusiness = ({ authorId, businessId }) => {
  return prisma.review.findUnique({
    where: {
      uniqueReview: {
        authorId,
        businessId,
      },
    },
  });
};

const getReviewById = (id) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

const getReviewsForBusiness = ({ businessId, startIndex = 0, limit = 5 }) => {
  return prisma.$queryRaw`SELECT r.*, u.username AS author FROM "Review" r
                          JOIN "User" u ON r."authorId" = u.id  
                          WHERE r."businessId" = ${businessId} 
                          ORDER BY r."createdAt" DESC 
                          LIMIT ${limit} OFFSET ${startIndex};`;
};

const getReviewsForUser = (userId) => {
  return prisma.$queryRaw`SELECT r.*, b.name as "businessName" FROM "Review" r
                          LEFT JOIN "Business" b on  r."businessId" = b.id
                          WHERE "authorId" = ${userId}
                          ORDER BY r."createdAt" DESC;`;
};

const getMostRecentReviews = () => {
  return prisma.review.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
      business: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  getMostRecentReviews,
  getReviewsForBusiness,
  getUserRevByBusiness,
  incrementBusinessOnReview,
  incrementUserOnReview,
  getReviewsForUser,
  updateBusinessStars,
  updateUserStars,
  decrementBusinessOnReview,
  decrementUserOnReview,
};
