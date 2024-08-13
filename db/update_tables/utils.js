const prisma = require("../index");
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

// aggregate user's review count to update table column
const countUserReviews = (id) => {
  return prisma.review.count({
    where: {
      authorId: id,
    },
  });
};

// aggregate user's comment count to update table column
const countUserComments = (id) => {
  return prisma.comment.count({
    where: {
      authorId: id,
    },
  });
};

// aggregate user's average stars to update table column
const averageUserStars = (id) => {
  // return will look like: { _avg: { stars: 5 } }
  return prisma.review.aggregate({
    _avg: {
      stars: true,
    },
    where: { authorId: id },
  });
};

// convert into float rounding to the nearest 0.5
const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

module.exports = {
  countBusinessReviews,
  averageBusinessStars,
  countUserReviews,
  countUserComments,
  averageUserStars,
  roundHalf,
};
