const prisma = require("./index");
const { averageBusinessStars } = require("../db/update_tables/utils");

// update businesses on review creation
const updateBusinessOnReview = async (id) => {
  const stars = await averageBusinessStars(id);
  // return prisma.$queryRaw`UPDATE "Business" SET stars = ${stars}, "reviewCount"="reviewCount" + 1 WHERE id=${id}`;
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
const createReview = async (data) => {
  const newReview = await prisma.review.create({ data });

  // update business with businessId from review data
  await updateBusinessOnReview(data.businessId);

  return newReview;
};

// update business average stars if review update stars changed
const updateBusinessStars = async (reviewId) => {
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
// update a user review
const updateReview = async (id, data) => {
  const updateReview = await prisma.review.update({
    where: { id },
    data: {
      updatedAt: new Date(),
      ...data,
    },
  });
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
