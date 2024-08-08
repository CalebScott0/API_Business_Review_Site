const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// IF YOU WANT TO INCUDE USER COMMENT COUNT, UPDATE SCHEMA FIRST

// const userCommentCount = (id) => {
//   return prisma.user.findUnique({
//     where: { id },
//     select: {
//       _count: {
//         select: { Comments: true },
//       },
//     },
//   });
// };

// ADD THE BELOW TO NEW USER.UTILS.JS FILE and create users folder???
const userReviewCount = (id) => {
  return prisma.review.count({
    where: {
      authorId: id,
    },
  });
};
const userAverageStars = (id) => {
  return prisma.review.aggregate({
    _avg: {
      stars: true,
    },
    where: { authorId: id },
  });
};
const roundHalf = (num) => {
  return Math.round(num) / 2;
};
console.log(roundHalf(7.4));
const updateUser = (id) => {
  const userReviews = userReviewCount(id);
  const userAvgRating = userAverageStars(id);
  return prisma.user.update({
    where: { id },
    data: {
      reviewCount: userReviews,
      averageStars,
    },
  });
};
const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      Comments: true,
      Reviews: true,
    },
  });
};

module.exports = { createUser, userReviewCount, userAverageStars };
