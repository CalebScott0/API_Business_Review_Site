const prisma = require("./index");
// create a review for user
const createReview = (reviewData) => {
  return prisma.review.create({
    data: reviewData,
  });
};
// update a user review
const updateReview = ({ id, reviewData }) => {
  return prisma.review.update({
    where: { id },
    data: reviewData,
  });
};
// delete a user review
const deleteReview = (id) => {
  return prisma.review.delete({
    where: { id },
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
    },
  });
};
// find unique where authorId: user id AND businessId: business id?
// UPDATE/DELETE REVIEW ON USER.UPDATE?
module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getUserRevByBusiness,
};
