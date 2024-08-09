const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// if file gets too large with functions create a users.utils file and a users folder?

/* TEST OUT THE BELOW FUNCTIONS BY CREATING AN ASYNC FUNCTION AND CALLING THEM WITH AWAIT
   console logging variable set to await function
   (Call function to see console logged value lol) */

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

// only get comments or reviews? no need to show comment data for user?

const findUserById = (id) => {
  /* call update user function here? change function async/await and use await on update function?
       keep return on findUnique.
     this is the function that will be called 
     in api/index.js to set req.user and subsequently will be used with "get/me" */

  return prisma.user.findUnique({
    where: { id },
    include: {
      // Comments: true,
      Reviews: true,
    },
  });
};
const findUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: { username },
    include: {
      // Comments: true,
      Reviews: true,
    },
  });
};

module.exports = { createUser, findUserByUsername, findUserById };
