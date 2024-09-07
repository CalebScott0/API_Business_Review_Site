const {
  countUserReviews,
  countUserComments,
  averageUserStars,
} = require("./update_tables/utils");
const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

const getUserById = async (id) => {
  // MOVE THE BELOW INTO THE PRISMA QUERY??
  // // count total num user reviews
  const reviewCount = parseInt((await countUserReviews(id))[0].count);
  console.log(parseInt(reviewCount));
  // // count total num user comment
  // const commentCount = await countUserComments(id);

  // // average user star ratings on reviews rounded to nearest 0.5
  const stars = await averageUserStars(id);

  console.log("updating user");
  const user =
    // await prisma.$queryRaw`SELECT * from "User" WHERE id=${id}; `;
    await prisma.$queryRaw`UPDATE "User" SET "reviewCount"=${reviewCount}, stars=${stars} WHERE id = ${id} RETURNING *`;
  console.log(user);
  return user[0];
  // return user with updated aggregates, reviews (and associated comments) & comments
  //   return prisma.user.update({
  //     where: { id },
  //     data: {
  //       reviewCount,
  //       // commentCount,
  //       stars,
  //     },
  //     include: {
  //       Reviews: {
  //         orderBy: {
  //           createdAt: "desc",
  //         },
  //         include: {
  //           Comments: {
  //             include: {
  //               author: {
  //                 select: { username: true },
  //               },
  //             },
  //             orderBy: {
  //               createdAt: "desc",
  //             },
  //           },
  //         },
  //       },
  //       Comments: {
  //         orderBy: {
  //           createdAt: "desc",
  //         },
  //       },
  //     },
  //   });
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
