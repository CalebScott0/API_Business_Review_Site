const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// update user aggregate fields reviewCount & averageStars
const updateUser = async (id) => {
  await prisma.user.update({
    where: { id },
    data: {
      // reviewCount: numUserReviews,
      // commentCount: numUserComments,
      // averageStars: roundAvgUserStars,
    },
  });
};

const getUserById = async (id) => {
  await updateUser(id);
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
