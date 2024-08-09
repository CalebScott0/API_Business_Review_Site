const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// if file gets too large with functions create a users.utils file and a users folder?

// const userReviewCount = (id) => {
//   return  prisma.review.count({
//     where: {
//       authorId: id,
//     },
//   });
// };
// const userAverageStars =  (id) => {
//   return prisma.review.aggregate({
//     _avg: {
//       stars: true,
//     },
//     where: { authorId: id },
//   });
// };
// const roundHalf = (num) => {
//   return Math.round(num * 2) / 2;
// };
//
// const updateUser = async (id) => {
//   const userReviews = await userReviewCount(id);
//   const userAvgRating = await roundHalf(userAverageStars(id));
//   return prisma.user.update({
//     where: { id },
//     data: {
//       reviewCount: userReviews,
//       averageStars: userAvgRating,
//     },
//   });
// };
const findUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: { username },
    include: {
      Comments: true,
      Reviews: true,
    },
  });
};

module.exports = { createUser, findUserByUsername };
