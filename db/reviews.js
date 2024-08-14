const prisma = require("./index");
const {
  averageBusinessStars,
  averageUserStars,
} = require("../db/update_tables/utils");

// create a review for user
const createReview = (reviewData) => {
  return prisma.review.create({
    data: reviewData,
  });
};

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

// update user on review creation
const updateUserOnReview = async (id) => {
  const stars = await averageUserStars(id);

  return prisma.user.update({
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

// update user average stars if review update stars changed
const changeUserStars = async (reviewId) => {
  const { authorId } = await getReviewById(reviewId);

  const stars = await averageUserStars(authorId);

  return prisma.user.update({
    where: {
      id: authorId,
    },
    data: {
      stars,
    },
  });
};

// update businesses on review delete
const decrementBusinessReview = async (reviewId) => {
  const { businessId } = await getReviewById(reviewId);

  const stars = await averageBusinessStars(businessId);

  return prisma.business.update({
    where: {
      id: businessId,
    },
    data: {
      reviewCount: {
        decrement: 1,
      },
      stars,
    },
  });
};

// update user on review delete
const decrementUserReview = async (reviewId) => {
  const { authorId } = await getReviewById(reviewId);

  const stars = await averageUserStars(authorId);

  return prisma.user.update({
    where: {
      id: authorId,
    },
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
  const deletedReview = await prisma.review.delete({
    where: { id },
  });
  await decrementBusinessReview(id);
  await decrementUserReview(id);
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
};
