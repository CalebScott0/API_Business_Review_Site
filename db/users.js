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

const getUserById = async (id) => {
  // count total num user reviews
  const reviews = await countUserReviews(id);

  // count total num user comment
  const comments = await countUserComments(id);

  // average user star ratings on reviews rounded to nearest 0.5
  const avgStars = roundHalf((await averageUserStars(id))._avg.stars);

  await prisma.user.update({
    where: { id },
    data: {
      reviewCount: reviews,
      commentCount: comments,
      stars: avgStars,
    },
  });

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
