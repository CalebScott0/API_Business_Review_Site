const prisma = require("./index");
const {
  averageBusinessStars,
  roundHalf,
} = require("../db/update_tables/utils");

// update businesses on review creation
const updateBusinessOnReview = async (id) => {
  const stars = roundHalf((await averageBusinessStars(id))._avg.stars);

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

// create a review for user
const createReview = async (reviewData) => {
  // update business with businessId from review data
  const newReview = await prisma.review.create({
    data: reviewData,
  });
  await updateBusinessOnReview(reviewData.businessId);
  return newReview;
};

// update business average stars if review update stars changed
const updateBusinessStars = async (reviewId) => {
  const { businessId } = await getReviewById(reviewId);

  const stars = roundHalf((await averageBusinessStars(id))._avg.stars);

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
const updateReview = async (id, reviewData) => {
  const updateReview = await prisma.review.update({
    where: { id },
    data: {
      updatedAt: new Date(),
      ...reviewData,
    },
  });
  // update business with id passed to updateReview if data has stars
  if (reviewData.stars) {
    await updateBusinessStars(id);
  }
  return updateReview;
};

// update business on review delete
const decrementBusinessReview = async (id) => {
  const stars = roundHalf((await averageBusinessStars(id))._avg.stars);

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
  const { businessId } = await getReviewById(id);

  const deletedReview = await prisma.review.delete({
    where: { id },
  });
  await decrementBusinessReview(businessId);
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
  decrementBusinessReview,
};
