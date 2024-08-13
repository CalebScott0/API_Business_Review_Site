const {
  countUserReviews,
  countUserComments,
  averageUserStars,
  roundHalf,
} = require("./update_tables/utils");
const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// const users = await prisma.user.findMany({
//   select: {
//     id: true,
//   },
// });

// // for each user, update with review & comment count and average stars rounded to nearest 0.5
// for (let i = 0; i < users.length; i++) {
//   const reviews = await countUserReviews(users[i].id);

//   const comments = await countUserComments(users[i].id);

//   const avgStars = roundHalf(
//     (await averageUserStars(users[i].id))._avg.stars
//   );

//   await prisma.user.update({
//     where: { id: users[i].id },
//     data: {
//       reviewCount: reviews,
//       commentCount: comments,
//       stars: avgStars,
//     },
//   });
// }

// console.log(
//   await prisma.user.findUnique({
//     where: {
//       id: "ZXsESlVN4d0smeMivvxJtA",
//     },
//   })
// );

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      Reviews: { orderBy: { createdAt: "desc" } },
      Comments: { orderBy: { createdAt: "desc" } },
    },
  });
};

const getUserByUsername = (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
};
// findUserByEmail to check if account with email already exists
const getUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  getUserByEmail,
};
