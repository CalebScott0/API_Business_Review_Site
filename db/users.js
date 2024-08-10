const prisma = require("./index");

const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

// aggregate user's review count to update table column
const countUserReviews = (id) => {
  return prisma.review.count({
    where: {
      authorId: id,
    },
  });
};

// aggregate user's average stars to update table column
const averageUserStars = (id) => {
  // return will look like: { _avg: { stars: 5 } }
  return prisma.review.aggregate({
    _avg: {
      stars: true,
    },
    where: { authorId: id },
  });
};

// convert into float rounding to the nearest 0.5
const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const updateUser = async (id) => {
  const numUserReviews = await countUserReviews(id);
  const roundAvgUserStars = roundHalf((await averageUserStars(id))._avg.stars);
  await prisma.user.update({
    where: { id },
    data: {
      reviewCount: numUserReviews,
      averageStars: roundAvgUserStars,
    },
  });
};

const findUserById = async (id) => {
  // update user aggregate fields reviewCount & averageStars
  await updateUser(id);
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
  });
};
// findUserByEmail to check if account with email already exists
const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  findUserByEmail,
};
