const prisma = require("./index");
const {
  averageBusinessStars,
  averageUserStars,
  roundHalf,
} = require("../db/update_tables/utils");

// create a review for user
const createReview = (reviewData) => {
  return prisma.review.create({
    data: reviewData,
  });
};

// update businesses on review creation
const updateBusinessOnReview = async (id) => {
  const busStars = roundHalf(await averageBusinessStars(id));

  return prisma.business.update({
    where: {
      id,
    },
    data: {
      reviewCount: {
        increment: 1,
      },
      stars: busStars,
    },
  });
};

// update user on review creation
const updateUserOnReview = async (id) => {
  const userStars = roundHalf(await averageUserStars(id));

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      reviewCount: {
        increment: 1,
      },
      stars: userStars,
    },
  });
};

// update a user review
const updateReview = (id, reviewData) => {
  return prisma.review.update({
    where: { id },
    data: {
      updatedAt: new Date(),
      ...reviewData,
    },
  });
};

// update business average stars if review update stars changed
const changeBusinessStars = async (reviewId) => {
  const { businessId } = await getReviewById(reviewId);

  const busStars = roundHalf(await averageBusinessStars(businessId));

  return prisma.business.update({
    where: {
      id: businessId,
    },
    data: {
      stars: busStars,
    },
  });
};

// update user average stars if review update stars changed
const changeUserStars = async (reviewId) => {
  const { authorId } = await getReviewById(reviewId);

  const userStars = roundHalf(await averageUserStars(authorId));

  return prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      stars: userStars,
    },
  });
};

// delete a user review
const deleteReview = (id) => {
  return prisma.review.delete({
    where: { id },
  });
};

// update businesses on review delete
const decrementBusinessReview = async (reviewId) => {
  const { businessId } = await getReviewById(reviewId);

  const busStars = roundHalf(await averageBusinessStars(businessId));

  return prisma.business.update({
    where: {
      id: businessId,
    },
    data: {
      reviewCount: {
        decrement: 1,
      },
      stars: busStars,
    },
  });
};

// update user on review delete
const decrementUserReview = async (reviewId) => {
  const { authorId } = await getReviewById(reviewId);

  const userStars = roundHalf(await averageUserStars(authorId));

  return prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      reviewCount: {
        decrement: 1,
      },
      stars: userStars,
    },
  });
};

// find a review given an authorId & businessId
const getUserRevByBusiness = ({ authorId, businessId }) => {
  return prisma.review.findUnique({
    where: {
      uniqueReview: {
        authorId,
        businessId,
      },
      author: {
        id: authorId,
      },
      business: {
        id: businessId,
      },
    },
  });
};

const getReviewById = (id) => {
  return prisma.review.findUnique({
    where: { id },
  });
};
module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getUserRevByBusiness,
  getReviewById,
  updateBusinessOnReview,
  updateUserOnReview,
  changeUserStars,
  changeBusinessStars,
  decrementBusinessReview,
  decrementUserReview,
};
