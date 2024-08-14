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
  // count total num user reviews
  const reviewCount = await countUserReviews(id);

  // count total num user comment
  const commentCount = await countUserComments(id);

  // average user star ratings on reviews rounded to nearest 0.5
  const stars = await averageUserStars(id);

  // return user with updated aggregates, reviews (and associated comments) & comments
  return prisma.user.update({
    where: { id },
    data: {
      reviewCount,
      commentCount,
      stars,
    },
    include: {
      Reviews: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Comments: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      Comments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  // return prisma.user.findUnique({
  //   where: { id },
  //   include: {
  //     Reviews: { orderBy: { createdAt: "desc" }, include: { Comments: true } },
  //     Comments: { orderBy: { createdAt: "desc" } },
  //   },
  // });
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
