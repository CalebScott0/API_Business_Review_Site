const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// // ADD THE BELOW TO NEW USER.UTILS.JS FILE and create users folder???
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
//   return Math.round(num) / 2;
// };
// // userReviewCount("Ceo8BI43WswoggrBpDv3Wg");
// const updateUser = (id) => {
//   const userReviews = userReviewCount(id);
//   const userAvgRating = roundHalf(userAverageStars(id));
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
