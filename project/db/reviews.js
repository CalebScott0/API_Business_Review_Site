const prisma = require("./index");
const {
  averageBusinessStars,
  averageUserStars,
  countUserReviews,
} = require("../db/update_tables/utils");

// update businesses on review creation
const updateBusinessOnReview = async (id) => {
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
const updateUserOnReview = async (authorId) => {
  // count total num user reviews - parseInt convert from BigInt
  const reviewCount = parseInt((await countUserReviews(authorId))[0].count);

  // // count total num user comment
  // const commentCount = await countUserComments(authorId);

  // // average user star ratings on reviews rounded to nearest 0.5
  const stars = await averageUserStars(authorId);

  // update user with review count and stars
  return prisma.$queryRaw`UPDATE "User" SET "reviewCount"=${reviewCount}, stars=${stars} 
                          WHERE id = ${authorId} RETURNING *`;
};

const createReview = async (data) => {
  // create a review for user
  const newReview = await prisma.review.create({ data });

  await updateUserOnReview(data.authorId);
  // update business with businessId from review data
  await updateBusinessOnReview(data.businessId);

  return newReview;
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
// update a user review
const updateReview = async (id, data) => {
  const updateReview = await prisma.review.update({
    where: { id },
    data: {
      updatedAt: new Date(),
      ...data,
    },
  });
  await updateUserOnReview(data.authorId);
  // update business with id passed to updateReview if data has stars
  if (data.stars) {
    await updateBusinessStars(id);
  }
  return updateReview;
};

// update business on review delete
const decrementBusinessReview = async (id) => {
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

// delete a user review
const deleteReview = async (id) => {
  // id to pass to decrementBusinessReview before review is deleted
  const { businessId, authorId } = await getReviewById(id);
  const deletedReview = await prisma.$queryRaw`DELETE FROM "Review"
                          WHERE id = ${id};`;
  // const deletedReview = await prisma.review.delete({
  //   where: { id },
  // });
  await decrementBusinessReview(businessId);
  await updateUserOnReview(authorId);
  return deletedReview;
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

const getReviewsForBusiness = (businessId, limit = 5) => {
  return prisma.$queryRaw`SELECT r.*, u.username AS author FROM "Review" r
                          JOIN "User" u ON r."authorId" = u.id  
                          WHERE r."businessId" = ${businessId} 
                          ORDER BY r."createdAt" DESC 
                          LIMIT ${limit};`;
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
  updateBusinessOnReview,
  getReviewsForUser,
};
