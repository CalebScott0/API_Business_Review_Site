const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

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
